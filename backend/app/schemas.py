from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PropriedadeResponse(BaseModel):
    id: int
    nome: str

    class Config:
        orm_mode = True
# ---------- USUÁRIO ----------
class UsuarioBase(BaseModel):
    nome: str
    email: str
    tipo: str 

class UsuarioCreate(BaseModel):
    nome: str
    email: str
    senha: str
    tipo: str
    propriedade_id: Optional[int] = None



class UsuarioResponse(BaseModel):
    id: int
    nome: str
    email: str
    tipo: str
    propriedade_id: Optional[int] = None  # <- adicione isso
    propriedades: List[PropriedadeResponse] = []

    class Config:
        orm_mode = True

class FuncionarioSimples(BaseModel):
    id: int
    nome: str
    email: str

    class Config:
        from_attributes = True


# ---------- PROPRIEDADE ----------
class PropriedadeBase(BaseModel):
    nome: str
    localizacao: Optional[str] = None

class PropriedadeCreate(PropriedadeBase):
    usuario_id: int





# ---------- ANIMAL ----------
class AnimalBase(BaseModel):
    numero_identificacao: str
    especie: Optional[str]
    sexo: Optional[str]
    idade: Optional[int]
    raca: Optional[str]
    origem: Optional[str]
    peso_atual: Optional[float]

class AnimalCreate(AnimalBase):
    propriedade_id: int

class AnimalResponse(BaseModel):
    id: int
    numero_identificacao: str
    especie: str
    sexo: str
    idade: int
    raca: str
    origem: str
    peso_atual: float

    class Config:
        orm_mode = True

class AnimalUpdate(BaseModel):
    numero_identificacao: Optional[str]
    especie: Optional[str]
    sexo: Optional[str]
    idade: Optional[int]
    raca: Optional[str]
    origem: Optional[str]
    peso_atual: Optional[float]
    
    class Config:
        orm_mode = True



# ---------- CHECKUP ----------
class CheckupCreate(BaseModel):
    peso: float
    observacoes: str
    animal_id: int
    usuario_id: int

class CheckupCreate(BaseModel):
    peso: float
    observacoes: str
    animal_id: int
    usuario_id: int
    atencao: Optional[bool] = False
    sensor: Optional[str] = "monitor"
    status: Optional[str] = "concluido"

class CheckupResponse(BaseModel):
    id: int
    data: datetime
    peso: float
    observacoes: str
    animal: Optional[AnimalResponse]
    usuario: Optional[UsuarioResponse]

    class Config:
        orm_mode = True


# ---------- SENSOR ----------
class SensorBase(BaseModel):
    tipo: str
    status: str

class SensorCreate(SensorBase):
    pass

class SensorResponse(SensorBase):
    id: int

    class Config:
        orm_mode = True


# ---------- LEITURA SENSORIAL ----------
class LeituraSensorialBase(BaseModel):
    relatorio: Optional[str]
    temperatura: float
    batimentos_cardiacos: int
    alerta: Optional[str]
    status: str

class LeituraSensorialCreate(LeituraSensorialBase):
    animal_id: int
    sensor_id: int

class LeituraSensorialResponse(LeituraSensorialBase):
    id: int
    data_hora: datetime

    class Config:
        orm_mode = True