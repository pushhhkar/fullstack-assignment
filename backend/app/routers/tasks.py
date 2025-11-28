from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from .. import schemas, models
from ..deps import get_db_session, get_active_user

router = APIRouter(prefix="/tasks")

@router.get("/", response_model=List[schemas.TaskOut])
def list_tasks(
    search: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db_session),
    user: models.User = Depends(get_active_user),
):
    q = db.query(models.Task).filter(models.Task.user_id == user.id)

    if search:
        q = q.filter(models.Task.title.ilike(f"%{search}%"))
    if status:
        q = q.filter(models.Task.status == status)

    return q.order_by(models.Task.created_at.desc()).all()

@router.post("/", response_model=schemas.TaskOut)
def create_task(data: schemas.TaskCreate, db: Session = Depends(get_db_session), user: models.User = Depends(get_active_user)):
    task = models.Task(
        title=data.title,
        description=data.description,
        status=data.status,
        user_id=user.id,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.put("/{task_id}", response_model=schemas.TaskOut)
def update_task(task_id: int, data: schemas.TaskUpdate, db: Session = Depends(get_db_session), user: models.User = Depends(get_active_user)):
    task = (
        db.query(models.Task)
        .filter(models.Task.id == task_id, models.Task.user_id == user.id)
        .first()
    )
    if not task:
        raise HTTPException(404, "Task not found")

    if data.title: task.title = data.title
    if data.description: task.description = data.description
    if data.status: task.status = data.status

    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db_session), user: models.User = Depends(get_active_user)):
    task = (
        db.query(models.Task)
        .filter(models.Task.id == task_id, models.Task.user_id == user.id)
        .first()
    )
    if not task:
        raise HTTPException(404, "Task not found")

    db.delete(task)
    db.commit()

    return {"detail": "Task deleted"}
