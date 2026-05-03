#!/usr/bin/env python3
"""
Script de inicializacao do banco de dados.

Uso:
  python db/init.py              # Cria banco + migrations + seeds
  python db/init.py --reset      # Apaga e recria tudo
  python db/init.py --seed-only  # Executa somente os seeds
"""

import sqlite3
import sys
from pathlib import Path

BASE_DIR = Path(__file__).parent
DB_PATH = BASE_DIR / "copa2026.db"
MIGRATIONS_DIR = BASE_DIR / "migrations"
SEEDS_DIR = BASE_DIR / "seeds"


def run_sql_file(conn: sqlite3.Connection, path: Path) -> None:
    with open(path, encoding="utf-8") as f:
        sql = f.read()
    conn.executescript(sql)
    print(f"  OK {path.name}")


def init_db(reset: bool = False, seed_only: bool = False) -> None:
    if reset and DB_PATH.exists():
        DB_PATH.unlink()
        print("Banco removido.")

    # Garantir que o diretorio db existe
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)

    conn = sqlite3.connect(str(DB_PATH))
    conn.execute("PRAGMA foreign_keys = ON")

    try:
        if not seed_only:
            print("Rodando migrations...")
            migration_files = sorted(MIGRATIONS_DIR.glob("*.sql"))
            if not migration_files:
                print("  Nenhuma migration encontrada.")
            for f in migration_files:
                run_sql_file(conn, f)

        print("Rodando seeds...")
        seed_files = sorted(SEEDS_DIR.glob("*.sql"))
        if not seed_files:
            print("  Nenhum seed encontrado.")
        for f in seed_files:
            run_sql_file(conn, f)

        conn.commit()
        print(f"\nBanco inicializado em: {DB_PATH.resolve()}")

    except Exception as e:
        conn.rollback()
        print(f"\nErro ao inicializar banco: {e}")
        raise
    finally:
        conn.close()


if __name__ == "__main__":
    reset = "--reset" in sys.argv
    seed_only = "--seed-only" in sys.argv

    if reset and seed_only:
        print("Erro: --reset e --seed-only sao mutuamente exclusivos.")
        sys.exit(1)

    init_db(reset=reset, seed_only=seed_only)
