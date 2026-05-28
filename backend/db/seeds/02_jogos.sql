BEGIN;

-- ============================================================
-- FASE DE GRUPOS — 48 JOGOS (12 grupos × 6 jogos cada)
-- Fonte: sorteio oficial FIFA, 5 dez 2025, Washington D.C.
-- Horários em UTC (EDT = UTC-4 em junho)
-- IDs das seleções conforme 01_selecoes.sql
-- ============================================================

-- GRUPO A: México(1), Coreia do Sul(2), África do Sul(3), Tchéquia(4)
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'A', 1,  1,  3, '2026-06-11T19:00:00', 'Estadio Azteca',          'Cidade do México', 'México', 'agendado'),
('grupo', 'A', 1,  2,  4, '2026-06-12T02:00:00', 'Estadio Akron',           'Guadalajara',      'México', 'agendado'),
('grupo', 'A', 2,  4,  3, '2026-06-18T16:00:00', 'Mercedes-Benz Stadium',   'Atlanta',          'EUA',    'agendado'),
('grupo', 'A', 2,  1,  2, '2026-06-19T01:00:00', 'Estadio Akron',           'Guadalajara',      'México', 'agendado'),
('grupo', 'A', 3,  4,  1, '2026-06-25T01:00:00', 'Estadio Azteca',          'Cidade do México', 'México', 'agendado'),
('grupo', 'A', 3,  3,  2, '2026-06-25T01:00:00', 'Estadio BBVA',            'Monterrey',        'México', 'agendado');

-- GRUPO B: Canadá(5), Bósnia(6), Catar(7), Suíça(8)
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'B', 1,  5,  6, '2026-06-12T19:00:00', 'BMO Field',               'Toronto',          'Canadá', 'agendado'),
('grupo', 'B', 1,  7,  8, '2026-06-13T19:00:00', 'Levi''s Stadium',         'Santa Clara',      'EUA',    'agendado'),
('grupo', 'B', 2,  8,  6, '2026-06-18T19:00:00', 'SoFi Stadium',            'Inglewood',        'EUA',    'agendado'),
('grupo', 'B', 2,  5,  7, '2026-06-18T22:00:00', 'BC Place',                'Vancouver',        'Canadá', 'agendado'),
('grupo', 'B', 3,  8,  5, '2026-06-24T19:00:00', 'BC Place',                'Vancouver',        'Canadá', 'agendado'),
('grupo', 'B', 3,  6,  7, '2026-06-24T19:00:00', 'Lumen Field',             'Seattle',          'EUA',    'agendado');

-- GRUPO C: Brasil(9), Marrocos(10), Haiti(11), Escócia(12)
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'C', 1,  9, 10, '2026-06-13T22:00:00', 'MetLife Stadium',         'East Rutherford',  'EUA',    'agendado'),
('grupo', 'C', 1, 11, 12, '2026-06-14T01:00:00', 'Gillette Stadium',        'Foxborough',       'EUA',    'agendado'),
('grupo', 'C', 2, 12, 10, '2026-06-19T22:00:00', 'Gillette Stadium',        'Foxborough',       'EUA',    'agendado'),
('grupo', 'C', 2,  9, 11, '2026-06-20T01:00:00', 'Lincoln Financial Field', 'Filadélfia',       'EUA',    'agendado'),
('grupo', 'C', 3, 12,  9, '2026-06-24T22:00:00', 'Hard Rock Stadium',       'Miami Gardens',    'EUA',    'agendado'),
('grupo', 'C', 3, 10, 11, '2026-06-24T22:00:00', 'Mercedes-Benz Stadium',   'Atlanta',          'EUA',    'agendado');

-- GRUPO D: Estados Unidos(13), Paraguai(14), Austrália(15), Turquia(16)
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'D', 1, 13, 14, '2026-06-13T01:00:00', 'SoFi Stadium',            'Inglewood',        'EUA',    'agendado'),
('grupo', 'D', 1, 15, 16, '2026-06-13T04:00:00', 'BC Place',                'Vancouver',        'Canadá', 'agendado'),
('grupo', 'D', 2, 13, 15, '2026-06-19T19:00:00', 'Lumen Field',             'Seattle',          'EUA',    'agendado'),
('grupo', 'D', 2, 16, 14, '2026-06-20T03:00:00', 'Levi''s Stadium',         'Santa Clara',      'EUA',    'agendado'),
('grupo', 'D', 3, 16, 13, '2026-06-26T02:00:00', 'SoFi Stadium',            'Inglewood',        'EUA',    'agendado'),
('grupo', 'D', 3, 14, 15, '2026-06-26T02:00:00', 'Levi''s Stadium',         'Santa Clara',      'EUA',    'agendado');

-- GRUPO E: Alemanha(17), Costa do Marfim(18), Equador(19), Curaçao(20)
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'E', 1, 17, 20, '2026-06-14T17:00:00', 'NRG Stadium',             'Houston',          'EUA',    'agendado'),
('grupo', 'E', 1, 18, 19, '2026-06-14T23:00:00', 'Lincoln Financial Field', 'Filadélfia',       'EUA',    'agendado'),
('grupo', 'E', 2, 17, 18, '2026-06-20T20:00:00', 'BMO Field',               'Toronto',          'Canadá', 'agendado'),
('grupo', 'E', 2, 19, 20, '2026-06-21T00:00:00', 'Arrowhead Stadium',       'Kansas City',      'EUA',    'agendado'),
('grupo', 'E', 3, 20, 18, '2026-06-25T20:00:00', 'Lincoln Financial Field', 'Filadélfia',       'EUA',    'agendado'),
('grupo', 'E', 3, 19, 17, '2026-06-25T20:00:00', 'MetLife Stadium',         'East Rutherford',  'EUA',    'agendado');

-- GRUPO F: Países Baixos(21), Japão(22), Suécia(23), Tunísia(24)
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'F', 1, 21, 22, '2026-06-14T20:00:00', 'AT&T Stadium',            'Arlington',        'EUA',    'agendado'),
('grupo', 'F', 1, 23, 24, '2026-06-15T02:00:00', 'Estadio BBVA',            'Monterrey',        'México', 'agendado'),
('grupo', 'F', 2, 21, 23, '2026-06-20T17:00:00', 'NRG Stadium',             'Houston',          'EUA',    'agendado'),
('grupo', 'F', 2, 24, 22, '2026-06-20T00:00:00', 'Estadio BBVA',            'Monterrey',        'México', 'agendado'),
('grupo', 'F', 3, 22, 23, '2026-06-25T23:00:00', 'AT&T Stadium',            'Arlington',        'EUA',    'agendado'),
('grupo', 'F', 3, 24, 21, '2026-06-25T23:00:00', 'Arrowhead Stadium',       'Kansas City',      'EUA',    'agendado');

-- GRUPO G: Bélgica(25), Egito(26), Irã(27), Nova Zelândia(28)
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'G', 1, 25, 26, '2026-06-15T19:00:00', 'Lumen Field',             'Seattle',          'EUA',    'agendado'),
('grupo', 'G', 1, 27, 28, '2026-06-16T01:00:00', 'SoFi Stadium',            'Inglewood',        'EUA',    'agendado'),
('grupo', 'G', 2, 25, 27, '2026-06-21T19:00:00', 'SoFi Stadium',            'Inglewood',        'EUA',    'agendado'),
('grupo', 'G', 2, 28, 26, '2026-06-22T01:00:00', 'BC Place',                'Vancouver',        'Canadá', 'agendado'),
('grupo', 'G', 3, 26, 27, '2026-06-27T03:00:00', 'Lumen Field',             'Seattle',          'EUA',    'agendado'),
('grupo', 'G', 3, 28, 25, '2026-06-27T03:00:00', 'BC Place',                'Vancouver',        'Canadá', 'agendado');

-- GRUPO H: Espanha(29), Uruguai(30), Arábia Saudita(31), Cabo Verde(32)
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'H', 1, 29, 32, '2026-06-15T16:00:00', 'Mercedes-Benz Stadium',   'Atlanta',          'EUA',    'agendado'),
('grupo', 'H', 1, 31, 30, '2026-06-15T22:00:00', 'Hard Rock Stadium',       'Miami Gardens',    'EUA',    'agendado'),
('grupo', 'H', 2, 29, 31, '2026-06-21T16:00:00', 'Mercedes-Benz Stadium',   'Atlanta',          'EUA',    'agendado'),
('grupo', 'H', 2, 30, 32, '2026-06-21T22:00:00', 'Hard Rock Stadium',       'Miami Gardens',    'EUA',    'agendado'),
('grupo', 'H', 3, 32, 31, '2026-06-27T00:00:00', 'NRG Stadium',             'Houston',          'EUA',    'agendado'),
('grupo', 'H', 3, 30, 29, '2026-06-27T00:00:00', 'Estadio Akron',           'Guadalajara',      'México', 'agendado');

-- GRUPO I: França(33), Senegal(34), Noruega(35), Iraque(36)
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'I', 1, 33, 34, '2026-06-16T19:00:00', 'MetLife Stadium',         'East Rutherford',  'EUA',    'agendado'),
('grupo', 'I', 1, 36, 35, '2026-06-16T22:00:00', 'Gillette Stadium',        'Foxborough',       'EUA',    'agendado'),
('grupo', 'I', 2, 33, 36, '2026-06-22T21:00:00', 'Lincoln Financial Field', 'Filadélfia',       'EUA',    'agendado'),
('grupo', 'I', 2, 35, 34, '2026-06-23T00:00:00', 'MetLife Stadium',         'East Rutherford',  'EUA',    'agendado'),
('grupo', 'I', 3, 35, 33, '2026-06-26T19:00:00', 'Gillette Stadium',        'Foxborough',       'EUA',    'agendado'),
('grupo', 'I', 3, 34, 36, '2026-06-26T19:00:00', 'BMO Field',               'Toronto',          'Canadá', 'agendado');

-- GRUPO J: Argentina(37), Argélia(38), Áustria(39), Jordânia(40)
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'J', 1, 37, 38, '2026-06-16T20:00:00', 'Arrowhead Stadium',       'Kansas City',      'EUA',    'agendado'),
('grupo', 'J', 1, 39, 40, '2026-06-16T23:00:00', 'Levi''s Stadium',         'Santa Clara',      'EUA',    'agendado'),
('grupo', 'J', 2, 37, 39, '2026-06-22T19:00:00', 'AT&T Stadium',            'Arlington',        'EUA',    'agendado'),
('grupo', 'J', 2, 40, 38, '2026-06-22T19:00:00', 'Levi''s Stadium',         'Santa Clara',      'EUA',    'agendado'),
('grupo', 'J', 3, 40, 37, '2026-06-27T21:00:00', 'AT&T Stadium',            'Arlington',        'EUA',    'agendado'),
('grupo', 'J', 3, 38, 39, '2026-06-27T21:00:00', 'Arrowhead Stadium',       'Kansas City',      'EUA',    'agendado');

-- GRUPO K: Portugal(41), Colômbia(42), Rep. Dem. Congo(43), Uzbequistão(44)
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'K', 1, 41, 43, '2026-06-17T17:00:00', 'NRG Stadium',             'Houston',          'EUA',    'agendado'),
('grupo', 'K', 1, 44, 42, '2026-06-17T20:00:00', 'Estadio Azteca',          'Cidade do México', 'México', 'agendado'),
('grupo', 'K', 2, 41, 44, '2026-06-23T17:00:00', 'NRG Stadium',             'Houston',          'EUA',    'agendado'),
('grupo', 'K', 2, 42, 43, '2026-06-23T20:00:00', 'Estadio Akron',           'Guadalajara',      'México', 'agendado'),
('grupo', 'K', 3, 42, 41, '2026-06-27T21:00:00', 'Hard Rock Stadium',       'Miami Gardens',    'EUA',    'agendado'),
('grupo', 'K', 3, 43, 44, '2026-06-27T21:00:00', 'Mercedes-Benz Stadium',   'Atlanta',          'EUA',    'agendado');

-- GRUPO L: Inglaterra(45), Croácia(46), Gana(47), Panamá(48)
INSERT INTO jogos (fase, grupo, rodada, selecao_a_id, selecao_b_id, data_hora_utc, estadio, cidade, pais_sede, status) VALUES
('grupo', 'L', 1, 45, 46, '2026-06-17T20:00:00', 'AT&T Stadium',            'Arlington',        'EUA',    'agendado'),
('grupo', 'L', 1, 47, 48, '2026-06-17T23:00:00', 'BMO Field',               'Toronto',          'Canadá', 'agendado'),
('grupo', 'L', 2, 45, 47, '2026-06-23T20:00:00', 'Gillette Stadium',        'Foxborough',       'EUA',    'agendado'),
('grupo', 'L', 2, 48, 46, '2026-06-23T23:00:00', 'BMO Field',               'Toronto',          'Canadá', 'agendado'),
('grupo', 'L', 3, 48, 45, '2026-06-27T21:00:00', 'MetLife Stadium',         'East Rutherford',  'EUA',    'agendado'),
('grupo', 'L', 3, 46, 47, '2026-06-27T21:00:00', 'Lincoln Financial Field', 'Filadélfia',       'EUA',    'agendado');

COMMIT;
