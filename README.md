# Copa do Mundo 2026

Aplicação web completa sobre a FIFA World Cup 2026. Tabela de jogos, grupos, classificação, elencos, escalação interativa e bolão com simulador de chaveamento.

**Stack:** Python 3.11 + FastAPI · React 18 + Vite · SQLite · Tailwind CSS

---

## Pré-requisitos

| Ferramenta | Versão mínima |
|------------|---------------|
| Python     | 3.11          |
| Node.js    | 18            |
| npm        | 9             |

---

## Setup inicial (primeira vez)

### 1. Backend

```bash
cd backend

# Criar ambiente virtual (recomendado)
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # Linux/macOS

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
copy .env.example .env        # Windows
# cp .env.example .env        # Linux/macOS

# Editar o .env e definir sua ADMIN_KEY
# DB_PATH=./db/copa2026.db
# PORT=8000
# ADMIN_KEY=minha-chave-secreta

# Inicializar banco de dados (cria tabelas + insere dados)
python db/init.py
```

### 2. Frontend

```bash
cd frontend
npm install
```

---

## Executar em desenvolvimento

Abra dois terminais:

**Terminal 1 — Backend:**
```bash
cd backend
.venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Acesse: **http://localhost:5173**

API docs: **http://localhost:8000/docs**

---

## Scripts úteis

| Comando | Descrição |
|---------|-----------|
| `python db/init.py` | Cria banco + migrations + seeds |
| `python db/init.py --reset` | **Apaga** e recria tudo do zero |
| `python db/init.py --seed-only` | Roda apenas os seeds (sem apagar) |
| `python scripts/backup_db.py` | Cria backup do banco com timestamp |
| `python scripts/backup_db.py --max-backups 20` | Backup mantendo 20 cópias |
| `npm run build` | Build de produção do frontend |
| `npm run preview` | Preview do build de produção |

---

## Testes

### Testes unitários (sem servidor)

```bash
cd copa2026    # raiz do projeto
python -m pytest backend/tests/test_classificacao.py -v
```

### Testes de integração (com servidor rodando)

```bash
# Com o backend em execução em :8000
python backend/tests/test_api.py
```

---

## Painel Administrativo

Acesse `/admin` no frontend para gerenciar jogos e elencos.

- **URL:** http://localhost:5173/admin
- **Autenticação:** chave definida em `backend/.env` → variável `ADMIN_KEY`
- **Funcionalidades:** atualizar placar e status de jogos, adicionar/remover jogadores dos elencos

---

## Estrutura do projeto

```
copa2026/
├── backend/
│   ├── app/
│   │   ├── routes/         # FastAPI routers (jogos, grupos, selecoes, boloes, admin)
│   │   └── services/       # Lógica de negócio (classificacao, chaveamento)
│   ├── db/
│   │   ├── migrations/     # DDL das tabelas
│   │   ├── seeds/          # Dados iniciais (seleções, jogos, jogadores)
│   │   └── init.py         # Script de setup do banco
│   ├── scripts/
│   │   └── backup_db.py    # Backup automático do SQLite
│   ├── tests/
│   │   ├── test_classificacao.py  # Testes unitários
│   │   └── test_api.py            # Testes de integração
│   ├── main.py             # Entry point FastAPI
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── hooks/          # Custom hooks (useJogos, useGrupos, useBolao)
│   │   ├── store/          # Estado global Zustand
│   │   └── utils/          # Utilitários (classificacao, formatDate, flags)
│   ├── index.html
│   └── package.json
├── CLAUDE.md               # Guia de contexto para desenvolvimento com IA
├── PRD.md                  # Product Requirements Document
└── Tasks.md                # Plano de desenvolvimento por sprints
```

---

## API — Endpoints principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| GET | `/api/jogos` | Lista jogos (filtros: fase, grupo, status, data) |
| GET | `/api/jogos/:id` | Detalhe de um jogo |
| GET | `/api/grupos` | Todos os grupos com classificação |
| GET | `/api/grupos/:letra` | Grupo específico (A–L) |
| GET | `/api/selecoes` | Todas as 48 seleções |
| GET | `/api/selecoes/:id` | Detalhe de uma seleção |
| GET | `/api/selecoes/:id/jogadores` | Elenco da seleção |
| POST | `/api/boloes` | Criar bolão (header: X-Session-Id) |
| POST | `/api/boloes/:id/palpites` | Salvar palpite |
| PATCH | `/api/admin/jogos/:id` | Atualizar placar (header: X-Admin-Key) |
| POST | `/api/admin/jogadores` | Adicionar jogador ao elenco |
| DELETE | `/api/admin/jogadores/:id` | Remover jogador do elenco |

Documentação interativa completa: http://localhost:8000/docs

---

## Deploy em produção (servidor Linux)

### Build do frontend

```bash
cd frontend
npm run build
# Arquivos gerados em frontend/dist/
```

### Servir o frontend com o backend (FastAPI serve static)

Adicione ao `backend/main.py`:

```python
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# Após definir as rotas da API:
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
if os.path.isdir(FRONTEND_DIR):
    app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="static")
```

Instale a dependência extra:
```bash
pip install aiofiles
```

### Variáveis de ambiente para produção

```env
DB_PATH=/var/data/copa2026.db
PORT=8000
ADMIN_KEY=chave-longa-e-aleatoria-aqui
```

### Backup automático (cron)

```cron
# A cada 6 horas
0 */6 * * * cd /caminho/copa2026 && /caminho/.venv/bin/python backend/scripts/backup_db.py --max-backups 14
```

---

## Banco de dados

- **Motor:** SQLite 3 (embutido no Python, zero configuração)
- **Arquivo:** `backend/db/copa2026.db`
- **Dados iniciais:** 48 seleções, 72 jogos da fase de grupos, ~183 jogadores
- **Foreign keys:** ativas via `PRAGMA foreign_keys = ON`

Para visualizar o banco use [DB Browser for SQLite](https://sqlitebrowser.org/).

---

## Funcionalidades

- **Tabela de jogos** — 104 jogos com filtros por fase, grupo, status e data
- **Grupos** — 12 grupos (A–L) com classificação em tempo real
- **Elencos** — Jogadores das 48 seleções com filtro por posição
- **Escalação** — Campo interativo com drag & drop, 7 formações, salvo no banco
- **Bolão** — Simule todos os 72 jogos, chaveamento automático até a final
- **Admin** — Painel protegido para atualizar placares e gerenciar elencos
