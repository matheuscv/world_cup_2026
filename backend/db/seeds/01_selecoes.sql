BEGIN;

INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, treinador, ranking_fifa) VALUES
-- Grupo A
('Mexico', 'México', 'MX', '🇲🇽', 'CONCACAF', 'A', 1, 1, 1, 'Javier Aguirre', 15),
('South Korea', 'Coreia do Sul', 'KR', '🇰🇷', 'AFC', 'A', 2, 0, 0, 'Hong Myung-bo', 22),
('Czech Republic', 'República Tcheca', 'CZ', '🇨🇿', 'UEFA', 'A', 3, 0, 0, 'Ivan Hasek', 38),
('South Africa', 'África do Sul', 'ZA', '🇿🇦', 'CAF', 'A', 4, 0, 0, 'Hugo Broos', 60),

-- Grupo B
('Canada', 'Canadá', 'CA', '🇨🇦', 'CONCACAF', 'B', 1, 1, 1, 'Jesse Marsch', 40),
('Bosnia and Herzegovina', 'Bósnia e Herzegovina', 'BA', '🇧🇦', 'UEFA', 'B', 2, 0, 0, 'Sergej Barbarez', 55),
('Qatar', 'Catar', 'QA', '🇶🇦', 'AFC', 'B', 3, 0, 0, 'Marquez Lopez', 58),
('Switzerland', 'Suíça', 'CH', '🇨🇭', 'UEFA', 'B', 4, 0, 0, 'Murat Yakin', 19),

-- Grupo C
('Argentina', 'Argentina', 'AR', '🇦🇷', 'CONMEBOL', 'C', 1, 1, 0, 'Lionel Scaloni', 1),
('Croatia', 'Croácia', 'HR', '🇭🇷', 'UEFA', 'C', 2, 0, 0, 'Zlatko Dalic', 10),
('Morocco', 'Marrocos', 'MA', '🇲🇦', 'CAF', 'C', 3, 0, 0, 'Walid Regragui', 12),
('Ecuador', 'Equador', 'EC', '🇪🇨', 'CONMEBOL', 'C', 4, 0, 0, 'Sebastian Beccacece', 39),

-- Grupo D
('USA', 'Estados Unidos', 'US', '🇺🇸', 'CONCACAF', 'D', 1, 1, 1, 'Mauricio Pochettino', 13),
('Australia', 'Austrália', 'AU', '🇦🇺', 'AFC', 'D', 2, 0, 0, 'Tony Popovic', 23),
('Paraguay', 'Paraguai', 'PY', '🇵🇾', 'CONMEBOL', 'D', 3, 0, 0, 'Daniel Garnero', 64),
('Turkey', 'Turquia', 'TR', '🇹🇷', 'UEFA', 'D', 4, 0, 0, 'Vincenzo Montella', 29),

-- Grupo E
('Germany', 'Alemanha', 'DE', '🇩🇪', 'UEFA', 'E', 1, 1, 0, 'Julian Nagelsmann', 4),
('Japan', 'Japão', 'JP', '🇯🇵', 'AFC', 'E', 2, 0, 0, 'Hajime Moriyasu', 17),
('Ivory Coast', 'Costa do Marfim', 'CI', '🇨🇮', 'CAF', 'E', 3, 0, 0, 'Emerse Fae', 32),
('Curacao', 'Curaçao', 'CW', '🇨🇼', 'CONCACAF', 'E', 4, 0, 0, 'Patrick Kluivert', 78),

-- Grupo F
('Netherlands', 'Holanda', 'NL', '🇳🇱', 'UEFA', 'F', 1, 1, 0, 'Ronald Koeman', 7),
('Sweden', 'Suécia', 'SE', '🇸🇪', 'UEFA', 'F', 2, 0, 0, 'Jon Dahl Tomasson', 24),
('Tunisia', 'Tunísia', 'TN', '🇹🇳', 'CAF', 'F', 3, 0, 0, 'Jalel Kadri', 34),
('Venezuela', 'Venezuela', 'VE', '🇻🇪', 'CONMEBOL', 'F', 4, 0, 0, 'Fernando Batista', 68),

-- Grupo G
('Brazil', 'Brasil', 'BR', '🇧🇷', 'CONMEBOL', 'G', 1, 1, 0, 'Dorival Junior', 5),
('Nigeria', 'Nigéria', 'NG', '🇳🇬', 'CAF', 'G', 2, 0, 0, 'Finidi George', 35),
('Colombia', 'Colômbia', 'CO', '🇨🇴', 'CONMEBOL', 'G', 3, 0, 0, 'Nestor Lorenzo', 11),
('Saudi Arabia', 'Arábia Saudita', 'SA', '🇸🇦', 'AFC', 'G', 4, 0, 0, 'Roberto Mancini', 56),

-- Grupo H
('Spain', 'Espanha', 'ES', '🇪🇸', 'UEFA', 'H', 1, 1, 0, 'Luis de la Fuente', 8),
('Uruguay', 'Uruguai', 'UY', '🇺🇾', 'CONMEBOL', 'H', 2, 0, 0, 'Marcelo Bielsa', 14),
('Cape Verde', 'Cabo Verde', 'CV', '🇨🇻', 'CAF', 'H', 3, 0, 0, 'Bubista', 73),
('Jamaica', 'Jamaica', 'JM', '🇯🇲', 'CONCACAF', 'H', 4, 0, 0, 'Heimir Hallgrimsson', 54),

-- Grupo I
('France', 'França', 'FR', '🇫🇷', 'UEFA', 'I', 1, 1, 0, 'Didier Deschamps', 3),
('Norway', 'Noruega', 'NO', '🇳🇴', 'UEFA', 'I', 2, 0, 0, 'Stale Solbakken', 28),
('Senegal', 'Senegal', 'SN', '🇸🇳', 'CAF', 'I', 3, 0, 0, 'Aliou Cisse', 20),
('Iraq', 'Iraque', 'IQ', '🇮🇶', 'AFC', 'I', 4, 0, 0, 'Jesus Casas', 61),

-- Grupo J
('Portugal', 'Portugal', 'PT', '🇵🇹', 'UEFA', 'J', 1, 1, 0, 'Roberto Martinez', 6),
('DR Congo', 'Rep. Democrática do Congo', 'CD', '🇨🇩', 'CAF', 'J', 2, 0, 0, 'Sebastien Desabre', 50),
('Cameroon', 'Camarões', 'CM', '🇨🇲', 'CAF', 'J', 3, 0, 0, 'Marc Brys', 43),
('Uzbekistan', 'Uzbequistão', 'UZ', '🇺🇿', 'AFC', 'J', 4, 0, 0, 'Srecko Katanec', 74),

-- Grupo K
('Belgium', 'Bélgica', 'BE', '🇧🇪', 'UEFA', 'K', 1, 1, 0, 'Domenico Tedesco', 3),
('Iran', 'Irã', 'IR', '🇮🇷', 'AFC', 'K', 2, 0, 0, 'Amir Ghalenoei', 26),
('Egypt', 'Egito', 'EG', '🇪🇬', 'CAF', 'K', 3, 0, 0, 'Rui Vitoria', 47),
('New Zealand', 'Nova Zelândia', 'NZ', '🇳🇿', 'OFC', 'K', 4, 0, 0, 'Darren Bazeley', 100),

-- Grupo L
('England', 'Inglaterra', 'GB-ENG', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'UEFA', 'L', 1, 1, 0, 'Gareth Southgate', 5),
('Scotland', 'Escócia', 'GB-SCT', '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'UEFA', 'L', 2, 0, 0, 'Steve Clarke', 30),
('Ghana', 'Gana', 'GH', '🇬🇭', 'CAF', 'L', 3, 0, 0, 'Otto Addo', 56),
('Panama', 'Panamá', 'PA', '🇵🇦', 'CONCACAF', 'L', 4, 0, 0, 'Thomas Christiansen', 51);

COMMIT;
