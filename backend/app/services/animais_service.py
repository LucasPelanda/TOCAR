from sqlalchemy.orm import Session
from fastapi import HTTPException
from app import models, schemas

# Criar novo animal
def criar_animal(db: Session, animal: schemas.AnimalCreate):
    novo_animal = models.Animal(**animal.dict())

    db.add(novo_animal)
    db.commit()
    db.refresh(novo_animal)

    return novo_animal

# Listar todos os animais
def listar_animais(db: Session):
    return db.query(models.Animal).all()