from sqlalchemy.orm import Session
from app.database import engine, SessionLocal
from app import models
from datetime import datetime

# Criar todas as tabelas
models.Base.metadata.create_all(bind=engine)

def popular_dados():
    db = SessionLocal()

    # 1. Criar usuário dono
    propriedade_id = 1
    dono = models.Usuario(nome="Lucas", email="lucas@tocar.com", senha="123", tipo="dono", propriedade_id=propriedade_id)
    db.add(dono)
    db.commit()
    db.refresh(dono)
    # 2. Criar propriedade associada ao dono
    fazenda = models.Propriedade(nome="Fazenda TOCAR", localizacao="Paraná", usuario_id=dono.id)
    db.add(fazenda)
    db.commit()
    db.refresh(fazenda)

    # 3. Criar funcionário vinculado à fazenda
    funcionario = models.Usuario(
        nome="Davi", 
        email="davi@tocar.com", 
        senha="123", 
        tipo="funcionario", 
        propriedade_id=fazenda.id
    )
    db.add(funcionario)
    db.commit()
    db.refresh(funcionario)

    # 4. Criar três animais
    animal1 = models.Animal(
        numero_identificacao="1234",
        especie="Bovina",
        sexo="Fêmea",
        idade=2,
        raca="Nelore",
        origem="Nascida na fazenda",
        peso_atual=430.5,
        propriedade_id=fazenda.id
    )

    animal2 = models.Animal(
        numero_identificacao="5678",
        especie="Bovina",
        sexo="Macho",
        idade=3,
        raca="Angus",
        origem="Compra externa",
        peso_atual=500.0,
        propriedade_id=fazenda.id
    )

    animal3 = models.Animal(
        numero_identificacao="9012",
        especie="Bovina",
        sexo="Fêmea",
        idade=1,
        raca="Girolando",
        origem="Nascida na fazenda",
        peso_atual=320.3,
        propriedade_id=fazenda.id
    )

    db.add_all([animal1, animal2, animal3])
    db.commit()
    db.refresh(animal1)

    # 5. Criar check-up para o primeiro animal
    checkup = models.Checkup(
        data=datetime.now(),
        peso=435.2,
        observacoes="Saudável",
        animal_id=animal1.id,
        usuario_id=funcionario.id
    )
    db.add(checkup)

    db.commit()
    db.close()
    print("Banco populado com sucesso!")

# Executar
if __name__ == "__main__":
    popular_dados()