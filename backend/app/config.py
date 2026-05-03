import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = os.getenv("DB_PATH", str(BASE_DIR / "db" / "copa2026.db"))
PORT = int(os.getenv("PORT", 8000))
ADMIN_KEY = os.getenv("ADMIN_KEY", "admin123")
