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


def update_stream_title(db: Session, username: str, title: str):
    user = db.query(models.User).filter(
        models.User.username == username).first()
    user.stream_title = title
    db.commit()
    db.refresh(user)
    return user


def update_username_desc(db: Session, username: str, description: str):
    user = db.query(models.User).filter(
        models.User.username == username).first()
    user.description = description
    db.commit()
    db.refresh(user)
    return user


def create_new_uuid(db: Session, username: str):
    user = db.query(models.User).filter(
        models.User.username == username).first()
    user.key = str(uuid4())
    db.commit()
    db.refresh(user)
    return user


def set_user_inactive(db: Session, username: str):
    user = db.query(models.User).filter(
        models.User.username == username).first()
    user.stream_title = ""
    user.is_active = 0
    db.add(user)
    db.commit()
    return user


def set_user_active(db: Session, username: str):
    user = db.query(models.User).filter(
        models.User.username == username).first()
    user.stream_title = ""
    user.is_active = 1
    db.add(user)
    db.commit()
    return user


def get_all_active_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).filter(models.User.is_active == 1).offset(skip).limit(limit).all()


def check_auth(db: Session, username: str, key: str):
    user = get_user_by_username(db, username)
    if user.key == key:
        user.is_active = 1
        db.add(user)
        db.commit()
        return True
    return False
