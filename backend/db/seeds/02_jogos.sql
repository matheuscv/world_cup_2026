BEGIN;

-- ============================================================
-- FASE DE GRUPOS — 72 JOGOS (12 grupos x 6 jogos cada)
-- Rodada 1: selecao1 vs selecao2 | selecao3 vs selecao4
-- Rodada 2: selecao1 vs selecao3 | selecao2 vs selecao4
-- Rodada 3: selecao1 vs selecao4 | selecao2 vs selecao3
-- IDs das selecoes conforme 01_selecoes.sql
-- ============================================================

-- GRUPO A: México(1), Coreia do Sul(2), República Tcheca(3), África do Sul(4)
-- Rodada 1 — 2026-06-11
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'A', 1, 1, 4, '2026-06-11T20:00:00', 'Estádio Azteca', 'Cidade do México', 'México', 'agendado'),
('grupo', 'A', 1, 2, 3, '2026-06-11T17:00:00', 'Estádio Akron', 'Guadalajara', 'México', 'agendado'),
-- Rodada 2 — 2026-06-23
('grupo', 'A', 2, 1, 3, '2026-06-23T20:00:00', 'Estádio Azteca', 'Cidade do México', 'México', 'agendado'),
('grupo', 'A', 2, 4, 2, '2026-06-23T17:00:00', 'Estádio Akron', 'Guadalajara', 'México', 'agendado'),
-- Rodada 3 — 2026-06-29
('grupo', 'A', 3, 1, 2, '2026-06-29T20:00:00', 'Estádio Azteca', 'Cidade do México', 'México', 'agendado'),
('grupo', 'A', 3, 3, 4, '2026-06-29T20:00:00', 'Estádio BBVA', 'Monterrey', 'México', 'agendado');

-- GRUPO B: Canadá(5), Bósnia(6), Catar(7), Suíça(8)
-- Rodada 1 — 2026-06-12
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'B', 1, 5, 8, '2026-06-12T20:00:00', 'BMO Field', 'Toronto', 'Canadá', 'agendado'),
('grupo', 'B', 1, 6, 7, '2026-06-12T17:00:00', 'BC Place', 'Vancouver', 'Canadá', 'agendado'),
-- Rodada 2 — 2026-06-24
('grupo', 'B', 2, 5, 7, '2026-06-24T20:00:00', 'BMO Field', 'Toronto', 'Canadá', 'agendado'),
('grupo', 'B', 2, 8, 6, '2026-06-24T17:00:00', 'BC Place', 'Vancouver', 'Canadá', 'agendado'),
-- Rodada 3 — 2026-06-30
('grupo', 'B', 3, 5, 6, '2026-06-30T20:00:00', 'BMO Field', 'Toronto', 'Canadá', 'agendado'),
('grupo', 'B', 3, 7, 8, '2026-06-30T20:00:00', 'BC Place', 'Vancouver', 'Canadá', 'agendado');

-- GRUPO C: Argentina(9), Croácia(10), Marrocos(11), Equador(12)
-- Rodada 1 — 2026-06-13
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'C', 1, 9, 12, '2026-06-13T20:00:00', 'MetLife Stadium', 'Nova York / Nova Jérsei', 'EUA', 'agendado'),
('grupo', 'C', 1, 10, 11, '2026-06-13T17:00:00', 'Gillette Stadium', 'Boston', 'EUA', 'agendado'),
-- Rodada 2 — 2026-06-25
('grupo', 'C', 2, 9, 11, '2026-06-25T20:00:00', 'MetLife Stadium', 'Nova York / Nova Jérsei', 'EUA', 'agendado'),
('grupo', 'C', 2, 12, 10, '2026-06-25T17:00:00', 'Gillette Stadium', 'Boston', 'EUA', 'agendado'),
-- Rodada 3 — 2026-07-01
('grupo', 'C', 3, 9, 10, '2026-07-01T20:00:00', 'MetLife Stadium', 'Nova York / Nova Jérsei', 'EUA', 'agendado'),
('grupo', 'C', 3, 11, 12, '2026-07-01T20:00:00', 'Gillette Stadium', 'Boston', 'EUA', 'agendado');

-- GRUPO D: EUA(13), Austrália(14), Paraguai(15), Turquia(16)
-- Rodada 1 — 2026-06-14
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'D', 1, 13, 16, '2026-06-14T20:00:00', 'SoFi Stadium', 'Los Angeles', 'EUA', 'agendado'),
('grupo', 'D', 1, 14, 15, '2026-06-14T17:00:00', 'Lumen Field', 'Seattle', 'EUA', 'agendado'),
-- Rodada 2 — 2026-06-26
('grupo', 'D', 2, 13, 15, '2026-06-26T20:00:00', 'SoFi Stadium', 'Los Angeles', 'EUA', 'agendado'),
('grupo', 'D', 2, 16, 14, '2026-06-26T17:00:00', 'Lumen Field', 'Seattle', 'EUA', 'agendado'),
-- Rodada 3 — 2026-07-02
('grupo', 'D', 3, 13, 14, '2026-07-02T20:00:00', 'SoFi Stadium', 'Los Angeles', 'EUA', 'agendado'),
('grupo', 'D', 3, 15, 16, '2026-07-02T20:00:00', 'Lumen Field', 'Seattle', 'EUA', 'agendado');

-- GRUPO E: Alemanha(17), Japão(18), Costa do Marfim(19), Curaçao(20)
-- Rodada 1 — 2026-06-15
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'E', 1, 17, 20, '2026-06-15T20:00:00', 'AT&T Stadium', 'Dallas', 'EUA', 'agendado'),
('grupo', 'E', 1, 18, 19, '2026-06-15T17:00:00', 'Arrowhead Stadium', 'Kansas City', 'EUA', 'agendado'),
-- Rodada 2 — 2026-06-27
('grupo', 'E', 2, 17, 19, '2026-06-27T20:00:00', 'AT&T Stadium', 'Dallas', 'EUA', 'agendado'),
('grupo', 'E', 2, 20, 18, '2026-06-27T17:00:00', 'Arrowhead Stadium', 'Kansas City', 'EUA', 'agendado'),
-- Rodada 3 — 2026-07-03
('grupo', 'E', 3, 17, 18, '2026-07-03T20:00:00', 'AT&T Stadium', 'Dallas', 'EUA', 'agendado'),
('grupo', 'E', 3, 19, 20, '2026-07-03T20:00:00', 'Arrowhead Stadium', 'Kansas City', 'EUA', 'agendado');

-- GRUPO F: Holanda(21), Suécia(22), Tunísia(23), Venezuela(24)
-- Rodada 1 — 2026-06-16
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'F', 1, 21, 24, '2026-06-16T20:00:00', 'Lincoln Financial Field', 'Filadélfia', 'EUA', 'agendado'),
('grupo', 'F', 1, 22, 23, '2026-06-16T17:00:00', 'Hard Rock Stadium', 'Miami', 'EUA', 'agendado'),
-- Rodada 2 — 2026-06-28
('grupo', 'F', 2, 21, 23, '2026-06-28T20:00:00', 'Lincoln Financial Field', 'Filadélfia', 'EUA', 'agendado'),
('grupo', 'F', 2, 24, 22, '2026-06-28T17:00:00', 'Hard Rock Stadium', 'Miami', 'EUA', 'agendado'),
-- Rodada 3 — 2026-07-04
('grupo', 'F', 3, 21, 22, '2026-07-04T20:00:00', 'Lincoln Financial Field', 'Filadélfia', 'EUA', 'agendado'),
('grupo', 'F', 3, 23, 24, '2026-07-04T20:00:00', 'Hard Rock Stadium', 'Miami', 'EUA', 'agendado');

-- GRUPO G: Brasil(25), Nigéria(26), Colômbia(27), Arábia Saudita(28)
-- Rodada 1 — 2026-06-17
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'G', 1, 25, 28, '2026-06-17T20:00:00', 'SoFi Stadium', 'Los Angeles', 'EUA', 'agendado'),
('grupo', 'G', 1, 26, 27, '2026-06-17T17:00:00', 'NRG Stadium', 'Houston', 'EUA', 'agendado'),
-- Rodada 2 — 2026-06-29
('grupo', 'G', 2, 25, 27, '2026-06-29T20:00:00', 'SoFi Stadium', 'Los Angeles', 'EUA', 'agendado'),
('grupo', 'G', 2, 28, 26, '2026-06-29T17:00:00', 'NRG Stadium', 'Houston', 'EUA', 'agendado'),
-- Rodada 3 — 2026-07-05
('grupo', 'G', 3, 25, 26, '2026-07-05T20:00:00', 'SoFi Stadium', 'Los Angeles', 'EUA', 'agendado'),
('grupo', 'G', 3, 27, 28, '2026-07-05T20:00:00', 'NRG Stadium', 'Houston', 'EUA', 'agendado');

-- GRUPO H: Espanha(29), Uruguai(30), Cabo Verde(31), Jamaica(32)
-- Rodada 1 — 2026-06-18
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'H', 1, 29, 32, '2026-06-18T20:00:00', 'MetLife Stadium', 'Nova York / Nova Jérsei', 'EUA', 'agendado'),
('grupo', 'H', 1, 30, 31, '2026-06-18T17:00:00', 'AT&T Stadium', 'Dallas', 'EUA', 'agendado'),
-- Rodada 2 — 2026-06-30
('grupo', 'H', 2, 29, 31, '2026-06-30T20:00:00', 'MetLife Stadium', 'Nova York / Nova Jérsei', 'EUA', 'agendado'),
('grupo', 'H', 2, 32, 30, '2026-06-30T17:00:00', 'AT&T Stadium', 'Dallas', 'EUA', 'agendado'),
-- Rodada 3 — 2026-07-06
('grupo', 'H', 3, 29, 30, '2026-07-06T20:00:00', 'MetLife Stadium', 'Nova York / Nova Jérsei', 'EUA', 'agendado'),
('grupo', 'H', 3, 31, 32, '2026-07-06T20:00:00', 'AT&T Stadium', 'Dallas', 'EUA', 'agendado');

-- GRUPO I: França(33), Noruega(34), Senegal(35), Iraque(36)
-- Rodada 1 — 2026-06-19
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'I', 1, 33, 36, '2026-06-19T20:00:00', 'Levi''s Stadium', 'San Francisco / Bay Area', 'EUA', 'agendado'),
('grupo', 'I', 1, 34, 35, '2026-06-19T17:00:00', 'Mercedes-Benz Stadium', 'Atlanta', 'EUA', 'agendado'),
-- Rodada 2 — 2026-07-01
('grupo', 'I', 2, 33, 35, '2026-07-01T17:00:00', 'Levi''s Stadium', 'San Francisco / Bay Area', 'EUA', 'agendado'),
('grupo', 'I', 2, 36, 34, '2026-07-01T17:00:00', 'Mercedes-Benz Stadium', 'Atlanta', 'EUA', 'agendado'),
-- Rodada 3 — 2026-07-07
('grupo', 'I', 3, 33, 34, '2026-07-07T20:00:00', 'Levi''s Stadium', 'San Francisco / Bay Area', 'EUA', 'agendado'),
('grupo', 'I', 3, 35, 36, '2026-07-07T20:00:00', 'Mercedes-Benz Stadium', 'Atlanta', 'EUA', 'agendado');

-- GRUPO J: Portugal(37), Rep Dem Congo(38), Camarões(39), Uzbequistão(40)
-- Rodada 1 — 2026-06-20
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'J', 1, 37, 40, '2026-06-20T20:00:00', 'Hard Rock Stadium', 'Miami', 'EUA', 'agendado'),
('grupo', 'J', 1, 38, 39, '2026-06-20T17:00:00', 'Lincoln Financial Field', 'Filadélfia', 'EUA', 'agendado'),
-- Rodada 2 — 2026-07-02
('grupo', 'J', 2, 37, 39, '2026-07-02T17:00:00', 'Hard Rock Stadium', 'Miami', 'EUA', 'agendado'),
('grupo', 'J', 2, 40, 38, '2026-07-02T17:00:00', 'Lincoln Financial Field', 'Filadélfia', 'EUA', 'agendado'),
-- Rodada 3 — 2026-07-08
('grupo', 'J', 3, 37, 38, '2026-07-08T20:00:00', 'Hard Rock Stadium', 'Miami', 'EUA', 'agendado'),
('grupo', 'J', 3, 39, 40, '2026-07-08T20:00:00', 'Lincoln Financial Field', 'Filadélfia', 'EUA', 'agendado');

-- GRUPO K: Bélgica(41), Irã(42), Egito(43), Nova Zelândia(44)
-- Rodada 1 — 2026-06-21
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'K', 1, 41, 44, '2026-06-21T20:00:00', 'NRG Stadium', 'Houston', 'EUA', 'agendado'),
('grupo', 'K', 1, 42, 43, '2026-06-21T17:00:00', 'Arrowhead Stadium', 'Kansas City', 'EUA', 'agendado'),
-- Rodada 2 — 2026-07-03
('grupo', 'K', 2, 41, 43, '2026-07-03T17:00:00', 'NRG Stadium', 'Houston', 'EUA', 'agendado'),
('grupo', 'K', 2, 44, 42, '2026-07-03T17:00:00', 'Arrowhead Stadium', 'Kansas City', 'EUA', 'agendado'),
-- Rodada 3 — 2026-07-09
('grupo', 'K', 3, 41, 42, '2026-07-09T20:00:00', 'NRG Stadium', 'Houston', 'EUA', 'agendado'),
('grupo', 'K', 3, 43, 44, '2026-07-09T20:00:00', 'Arrowhead Stadium', 'Kansas City', 'EUA', 'agendado');

-- GRUPO L: Inglaterra(45), Escócia(46), Gana(47), Panamá(48)
-- Rodada 1 — 2026-06-22
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'L', 1, 45, 48, '2026-06-22T20:00:00', 'Gillette Stadium', 'Boston', 'EUA', 'agendado'),
('grupo', 'L', 1, 46, 47, '2026-06-22T17:00:00', 'Mercedes-Benz Stadium', 'Atlanta', 'EUA', 'agendado'),
-- Rodada 2 — 2026-07-04
('grupo', 'L', 2, 45, 47, '2026-07-04T17:00:00', 'Gillette Stadium', 'Boston', 'EUA', 'agendado'),
('grupo', 'L', 2, 48, 46, '2026-07-04T17:00:00', 'Mercedes-Benz Stadium', 'Atlanta', 'EUA', 'agendado'),
-- Rodada 3 — 2026-07-10
('grupo', 'L', 3, 45, 46, '2026-07-10T20:00:00', 'Gillette Stadium', 'Boston', 'EUA', 'agendado'),
('grupo', 'L', 3, 47, 48, '2026-07-10T20:00:00', 'Mercedes-Benz Stadium', 'Atlanta', 'EUA', 'agendado');

COMMIT;
