from fastapi import FastAPI
from fastapi_mqtt import FastMQTT, MQTTConfig
from collections import deque
import time
import sqlite3
import json
from datetime import datetime
from app.models import LeituraSensorial
from app.database import SessionLocal

app = FastAPI()

mqtt_config = MQTTConfig(
    host="broker.hivemq.com",
    port=1883,
    keepalive=60
)

mqtt = FastMQTT(config=mqtt_config)
mqtt.init_app(app)
ultimo_bpm = 0

@app.on_event("startup")
async def startup():
    print("API iniciada e conectando ao MQTT...")

@mqtt.on_connect()
def handle_connect(client, flags, rc, properties):
    print("Conectado ao broker MQTT!")
    mqtt.client.subscribe("pbl/sensor/ecg")

# VARIÁVEIS DE PROCESSAMENTO 
valores = deque(maxlen=30) 
ultimos_picos = deque(maxlen=5)  
limiar = 1000 


@mqtt.on_message()
async def message(client, topic, payload, qos, properties):
    try:
        valor = int(payload.decode()) #converte para str para int
        valores.append(valor)

        if len(valores) >= 3: #verifica se e um pico e maior que limiar
            if valores[-2] > limiar and valores[-2] > valores[-3] and valores[-2] > valores[-1]:
                tempo_atual = time.time()
                ultimos_picos.append(tempo_atual)

                if len(ultimos_picos) >= 2: #calcula os intervalos entre os ultimos picos
                    intervalos = [
                        t2 - t1 for t1, t2 in zip(ultimos_picos, list(ultimos_picos)[1:])
                    ]
                    media_intervalo = sum(intervalos) / len(intervalos)
                    bpm = round(60 / media_intervalo) #converte para bpm
                    global ultimo_bpm
                    ultimo_bpm = bpm


                    # Salvar no banco de dados
                    db = SessionLocal()
                    try:
                        leitura = LeituraSensorial(
                            data_hora=datetime.utcnow(),
                            batimentos_cardiacos=bpm,
                            sensor_id=1,
                            animal_id=1,
                            status="Registrado"
                        )
                        db.add(leitura)
                        db.commit()
                    finally:
                        db.close()


                    leituras_total = db.query(LeituraSensorial).order_by(LeituraSensorial.data_hora.desc()).all()
                    if len(leituras_total) > 100:
                        ids_para_deletar = [l.id for l in leituras_total[100:]]
                        db.query(LeituraSensorial).filter(LeituraSensorial.id.in_(ids_para_deletar)).delete(synchronize_session=False)
                        db.commit()

    except Exception as e:
        print("Erro ao processar mensagem:", e)

@app.get("/")
async def root():
    return {"status": "Servidor online e escutando MQTT"}

# Rodar com:
# uvicorn app.conexao:app --reload
