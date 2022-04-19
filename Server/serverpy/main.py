from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import List, Optional
from fastapi import Body, Cookie, Depends, FastAPI, HTTPException, WebSocket, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from sqlalchemy.orm import Session
from jose import jwt
from fastapi.responses import Response
from fastapi.requests import Request
from fastapi.middleware.cors import CORSMiddleware

import crud
import models
import schemas
import services
from database import SessionLocal, engine
from schemas import RefreshTokens


SECRET_KEY = "737ca6da1bf47a33babc40e0c55aca8cf92f56be3d83a367e93486aa21caea62"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def time_from_now(delta):
    return datetime.now() + delta


def gen_tokens(user: dict):
    payload = user
    payload['exp'] = time_from_now(timedelta(minutes=30))
    access_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    payload['exp'] = time_from_now(timedelta(days=30))
    refresh_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return (access_token, refresh_token)


@app.post("/login")
async def post_token(user_in: schemas.UserIn, res: Response, db: Session = Depends(get_db)):
    user_db = services.authenticate_user(
        db, user_in.username, user_in.password)
    if not user_db:
        raise HTTPException(status_code=400, detail="User doesn't exist")
    access_token, refresh_token = gen_tokens(user_db.as_dict())

    res.set_cookie(
        key='refresh_token',
        value=refresh_token,
        expires=86400*30,
        path='/',
        httponly=True,
        samesite="lax",
    )

    return {"access_token": access_token, "refresh_token": refresh_token}


@app.post('/refresh-tokens')
async def refresh_tokens(
        res: Response,
        body: Optional[RefreshTokens] = Body(default=None),
        refresh_token: Optional[str] = Cookie(None),
        db: Session = Depends(get_db)
):
    token = getattr(body, 'refreshToken') or refresh_token

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithm=ALGORITHM)

        user_db = crud.get_user_by_username(db, payload['username'])

        if user_db is None:
            raise HTTPException(status_code=401,
                                detail="User with given id doesn't exits")

        (access_token, refresh_token) = gen_tokens(user_db.as_dict())

        res.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            samesite='lax',
        )

        return {'access_token': access_token, 'refresh_token': refresh_token}
    except BaseException as err:
        raise HTTPException(status_code=401, detail='Invalid token') from err


async def get_current_user(req: Request):
    token = req.headers.get('Authorization').split(' ')[1]

    if token is None:
        raise HTTPException(status_code=401, detail='Not authorized')

    try:
        user = jwt.decode(token, SECRET_KEY, algorithm=ALGORITHM)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials"
            )

        return user
    except BaseException:
        raise HTTPException(status_code=401, detail='Not authorized')


@app.get("/users/me")
def cur_user(current_user: schemas.User_out = Depends(get_current_user)):
    return current_user


@app.post("/users/", response_model=schemas.User_out)
def create_user(user: schemas.UserIn, db: Session = Depends(get_db)):
    user_db = crud.get_user_by_username(db, user.username)
    if user_db:
        raise HTTPException(status_code=400, detail="User already registered")
    return crud.create_user(db, user)


@app.get("/users/", response_model=List[schemas.User_out])
def get_all_users(db: Session = Depends(get_db)):
    users = crud.get_users(db)
    return users


@app.get("/users/{username}", response_model=schemas.User_out)
def get_user(username: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, username=username)
    if not user:
        raise HTTPException(status_code=400, detail="User doesn't exist")
    return user


origins = [
    "http://auth_server_py:8000",
    "http://0.0.0.0:8000",
    "http://localhost:3000",
    "http://192.168.1.103:3000",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/auth')
async def auth(request: Request, db: Session = Depends(get_db)):
    data = await request.form()
    user = crud.get_user_by_username(db, data.get('name'))
    key = data.get('key')
    if key == user.key:
        return Response(status_code=200)
    return Response(status_code=403)


@app.post('/done')
async def auth(request: Request):
    data = await request.form()
    if data.get('app') == '':
        ...
    return Response(status_code=200)


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket, id: int):
        await websocket.accept()
        self.active_connections.append({"websocket": websocket, "id": id})

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str, id: int):
        for connection in self.active_connections:
            print(id, connection["id"])
            if id != connection["id"]:
                await connection["websocket"].send_text(message)


manager = ConnectionManager()


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket, client_id)
    while True:
        data = await websocket.receive_text()
        await manager.send_personal_message(f"You wrote: {data}", websocket)
        await manager.broadcast(f"Client #{client_id} says: {data}", client_id)