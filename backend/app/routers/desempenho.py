from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.services import desempenho_service

router = APIRouter()

@router.get("/peso-medio")
def peso_medio(propriedade_id: int = Query(..., description="ID da propriedade"), db: Session = Depends(get_db)):

    return desempenho_service.calcular_peso_medio(propriedade_id, db)

@router.get("/resumo")
def resumo_desempenho(propriedade_id: int = Query(..., description="ID da propriedade"), db: Session = Depends(get_db)):

    dados_basicos = desempenho_service.calcular_peso_medio(propriedade_id, db)
    
    # Consulta adicional
    from app.models import Animal
    animais = db.query(Animal).filter(Animal.propriedade_id == propriedade_id).all()
    total_animais = len(animais)
    sem_peso = len([a for a in animais if a.peso_atual is None])

    return {
        "peso_medio": dados_basicos["peso_medio"],
        "total_animais": total_animais,
        "sem_peso_registrado": sem_peso
    }