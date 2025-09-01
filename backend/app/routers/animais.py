from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter()

@router.post("/", response_model=schemas.AnimalResponse)
def criar_animal(animal: schemas.AnimalCreate, db: Session = Depends(get_db)):
    novo_animal = models.Animal(**animal.dict())
    db.add(novo_animal)
    db.commit()
    db.refresh(novo_animal)
    return novo_animal

@router.delete("/{animal_id}/vender", response_model=schemas.AnimalResponse)
def remover_animal(animal_id: int, db: Session = Depends(get_db)):
    animal = db.query(models.Animal).filter(models.Animal.id == animal_id).first()

    if not animal:
        raise HTTPException(status_code=404, detail="Animal não encontrado")

    db.delete(animal)
    db.commit()
    return animal

@router.get("/identificacao/{identificacao}", response_model=schemas.AnimalResponse)
def buscar_animal_por_identificacao(identificacao: str, db: Session = Depends(get_db)):
    animal = db.query(models.Animal).filter(models.Animal.numero_identificacao == identificacao).first()

    if not animal:
        raise HTTPException(status_code=404, detail="Animal não encontrado")

    return animal