# Copa do Mundo 2026

Aplicação web completa sobre a FIFA World Cup 2026. Tabela de jogos, grupos, classificação, elencos, escalação interativa e bolão com simulador de chaveamento.

**Stack:** Python 3.11 + FastAPI · React 18 + Vite · PostgreSQL (Supabase) · asyncpg · Tailwind CSS

**Deploy:** Frontend → Vercel | Backend → Render | Banco → Supabase (PostgreSQL)

---

## Pré-requisitos

| Ferramenta | Versão mínima |
|------------|---------------|
| Python     | 3.11          |
| Node.js    | 18            |
| npm        | 9             |
| PostgreSQL  | via Supabase ou local |

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

# Editar o .env com sua DATABASE_URL (Supabase/PostgreSQL) e ADMIN_KEY
# DATABASE_URL=postgresql://user:pass@host:5432/dbname
# PORT=8000
# ADMIN_KEY=minha-chave-secreta

# Rodar migration + seeds no banco PostgreSQL
python scripts/migrate.py --seed
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
| `python scripts/migrate.py` | Cria schema + tabelas no PostgreSQL |
| `python scripts/migrate.py --seed` | Migration + seeds (seleções, jogos, jogadores) |
| `python scripts/migrate.py --reset` | **Apaga** e recria tudo do zero |
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
│   │   ├── config.py           # Variáveis de ambiente
│   │   ├── database.py         # Pool asyncpg (PostgreSQL)
│   │   ├── routes/             # FastAPI routers (jogos, grupos, selecoes, boloes, admin)
│   │   └── services/           # Lógica de negócio (classificacao, chaveamento)
│   ├── db/
│   │   ├── migrations/         # DDL PostgreSQL (002_postgresql_copa2026.sql)
│   │   ├── seeds/              # Dados iniciais (seleções, jogos, jogadores)
│   │   └── legacy/             # Arquivos SQLite antigos (não usar)
│   ├── scripts/
│   │   └── migrate.py          # CLI para migrations e seeds
│   ├── tests/
│   │   ├── test_classificacao.py  # Testes unitários
│   │   └── test_api.py            # Testes de integração
│   ├── main.py             # Entry point FastAPI
│   ├── requirements.txt
│   ├── runtime.txt         # Python 3.11.9 (Render)
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

## Banco de dados

- **Motor:** PostgreSQL via Supabase (schema `copa2026`)
- **Driver:** asyncpg (async, sem ORM)
- **Dados iniciais:** 48 seleções, 72 jogos da fase de grupos, ~183 jogadores
- **Migrations:** `backend/db/migrations/002_postgresql_copa2026.sql`

Para visualizar o banco use o [Supabase Studio](https://supabase.com) ou qualquer cliente PostgreSQL (DBeaver, psql, etc).

---

## Funcionalidades

- **Tabela de jogos** — 104 jogos com filtros por fase, grupo, status e data
- **Grupos** — 12 grupos (A–L) com classificação em tempo real
- **Elencos** — Jogadores das 48 seleções com filtro por posição
- **Escalação** — Campo interativo com drag & drop, 7 formações, salvo no banco
- **Bolão** — Simule todos os 72 jogos, chaveamento automático até a final
- **Admin** — Painel protegido para atualizar placares e gerenciar elencos
