from datetime import datetime, timedelta
from time import sleep
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
from fastapi_utils.tasks import repeat_every
from fastapi_utils.session import FastAPISessionMaker

import crud
import models
import schemas
import services
from database import SessionLocal, engine
from schemas import RefreshTokens
from services import write_frame
from database import SQLALCHEMY_DATABASE_URL as database_uri


SECRET_KEY = "737ca6da1bf47a33babc40e0c55aca8cf92f56be3d83a367e93486aa21caea62"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

models.Base.metadata.create_all(bind=engine)

sessionmaker = FastAPISessionMaker(database_uri)

app = FastAPI()


origins = [
    "http://auth_server_py:8000",
    "http://localhost:8000",
    "http://0.0.0.0:8000",
    "http://77.223.96.53:3000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


async def get_current_user(req: Request):
    token = req.headers.get('Authorization').split(' ')[1]

    if token is None:
        raise HTTPException(status_code=401, detail='Not authorized')

    try:
        user = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials"
            )

        return schemas.User_DB(**user)
    except BaseException:
        raise HTTPException(status_code=401, detail='Not authorized')


@app.on_event("startup")
@repeat_every(seconds=10, wait_first=True)
def create_thumb() -> None:
    with sessionmaker.context_session() as db:
        users = crud.get_all_active_users(db)
        for i in users:
            try:
                write_frame(i.username)
            except:
                print("noone is streaming")


@app.post("/api/login")
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


@app.post('/api/logout')
async def logout(response: Response):
    response.set_cookie(
        key='refresh_token',
        value="",
        expires=0,
        path='/',
        httponly=True,
        samesite="lax",
    )
    return {"status": "done"}


@app.post('/api/refresh-tokens')
async def refresh_tokens(
        res: Response,
        body: Optional[RefreshTokens] = Body(default=None),
        refresh_token: Optional[str] = Cookie(None),
        db: Session = Depends(get_db)
):
    token = getattr(body, 'refresh_token', None) or refresh_token
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        user_db = crud.get_user_by_username(db, payload['username'])

        if user_db is None:
            raise HTTPException(status_code=401,
                                detail="User with given id doesn't exits")

        (access_token, refresh_token) = gen_tokens(user_db.as_dict())

        res.set_cookie(
            key='refresh_token',
            value=refresh_token,
            expires=86400*30,
            path='/',
            httponly=True,
            samesite="lax",
        )

        return {'access_token': access_token, 'refresh_token': refresh_token}
    except BaseException as err:
        raise HTTPException(status_code=401, detail='Invalid token') from err


@app.get("/api/users/me")
def cur_user(current_user: schemas.User_out = Depends(get_current_user)):
    return current_user


@app.post("/api/users/", response_model=schemas.User_out)
def create_user(user: schemas.UserIn, db: Session = Depends(get_db)):
    user_db = crud.get_user_by_username(db, user.username)
    if user_db:
        raise HTTPException(status_code=400, detail="User already registered")
    return crud.create_user(db, user)


@app.get("/api/users/", response_model=List[schemas.User_out])
def get_all_users(db: Session = Depends(get_db)):
    users = crud.get_users(db)
    return users


@app.get("/api/users/{username}", response_model=schemas.User_out)
def get_user(username: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, username=username)
    if not user:
        raise HTTPException(status_code=400, detail="User doesn't exist")
    return user


@app.post('/api/auth')
async def auth(request: Request, db: Session = Depends(get_db)):
    data = await request.form()
    name = data.get('name')
    key = data.get('key')
    if crud.check_auth(db, name, key):
        return Response(status_code=200)
    return Response(status_code=403)


@app.post('/api/done')
async def auth(request: Request, db: Session = Depends(get_db)):
    data = await request.form()
    print(data)
    crud.set_user_inactive(db, data.get('name'))
    return Response(status_code=200)


@app.post('/api/make_active/{username}')
async def active(username: str, db: Session = Depends(get_db)):
    return crud.set_user_active(db, username)


@app.post('/api/make_inactive/{username}')
async def inactive(username: str, db: Session = Depends(get_db)):
    return crud.set_user_inactive(db, username)


@app.post('/api/create_new_uuid')
async def new_uuid(user: schemas.User_out = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.create_new_uuid(db, user.username)


@app.post('/api/set_title')
def set_title(user: schemas.User_out = Depends(get_current_user), title: schemas.Stream = Body(...), db: Session = Depends(get_db)):
    return crud.update_stream_title(db, username=user.username, title=title.stream_title)


@app.post('/api/set_description')
def set_desc(user: schemas.User_out = Depends(get_current_user), description: schemas.Description = Body(...), db: Session = Depends(get_db)):
    return crud.update_username_desc(db, user.username, description.description)


@app.get('/api/stream/{username}', response_model=schemas.Stream_out)
def get_stream_by_username(username: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, username=username)
    if not user.is_active:
        return HTTPException(status_code="user isn't active")
    return user.as_dict()


@app.get('/api/streams', response_model=List[schemas.Stream_out])
def get_all_active_users(db: Session = Depends(get_db)):
    users = crud.get_all_active_users(db)
    return users


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


@ app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket, client_id)
    while True:
        data = await websocket.receive_text()
        await manager.send_personal_message(f"You wrote: {data}", websocket)
        await manager.broadcast(f"Client #{client_id} says: {data}", client_id)
