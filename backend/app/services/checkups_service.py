from sqlalchemy.orm import Session
from fastapi import HTTPException
from app import models, schemas
from datetime import datetime

# Cadastrar novo check-up
def criar_checkup(db: Session, checkup: schemas.CheckupCreate):
    animal = db.query(models.Animal).filter(models.Animal.id == checkup.animal_id).first()
    if not animal:
        raise HTTPException(status_code=404, detail="Animal não encontrado.")

    usuario = db.query(models.Usuario).filter(models.Usuario.id == checkup.usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")

    novo_checkup = models.Checkup(
        peso=checkup.peso,
        observacoes=checkup.observacoes,
        animal_id=checkup.animal_id,
        usuario_id=checkup.usuario_id,
        data=datetime.now()
    )

    db.add(novo_checkup)
    
    animal.peso_atual = checkup.peso
    db.add(animal)   

    db.commit()
    db.refresh(novo_checkup)
    db.refresh(animal)
    return novo_checkup

# Listar todos os check-ups
def listar_checkups(db: Session):
    return db.query(models.Checkup).all()

# Listar check-ups de um animal específico
def listar_checkups_por_animal(db: Session, animal_id: int):
    return db.query(models.Checkup).filter(models.Checkup.animal_id == animal_id).all()