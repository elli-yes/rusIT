import sys
import cv2
import asyncio
from passlib.context import CryptContext
from sqlalchemy.orm import Session

import crud
import schemas


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(db: Session, username: str, password: str):
    user = crud.get_user_by_username(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def write_frame(name: str):
    VIDEO_URL = f"/Users/artem/Projects/start_up/Rusich/rusIT/Server/data/{name}.m3u8"

    cap = cv2.VideoCapture(VIDEO_URL)
    if (cap.isOpened() == False):
        print('!!! Unable to open URL')
        sys.exit(-1)

    # retrieve FPS and calculate how long to wait between each frame to be display

    count = 0

    # read one frame
    _, frame = cap.read()

    # TODO: perform frame processing here

    # display frame
    cv2.imwrite(f'images/{name}.jpg', frame)
    cap.release()
    cv2.destroyAllWindows()
