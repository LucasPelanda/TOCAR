from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime
from app.associacoes import funcionarios_propriedades

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    senha = Column(String)
    tipo = Column(String)  
    propriedade_id = Column(Integer, ForeignKey("propriedades.id")) 
    propriedades = relationship(
        "Propriedade",
        back_populates="usuario_dono",
        foreign_keys="Propriedade.usuario_id"
    )
    propriedade = relationship(
        "Propriedade",
        back_populates="funcionarios",
        foreign_keys=[propriedade_id]
    )


class Propriedade(Base):
    __tablename__ = "propriedades"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    localizacao = Column(String)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))  
    usuario_dono = relationship(
        "Usuario",
        back_populates="propriedades",
        foreign_keys=[usuario_id]
    )
    funcionarios = relationship(
        "Usuario",
        back_populates="propriedade",
        foreign_keys="Usuario.propriedade_id"
    )
    animais = relationship("Animal", back_populates="propriedade")


class Animal(Base):
    __tablename__ = "animais"
    id = Column(Integer, primary_key=True, index=True)
    numero_identificacao = Column(String, unique=True, nullable=False)
    especie = Column(String)
    sexo = Column(String)
    idade = Column(Integer)
    raca = Column(String)
    origem = Column(String)
    peso_atual = Column(Float)
    propriedade_id = Column(Integer, ForeignKey("propriedades.id"))

    propriedade = relationship("Propriedade", back_populates="animais")
    checkups = relationship("Checkup", back_populates="animal")
    leituras = relationship("LeituraSensorial", back_populates="animal")


class Checkup(Base):
    __tablename__ = "checkups"
    id = Column(Integer, primary_key=True, index=True)
    data = Column(DateTime, default=datetime.utcnow)
    observacoes = Column(String)
    peso = Column(Float)
    animal_id = Column(Integer, ForeignKey("animais.id"))
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))

    animal = relationship("Animal", back_populates="checkups")
    usuario = relationship("Usuario")


class Sensor(Base):
    __tablename__ = "sensores"
    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String)
    status = Column(String)


class LeituraSensorial(Base):
    __tablename__ = "leituras"
    id = Column(Integer, primary_key=True, index=True)
    data_hora = Column(DateTime, default=datetime.utcnow)
    relatorio = Column(String)
    temperatura = Column(Float)
    batimentos_cardiacos = Column(Integer)
    alerta = Column(String)
    status = Column(String)
    animal_id = Column(Integer, ForeignKey("animais.id"))
    sensor_id = Column(Integer, ForeignKey("sensores.id"))

    animal = relationship("Animal", back_populates="leituras")
    sensor = relationship("Sensor")