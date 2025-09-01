from sqlalchemy import Table, Column, Integer, ForeignKey
from app.database import Base

funcionarios_propriedades = Table(
    "funcionarios_propriedades",
    Base.metadata,
    Column("usuario_id", Integer, ForeignKey("usuarios.id")),
    Column("propriedade_id", Integer, ForeignKey("propriedades.id"))
)