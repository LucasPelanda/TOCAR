from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas import UsuarioCreate, UsuarioResponse
from app.database import get_db
from app.services import funcionarios_service

router = APIRouter()

@router.post("/", response_model=UsuarioResponse)
def criar_funcionario(funcionario: UsuarioCreate, db: Session = Depends(get_db)):
    return funcionarios_service.criar_funcionario(db, funcionario)

@router.get("/", response_model=List[UsuarioResponse])
def listar_funcionarios(db: Session = Depends(get_db)):
    return funcionarios_service.listar_funcionarios(db)

@router.put("/{funcionario_id}", response_model=UsuarioResponse)
def atualizar_funcionario(funcionario_id: int, funcionario: UsuarioCreate, db: Session = Depends(get_db)):
    return funcionarios_service.atualizar_funcionario(db, funcionario_id, funcionario)

@router.delete("/{funcionario_id}")
def deletar_funcionario(funcionario_id: int, db: Session = Depends(get_db)):
    return funcionarios_service.deletar_funcionario(db, funcionario_id)