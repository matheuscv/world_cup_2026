"""
Script de migração: cria o schema copa2026 e todas as tabelas no PostgreSQL.
Executa os seeds de seleções, jogos e jogadores.

Uso:
    cd backend
    python scripts/migrate.py          # Só migrations (cria schema/tabelas)
    python scripts/migrate.py --seed   # Migrations + seeds
    python scripts/migrate.py --reset  # Drop schema + recria tudo + seeds
"""

import asyncio
import os
import sys
import argparse
from pathlib import Path

# Garante que o módulo app esteja no path
sys.path.insert(0, str(Path(__file__).parent.parent))

from dotenv import load_dotenv
load_dotenv()

import asyncpg

DATABASE_URL = os.getenv("DATABASE_URL", "")

MIGRATIONS_DIR = Path(__file__).parent.parent / "db" / "migrations"
SEEDS_DIR = Path(__file__).parent.parent / "db" / "seeds"

MIGRATION_FILE = MIGRATIONS_DIR / "002_postgresql_copa2026.sql"
SEED_FILES = [
    SEEDS_DIR / "01_selecoes.sql",
    SEEDS_DIR / "02_jogos.sql",
    SEEDS_DIR / "03_jogadores_brasil.sql",
    SEEDS_DIR / "04_jogadores_outros.sql",
]


def build_ssl(url: str):
    url_lower = url.lower()
    if "sslmode=disable" in url_lower:
        return False
    if "sslmode=" not in url_lower:
        return "require"
    return None  # asyncpg lê da URL


async def run_sql_file(conn, filepath: Path, label: str):
    if not filepath.exists():
        print(f"  [SKIP] {label}: arquivo não encontrado ({filepath})")
        return
    sql = filepath.read_text(encoding="utf-8")
    print(f"  [RUN] {label}...")
    await conn.execute(sql)
    print(f"  [OK]  {label}")


async def main(seed: bool, reset: bool):
    if not DATABASE_URL:
        print("ERRO: DATABASE_URL não configurada. Defina a variável de ambiente.")
        sys.exit(1)

    ssl = build_ssl(DATABASE_URL)
    ssl_kwargs = {"ssl": ssl} if ssl is not None else {}

    print(f"Conectando ao banco de dados...")
    conn = await asyncpg.connect(DATABASE_URL, **ssl_kwargs)
    print("Conectado!")

    try:
        if reset:
            print("\n[RESET] Removendo schema copa2026...")
            await conn.execute("DROP SCHEMA IF EXISTS copa2026 CASCADE")
            print("[RESET] Schema removido.")

        print("\n[MIGRATION] Criando schema e tabelas...")
        await run_sql_file(conn, MIGRATION_FILE, "002_postgresql_copa2026.sql")

        if seed or reset:
            print("\n[SEED] Populando dados...")
            await conn.execute("SET search_path TO copa2026")
            for f in SEED_FILES:
                await run_sql_file(conn, f, f.name)

        print("\n✓ Concluído!")

    finally:
        await conn.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Migração do banco Copa 2026")
    parser.add_argument("--seed", action="store_true", help="Executar seeds após migration")
    parser.add_argument("--reset", action="store_true", help="Drop schema, recriar e popular")
    args = parser.parse_args()

    asyncio.run(main(seed=args.seed, reset=args.reset))
