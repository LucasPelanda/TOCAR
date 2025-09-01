from sqlalchemy.orm import Session
from fastapi import HTTPException
from app import models, schemas

# Criar funcionário
def criar_funcionario(db: Session, funcionario: schemas.UsuarioCreate):
    # Verifica se email já existe
    existe = db.query(models.Usuario).filter(models.Usuario.email == funcionario.email).first()
    if existe:
        raise HTTPException(status_code=400, detail="Email já cadastrado.")

    novo = models.Usuario(**funcionario.dict())
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo

# Listar todos os funcionários
def listar_funcionarios(db: Session):
    return db.query(models.Usuario).filter(models.Usuario.tipo == "funcionario").all()

# Atualizar funcionário
def atualizar_funcionario(db: Session, funcionario_id: int, dados: schemas.UsuarioCreate):
    funcionario = db.query(models.Usuario).filter(models.Usuario.id == funcionario_id).first()
    if not funcionario:
        raise HTTPException(status_code=404, detail="Funcionário não encontrado.")

    for key, value in dados.dict().items():
        setattr(funcionario, key, value)

    db.commit()
    db.refresh(funcionario)
    return funcionario

# Deletar funcionário
def deletar_funcionario(db: Session, funcionario_id: int):
    funcionario = db.query(models.Usuario).filter(models.Usuario.id == funcionario_id).first()
    if not funcionario:
        raise HTTPException(status_code=404, detail="Funcionário não encontrado.")

    db.delete(funcionario)
    db.commit()
    return {"ok": True}