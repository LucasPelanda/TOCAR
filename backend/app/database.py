from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Caminho para o banco de dados SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///./expcriativa.db"

# Cria a engine de conexão
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Cria a fábrica de sessões
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Classe base para os modelos do SQLAlchemy
Base = declarative_base()

# Dependência para ser usada nas rotas
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()