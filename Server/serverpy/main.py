from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import List, Optional
from fastapi import Depends, FastAPI, HTTPException, status
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


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.post("/token")
async def post_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user_db: schemas.User_DB = services.authenticate_user(
        db, form_data.username, form_data.password)
    if not user_db:
        raise HTTPException(status_code=400, detail="User doesn't exist")
    user = user_db.as_dict()
    payload = schemas.User_out(**user)
    access_token = jwt.encode(payload.dict(), SECRET_KEY, ALGORITHM)
    return {"access_token": access_token, "token_type": "bearer"}


def get_current_user(token: str = Depends(oauth2_scheme)):
    user = jwt.decode(token, SECRET_KEY, ALGORITHM)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


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
    "http://0.0.0.0:8000"
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
