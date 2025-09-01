from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.database import get_db

router = APIRouter()

# Rota para listar todas as propriedades (opcional)
@router.get("/propriedades", response_model=List[schemas.PropriedadeResponse])
def listar_propriedades(db: Session = Depends(get_db)):
    return db.query(models.Propriedade).all()

# ✅ Rota para listar funcionários de uma propriedade específica
@router.get("/{propriedade_id}/funcionarios", response_model=List[schemas.FuncionarioSimples])
def listar_funcionarios_por_propriedade(propriedade_id: int, db: Session = Depends(get_db)):
    funcionarios = db.query(models.Usuario).filter(
        models.Usuario.propriedade_id == propriedade_id,
        models.Usuario.tipo == "funcionario"
    ).all()

    if funcionarios is None:
        raise HTTPException(status_code=404, detail="Funcionários não encontrados")

    return funcionarios

@router.get("/{propriedade_id}/animais", response_model=list[schemas.AnimalResponse])
def listar_animais_por_propriedade(propriedade_id: int, db: Session = Depends(get_db)):
    animais = db.query(models.Animal).filter(models.Animal.propriedade_id == propriedade_id).all()
    
    if not animais:
        raise HTTPException(status_code=404, detail="Nenhum animal encontrado para essa propriedade.")

    return animais