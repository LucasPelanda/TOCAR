from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas import CheckupCreate, CheckupResponse
from app.database import get_db
from app.services import checkups_service
from app import models, schemas
from app.models import Checkup, Animal
from collections import defaultdict
from app.bpm import get_ultimo_bpm

router = APIRouter()

@router.post("/", response_model=CheckupResponse)
def criar_checkup(checkup: CheckupCreate, db: Session = Depends(get_db)):
    bpm = get_ultimo_bpm() 

    if checkup.observacoes:
        checkup.observacoes += f" | BPM: {bpm}"
    else:
        checkup.observacoes = f"BPM: {bpm}"

    return checkups_service.criar_checkup(db, checkup)

@router.get("/", response_model=List[CheckupResponse])
def listar_checkups(db: Session = Depends(get_db)):
    return checkups_service.listar_checkups(db)

@router.get("/animal/{animal_id}", response_model=List[CheckupResponse])
def listar_checkups_por_animal(animal_id: int, db: Session = Depends(get_db)):
    return checkups_service.listar_checkups_por_animal(db, animal_id)

@router.get("/propriedades/{propriedade_id}/desempenho")
def desempenho_rebanho(propriedade_id: int, db: Session = Depends(get_db)):
    checkups = (
        db.query(Checkup)
        .join(Animal)
        .filter(Animal.propriedade_id == propriedade_id)
        .all()
    )

    if not checkups:
        raise HTTPException(status_code=404, detail="Nenhum check-up encontrado")

    pesos = []
    por_mes = defaultdict(int)
    status = defaultdict(int)

    for c in checkups:
        if c.peso:
            pesos.append(c.peso)
        if c.data:
            mes = c.data.strftime("%m/%Y")
            por_mes[mes] += 1
        if c.observacoes:
            status[c.observacoes] += 1

    media_peso = round(sum(pesos) / len(pesos), 1) if pesos else 0.0

    return {
        "mediaPeso": media_peso,
        "porMes": [{"mes": m, "valor": v} for m, v in sorted(por_mes.items())],
        "status": [{"nome": k, "value": v} for k, v in status.items()]
    }