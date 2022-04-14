from uuid import UUID
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
