from app.database import SessionLocal
from app.models import LeituraSensorial

def get_ultimo_bpm():
    try:
        with SessionLocal() as db:
            leitura = (
                db.query(LeituraSensorial.batimentos_cardiacos)
                .order_by(LeituraSensorial.data_hora.desc())
                .first()
            )
            return leitura[0] if leitura else 0
    except Exception as e:
        print("Erro ao buscar último BPM:", e)
        return 0