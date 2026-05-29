from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
import logging

from app.routes import jogos, grupos, selecoes, boloes, escalacoes, admin
from app.database import get_pool
from app.config import DATABASE_URL

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: testa conexão com o banco
    logger.info(f"DATABASE_URL configurada: {'sim' if DATABASE_URL else 'NÃO'}")
    if DATABASE_URL:
        try:
            pool = await get_pool()
            async with pool.acquire() as conn:
                version = await conn.fetchval("SELECT version()")
                logger.info(f"Banco conectado: {version[:50]}...")
        except Exception as e:
            logger.error(f"ERRO ao conectar ao banco: {e}")
    yield
    # Shutdown


app = FastAPI(title="Copa do Mundo 2026 API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jogos.router, prefix="/api")
app.include_router(grupos.router, prefix="/api")
app.include_router(selecoes.router, prefix="/api")
app.include_router(boloes.router, prefix="/api")
app.include_router(escalacoes.router, prefix="/api")
app.include_router(admin.router, prefix="/api")


@app.get("/")
async def root():
    return RedirectResponse(url="/docs")

@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "Copa 2026 API"}


@app.exception_handler(404)
async def not_found(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={"error": "Recurso não encontrado"},
    )


@app.exception_handler(500)
async def server_error(request: Request, exc):
    return JSONResponse(
        status_code=500,
        content={"error": "Erro interno do servidor"},
    )
