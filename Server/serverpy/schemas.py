from pydantic import BaseModel


class UserIn(BaseModel):
    username: str
    password: str


class User_out(BaseModel):
    id: int
    username: str
    key: str

    class Config:
        orm_mode = True


class User_DB(User_out):
    hashed_password: str


class Stream_out(BaseModel):
    username: str
    stream_title: str
    class Config:
        orm_mode = True



class RefreshTokens(BaseModel):
    refresh_token: str
