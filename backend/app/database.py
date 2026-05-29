import asyncpg
from app.config import DATABASE_URL

_pool = None


async def get_pool():
    global _pool
    if _pool is None:
        _pool = await asyncpg.create_pool(
            DATABASE_URL,
            min_size=1,
            max_size=10,
            server_settings={"search_path": "copa2026"},
            ssl="require",
        )
    return _pool


async def get_db():
    pool = await get_pool()
    async with pool.acquire() as conn:
        yield conn
