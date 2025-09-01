from sqlalchemy.orm import Session
from fastapi import HTTPException
from app import models, schemas
from datetime import datetime
import random




###provisorio#####
def criar_sensor(db: Session, sensor: schemas.SensorCreate):
    novo_sensor = models.Sensor(**sensor.dict())
    db.add(novo_sensor)
    db.commit()
    db.refresh(novo_sensor)
    return novo_sensor

def listar_sensores(db: Session):
    return db.query(models.Sensor).all()

def simular_leitura(db: Session, animal_id: int):
    # Verifica se o animal existe
    animal = db.query(models.Animal).filter(models.Animal.id == animal_id).first()
    if not animal:
        raise HTTPException(status_code=404, detail="Animal não encontrado")

    # Gera dados aleatórios simulados
    temperatura = round(random.uniform(36.0, 41.0), 1)
    batimentos = random.randint(40, 120)

    status = "Normal"
    alerta = None
    if temperatura > 39.5 or batimentos > 100:
        status = "Alerta"
        alerta = "Possível febre ou estresse"

    leitura = models.LeituraSensorial(
        relatorio="Simulação de leitura automática",
        temperatura=temperatura,
        batimentos_cardiacos=batimentos,
        alerta=alerta,
        status=status,
        data_hora=datetime.now(),
        animal_id=animal_id,
        sensor_id=1  # por padrão, usa o sensor com id=1 (ou você pode adaptar isso)
    )

    db.add(leitura)
    db.commit()
    db.refresh(leitura)
    return leitura