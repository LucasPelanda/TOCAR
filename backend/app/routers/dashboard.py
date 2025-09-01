from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.dashboard_service import gerar_dashboard

router = APIRouter()

@router.get("/{propriedade_id}")
def obter_dashboard(propriedade_id: int, db: Session = Depends(get_db)):
    return gerar_dashboard(propriedade_id, db)

