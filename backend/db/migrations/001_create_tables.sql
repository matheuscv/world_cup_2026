PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS selecoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    nome_pt TEXT NOT NULL,
    codigo_iso TEXT NOT NULL,
    bandeira_emoji TEXT,
    confederacao TEXT NOT NULL,
    grupo TEXT NOT NULL,
    pote INTEGER NOT NULL,
    eh_cabeca_chave INTEGER NOT NULL DEFAULT 0,
    eh_sede INTEGER NOT NULL DEFAULT 0,
    treinador TEXT,
    ranking_fifa INTEGER,
    criado_em TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS jogadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    selecao_id INTEGER NOT NULL REFERENCES selecoes(id) ON DELETE CASCADE,
    numero INTEGER,
    nome TEXT NOT NULL,
    nome_curto TEXT,
    posicao TEXT NOT NULL CHECK(posicao IN ('GK','DEF','MID','FWD')),
    clube TEXT,
    idade INTEGER,
    eh_capitao INTEGER NOT NULL DEFAULT 0,
    criado_em TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS jogos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fase TEXT NOT NULL CHECK(fase IN ('grupo','oitavas','quartas','semi','terceiro','final')),
    grupo TEXT,
    rodada INTEGER,
    selecao_a_id INTEGER REFERENCES selecoes(id),
    selecao_b_id INTEGER REFERENCES selecoes(id),
    data_hora_utc TEXT NOT NULL,
    estadio TEXT,
    cidade TEXT,
    pais_sede TEXT,
    gols_a INTEGER,
    gols_b INTEGER,
    penaltis_a INTEGER,
    penaltis_b INTEGER,
    status TEXT NOT NULL DEFAULT 'agendado' CHECK(status IN ('agendado','em_andamento','encerrado')),
    criado_em TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_jogos_fase ON jogos(fase);
CREATE INDEX IF NOT EXISTS idx_jogos_grupo ON jogos(grupo);
CREATE INDEX IF NOT EXISTS idx_jogos_data ON jogos(data_hora_utc);
CREATE INDEX IF NOT EXISTS idx_jogos_status ON jogos(status);
CREATE INDEX IF NOT EXISTS idx_jogadores_selecao ON jogadores(selecao_id);

CREATE TABLE IF NOT EXISTS boloes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL DEFAULT 'Meu Bolão',
    session_id TEXT NOT NULL,
    criado_em TEXT DEFAULT (datetime('now')),
    atualizado_em TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS palpites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bolao_id INTEGER NOT NULL REFERENCES boloes(id) ON DELETE CASCADE,
    jogo_id INTEGER NOT NULL REFERENCES jogos(id),
    gols_a INTEGER NOT NULL DEFAULT 0,
    gols_b INTEGER NOT NULL DEFAULT 0,
    penaltis_a INTEGER,
    penaltis_b INTEGER,
    UNIQUE(bolao_id, jogo_id)
);

CREATE TABLE IF NOT EXISTS escalacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL DEFAULT 'Minha Escalação',
    formacao TEXT NOT NULL DEFAULT '4-3-3',
    titulares_json TEXT NOT NULL,
    reservas_json TEXT,
    session_id TEXT,
    criado_em TEXT DEFAULT (datetime('now'))
);
