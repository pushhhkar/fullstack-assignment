from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os

from .models import User
from .database import get_db

load_dotenv()

SECRET = os.getenv("JWT_SECRET")
ALGO = os.getenv("JWT_ALGORITHM")
EXPIRE = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_hash(password):
    return pwd_context.hash(password)

def verify(password, hash):
    return pwd_context.verify(password, hash)

def create_token(data: dict):
    to_encode = data.copy()
    to_encode["exp"] = datetime.utcnow() + timedelta(minutes=EXPIRE)
    return jwt.encode(to_encode, SECRET, algorithm=ALGO)

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2)):
    try:
        decoded = jwt.decode(token, SECRET, algorithms=[ALGO])
        user_id = decoded.get("sub")
        if not user_id:
            raise Exception()
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user
