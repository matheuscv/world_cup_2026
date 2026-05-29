import asyncpg
import logging
from app.config import DATABASE_URL

_pool = None
logger = logging.getLogger(__name__)


def _build_pool_kwargs(url: str) -> dict:
    """
    Monta os kwargs para asyncpg.create_pool baseado na DATABASE_URL.
    - Se a URL já tem sslmode=, asyncpg interpreta automaticamente.
    - Caso contrário, força ssl='require' (padrão seguro para cloud).
    - Remove search_path do pool; é setado por conexão em get_db().
    """
    url_lower = url.lower()
    kwargs: dict = {
        "min_size": 0,   # não criar conexões no startup; falha adiada para o 1o request
        "max_size": 10,
    }
    if "sslmode=disable" in url_lower:
        kwargs["ssl"] = False
    elif "sslmode=" not in url_lower:
        # URL sem sslmode explícito → forçar SSL (cloud/Render)
        kwargs["ssl"] = "require"
    # Se sslmode= já está na URL, asyncpg lê de lá — não sobrescrevemos

    return kwargs


async def get_pool():
    global _pool
    if _pool is None:
        if not DATABASE_URL:
            raise RuntimeError(
                "DATABASE_URL não configurada. "
                "Defina a variável de ambiente DATABASE_URL."
            )
        logger.info("Criando pool de conexões PostgreSQL...")
        kwargs = _build_pool_kwargs(DATABASE_URL)
        logger.info(f"Pool kwargs (exceto url): {kwargs}")
        _pool = await asyncpg.create_pool(DATABASE_URL, **kwargs)
        logger.info("Pool criado com sucesso.")
    return _pool


async def get_db():
    pool = await get_pool()
    async with pool.acquire() as conn:
        await conn.execute("SET search_path TO copa2026, public")
        yield conn
