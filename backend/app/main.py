from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import animais, checkups, funcionarios, dashboard, sensores, usuarios, propriedades


app = FastAPI(
    title="API ExpCriativa",
    description="Backend",
    version="1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(animais.router, prefix="/animais", tags=["Animais"])
app.include_router(checkups.router, prefix="/checkups", tags=["Checkups"])
app.include_router(funcionarios.router, prefix="/funcionarios", tags=["Funcionários"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(sensores.router, prefix="/sensores", tags=["Sensores"])
app.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])
app.include_router(propriedades.router, prefix="/propriedades", tags=["propriedades"])
