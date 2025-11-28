from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import schemas, models
from ..deps import get_db_session, get_active_user

router = APIRouter(prefix="/profile")

@router.get("/", response_model=schemas.UserOut)
def get_profile(db: Session = Depends(get_db_session), current: models.User = Depends(get_active_user)):
    return current

@router.put("/", response_model=schemas.UserOut)
def update_profile(data: schemas.ProfileUpdate, db: Session = Depends(get_db_session), current: models.User = Depends(get_active_user)):
    current.name = data.name
    db.add(current)
    db.commit()
    db.refresh(current)
    return current
