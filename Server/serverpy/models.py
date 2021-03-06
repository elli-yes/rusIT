from email.policy import default
from uuid import uuid4
from sqlalchemy import Column, Integer, String

from database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    key = Column(String)
    description = Column(String, default="")
    stream_title = Column(String, default="")
    is_active = Column(Integer, default=0)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
