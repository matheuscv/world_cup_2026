from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
import logging

from app.routes import jogos, grupos, selecoes, boloes, escalacoes, admin

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="Copa do Mundo 2026 API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:3000"],
    allow_credentials=True,
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
