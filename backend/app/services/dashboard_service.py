from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models import Propriedade, Animal, Checkup
from datetime import datetime, timedelta


def gerar_dashboard(propriedade_id: int, db: Session):
    propriedade = db.query(Propriedade).filter(Propriedade.id == propriedade_id).first()
    if not propriedade:
        raise HTTPException(status_code=404, detail="Propriedade não encontrada")

    # Buscar animais da propriedade
    animais = db.query(Animal).filter(Animal.propriedade_id == propriedade_id).all()
    total_animais = len(animais)

    # Buscar checkups recentes
    checkups = (
        db.query(Checkup)
        .join(Animal)
        .filter(Animal.propriedade_id == propriedade_id)
        .all()
    )

   
    dias_limite = datetime.now() - timedelta(days=30)
    ids_animais_com_checkup_recente = {
        c.animal_id for c in checkups if c.data and c.data > dias_limite
    }
    animais_com_pendencia = [
        a for a in animais if a.id not in ids_animais_com_checkup_recente
    ]
    total_pendencias = len(animais_com_pendencia)

    # Taxa de monitoramento
    taxa_monitoramento = (
        f"{(100 * (total_animais - total_pendencias) / total_animais):.2f}%"
        if total_animais > 0 else "0%"
    )

   
    indicadores = [
        {
            "icon": "/icons/vaca.png",
            "title": "Peso médio do rebanho",
            "subtitle": f"{peso_medio(animais)}",
            "unit": "Kg",
            "percent": 5
        },
        {
            "icon": "/icons/vaca.png",
            "title": "Eventos futuros programados",
            "subtitle": "10 vacinações\n5 check-ups",
            "unit": "",
            "percent": -2
        },
        {
            "icon": "/icons/vaca.png",
            "title": "Vacas vendidas",
            "subtitle": "R$800.00",
            "unit": "/Vaca",
            "percent": 3
        }
    ]


    saude = [
        { "name": "Saudáveis", "value": total_animais - total_pendencias },
        { "name": "Com alerta", "value": total_pendencias },
    ]

    # Dados de exemplo dos animais mais recentes
    animais_cards = [
        {
            "id": a.numero_identificacao,
            "location": propriedade.localizacao or "Local não informado",
            "peso": f"{a.peso_atual or 'N/A'}kg",
            "data": "12/04/2025",
            "idade": f"{a.idade or 'N/A'} anos",
            "raca": a.raca or "Desconhecida",
            "status": "Perfeito",
            "icon": "/icons/vaca.png"
        }
        for a in animais[:3]
    ]

    return {
        "totalAnimais": total_animais,
        "comPendencias": total_pendencias,
        "taxaMonitoramento": taxa_monitoramento,
        "indicadores": indicadores,
        "saude": saude,
        "animais": animais_cards
    }


def peso_medio(animais):
    pesos = [a.peso_atual for a in animais if a.peso_atual is not None]
    if not pesos:
        return "N/A"
    return round(sum(pesos) / len(pesos), 2)