from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.services import sensores_service
from app.schemas import LeituraSensorialResponse

router = APIRouter()

@router.get("/testar", response_model=LeituraSensorialResponse)
def simular_sensor(animal_id: int = Query(...), db: Session = Depends(get_db)):
    return sensores_service.simular_leitura_sensorial(animal_id, db)