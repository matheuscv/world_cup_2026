#!/usr/bin/env python3
"""
Backup automático do banco SQLite da Copa 2026.

Uso:
  python backend/scripts/backup_db.py
  python backend/scripts/backup_db.py --max-backups 20

Sugestão de agendamento (cron no Linux):
  0 */6 * * * cd /caminho/copa2026 && python backend/scripts/backup_db.py

Sugestão de agendamento (Task Scheduler no Windows):
  Programa: python
  Argumentos: backend/scripts/backup_db.py --max-backups 10
  Pasta: C:\caminho\copa2026
"""
import shutil
import sys
from datetime import datetime
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
DB_PATH = BASE_DIR / "db" / "copa2026.db"
BACKUP_DIR = BASE_DIR / "db" / "backups"


def backup(max_backups: int = 10) -> int:
    if not DB_PATH.exists():
        print(f"[ERRO] Banco não encontrado: {DB_PATH.resolve()}")
        return 1

    BACKUP_DIR.mkdir(parents=True, exist_ok=True)

    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    dest = BACKUP_DIR / f"copa2026_{ts}.db"

    shutil.copy2(DB_PATH, dest)
    size_kb = dest.stat().st_size // 1024
    print(f"[OK] Backup criado: {dest.name} ({size_kb} KB)")

    backups = sorted(BACKUP_DIR.glob("copa2026_*.db"))
    removidos = 0
    while len(backups) > max_backups:
        antigo = backups.pop(0)
        antigo.unlink()
        print(f"[OK] Backup antigo removido: {antigo.name}")
        removidos += 1

    print(f"[INFO] {len(backups)} backup(s) mantidos em {BACKUP_DIR.resolve()}")
    return 0


def parse_args():
    max_backups = 10
    args = sys.argv[1:]
    i = 0
    while i < len(args):
        if args[i] == "--max-backups" and i + 1 < len(args):
            try:
                max_backups = int(args[i + 1])
            except ValueError:
                print(f"[AVISO] Valor inválido para --max-backups: {args[i+1]}, usando 10")
            i += 2
        else:
            i += 1
    return max_backups


if __name__ == "__main__":
    sys.exit(backup(parse_args()))
