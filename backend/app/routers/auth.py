from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from .. import schemas, models
from ..database import get_db
from ..auth import create_token, get_hash, verify

router = APIRouter(prefix="/auth")

@router.post("/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    exists = db.query(models.User).filter(models.User.email == user.email).first()
    if exists:
        raise HTTPException(400, "Email already registered")

    new = models.User(
        name=user.name,
        email=user.email,
        password_hash=get_hash(user.password),
    )
    db.add(new)
    db.commit()
    db.refresh(new)

    token = create_token({"sub": new.id})

    return {"access_token": token, "user": new}

@router.post("/login", response_model=schemas.Token)
def login(data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user or not verify(data.password, user.password_hash):
        raise HTTPException(400, "Invalid email or password")

    token = create_token({"sub": user.id})

    return {"access_token": token, "user": user}
