from pydantic import BaseModel, constr


class UserIn(BaseModel):
    username: constr(min_length=6)
    password: constr(min_length=6)

class User_out(BaseModel):
    id: int
    username: str
    key: str
    stream_title: str
    is_active: int
    description: str

    class Config:
        orm_mode = True


class User_DB(User_out):
    hashed_password: str


class Stream_out(BaseModel):
    username: str
    stream_title: str
    description: str

    class Config:
        orm_mode = True


class RefreshTokens(BaseModel):
    refresh_token: str


class Stream(BaseModel):
    stream_title: str

class Description(BaseModel):
    description: str