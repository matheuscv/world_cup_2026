import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
PORT = int(os.getenv("PORT", 8000))
ADMIN_KEY = os.getenv("ADMIN_KEY", "admin123")
DATABASE_URL = os.getenv("DATABASE_URL", "")
