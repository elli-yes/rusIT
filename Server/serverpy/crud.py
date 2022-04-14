from uuid import uuid4
from sqlalchemy.orm import Session


import models
import schemas
import services


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserIn):
    hashed_password = services.get_password_hash(user.password)
    user_db = models.User(username=user.username,
                          hashed_password=hashed_password,
                          key=str(uuid4()))
    db.add(user_db)
    db.commit()
    db.refresh(user_db)
    return(user_db)
