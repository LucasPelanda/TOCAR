from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.schemas import UsuarioResponse
from typing import List, Optional
from app.models import Usuario

router = APIRouter()

@router.get("/email/{email}", response_model=schemas.UsuarioResponse)
def get_usuario_por_email(email: str, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.email == email).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario

@router.post("/", response_model=schemas.UsuarioResponse)
def criar_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    # Verifica se email já existe
    existente = db.query(models.Usuario).filter(models.Usuario.email == usuario.email).first()
    if existente:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado.")

    novo_usuario = models.Usuario(
        nome=usuario.nome,
        email=usuario.email,
        senha=usuario.senha,
        tipo=usuario.tipo,
        propriedade_id=usuario.propriedade_id if usuario.tipo == "funcionario" else None
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return novo_usuario

@router.delete("/{usuario_id}", status_code=204)
def deletar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")

    db.delete(usuario)
    db.commit()
    return
@router.get("/{usuario_id}", response_model=schemas.UsuarioResponse)
def buscar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario

