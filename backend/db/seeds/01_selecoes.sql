BEGIN;

-- IDs atribuídos por ordem de inserção (AUTOINCREMENT):
-- Grupo A: 1=México, 2=Coreia do Sul, 3=África do Sul, 4=Tchéquia
-- Grupo B: 5=Canadá, 6=Bósnia, 7=Catar, 8=Suíça
-- Grupo C: 9=Brasil, 10=Marrocos, 11=Haiti, 12=Escócia
-- Grupo D: 13=EUA, 14=Paraguai, 15=Austrália, 16=Turquia
-- Grupo E: 17=Alemanha, 18=Costa do Marfim, 19=Equador, 20=Curaçao
-- Grupo F: 21=Países Baixos, 22=Japão, 23=Suécia, 24=Tunísia
-- Grupo G: 25=Bélgica, 26=Egito, 27=Irã, 28=Nova Zelândia
-- Grupo H: 29=Espanha, 30=Uruguai, 31=Arábia Saudita, 32=Cabo Verde
-- Grupo I: 33=França, 34=Senegal, 35=Noruega, 36=Iraque
-- Grupo J: 37=Argentina, 38=Argélia, 39=Áustria, 40=Jordânia
-- Grupo K: 41=Portugal, 42=Colômbia, 43=Rep. Dem. Congo, 44=Uzbequistão
-- Grupo L: 45=Inglaterra, 46=Croácia, 47=Gana, 48=Panamá

INSERT INTO selecoes (nome, nome_pt, codigo_iso, bandeira_emoji, confederacao, grupo, pote, eh_cabeca_chave, eh_sede, treinador, ranking_fifa) VALUES
-- Grupo A
('Mexico',              'México',             'MX',     '🇲🇽', 'CONCACAF', 'A', 1, 1, 1, 'Javier Aguirre',      15),
('Korea Republic',      'Coreia do Sul',      'KR',     '🇰🇷', 'AFC',      'A', 2, 0, 0, 'Hong Myung-bo',       22),
('South Africa',        'África do Sul',      'ZA',     '🇿🇦', 'CAF',      'A', 3, 0, 0, 'Hugo Broos',          60),
('Czechia',             'Tchéquia',           'CZ',     '🇨🇿', 'UEFA',     'A', 4, 0, 0, 'Ivan Hasek',          38),

-- Grupo B
('Canada',              'Canadá',             'CA',     '🇨🇦', 'CONCACAF', 'B', 1, 1, 1, 'Jesse Marsch',        40),
('Bosnia and Herzegovina','Bósnia e Herzegovina','BA',  '🇧🇦', 'UEFA',     'B', 4, 0, 0, 'Sergej Barbarez',     55),
('Qatar',               'Catar',              'QA',     '🇶🇦', 'AFC',      'B', 3, 0, 0, 'Marquez Lopez',       58),
('Switzerland',         'Suíça',              'CH',     '🇨🇭', 'UEFA',     'B', 2, 0, 0, 'Murat Yakin',         19),

-- Grupo C
('Brazil',              'Brasil',             'BR',     '🇧🇷', 'CONMEBOL', 'C', 1, 1, 0, 'Dorival Junior',       5),
('Morocco',             'Marrocos',           'MA',     '🇲🇦', 'CAF',      'C', 2, 0, 0, 'Walid Regragui',      12),
('Haiti',               'Haiti',              'HT',     '🇭🇹', 'CONCACAF', 'C', 4, 0, 0, 'Marc Collat',         83),
('Scotland',            'Escócia',            'GB-SCT', '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'UEFA',     'C', 3, 0, 0, 'Steve Clarke',        30),

-- Grupo D
('United States',       'Estados Unidos',     'US',     '🇺🇸', 'CONCACAF', 'D', 1, 1, 1, 'Mauricio Pochettino', 13),
('Paraguay',            'Paraguai',           'PY',     '🇵🇾', 'CONMEBOL', 'D', 3, 0, 0, 'Daniel Garnero',      64),
('Australia',           'Austrália',          'AU',     '🇦🇺', 'AFC',      'D', 2, 0, 0, 'Tony Popovic',        23),
('Turkey',              'Turquia',            'TR',     '🇹🇷', 'UEFA',     'D', 4, 0, 0, 'Vincenzo Montella',   29),

-- Grupo E
('Germany',             'Alemanha',           'DE',     '🇩🇪', 'UEFA',     'E', 1, 1, 0, 'Julian Nagelsmann',    4),
('Ivory Coast',         'Costa do Marfim',    'CI',     '🇨🇮', 'CAF',      'E', 3, 0, 0, 'Emerse Fae',          32),
('Ecuador',             'Equador',            'EC',     '🇪🇨', 'CONMEBOL', 'E', 2, 0, 0, 'Sebastian Beccacece', 39),
('Curacao',             'Curaçao',            'CW',     '🇨🇼', 'CONCACAF', 'E', 4, 0, 0, 'Patrick Kluivert',    78),

-- Grupo F
('Netherlands',         'Países Baixos',      'NL',     '🇳🇱', 'UEFA',     'F', 1, 1, 0, 'Ronald Koeman',        7),
('Japan',               'Japão',              'JP',     '🇯🇵', 'AFC',      'F', 2, 0, 0, 'Hajime Moriyasu',     17),
('Sweden',              'Suécia',             'SE',     '🇸🇪', 'UEFA',     'F', 4, 0, 0, 'Jon Dahl Tomasson',   24),
('Tunisia',             'Tunísia',            'TN',     '🇹🇳', 'CAF',      'F', 3, 0, 0, 'Jalel Kadri',         34),

-- Grupo G
('Belgium',             'Bélgica',            'BE',     '🇧🇪', 'UEFA',     'G', 1, 1, 0, 'Domenico Tedesco',     3),
('Egypt',               'Egito',              'EG',     '🇪🇬', 'CAF',      'G', 3, 0, 0, 'Rui Vitoria',         47),
('Iran',                'Irã',                'IR',     '🇮🇷', 'AFC',      'G', 2, 0, 0, 'Amir Ghalenoei',      26),
('New Zealand',         'Nova Zelândia',       'NZ',     '🇳🇿', 'OFC',      'G', 4, 0, 0, 'Darren Bazeley',     100),

-- Grupo H
('Spain',               'Espanha',            'ES',     '🇪🇸', 'UEFA',     'H', 1, 1, 0, 'Luis de la Fuente',    8),
('Uruguay',             'Uruguai',            'UY',     '🇺🇾', 'CONMEBOL', 'H', 2, 0, 0, 'Marcelo Bielsa',      14),
('Saudi Arabia',        'Arábia Saudita',     'SA',     '🇸🇦', 'AFC',      'H', 3, 0, 0, 'Roberto Mancini',     56),
('Cape Verde',          'Cabo Verde',         'CV',     '🇨🇻', 'CAF',      'H', 4, 0, 0, 'Bubista',             73),

-- Grupo I
('France',              'França',             'FR',     '🇫🇷', 'UEFA',     'I', 1, 1, 0, 'Didier Deschamps',     2),
('Senegal',             'Senegal',            'SN',     '🇸🇳', 'CAF',      'I', 2, 0, 0, 'Aliou Cisse',         20),
('Norway',              'Noruega',            'NO',     '🇳🇴', 'UEFA',     'I', 3, 0, 0, 'Stale Solbakken',     28),
('Iraq',                'Iraque',             'IQ',     '🇮🇶', 'AFC',      'I', 4, 0, 0, 'Jesus Casas',         61),

-- Grupo J
('Argentina',           'Argentina',          'AR',     '🇦🇷', 'CONMEBOL', 'J', 1, 1, 0, 'Lionel Scaloni',       1),
('Algeria',             'Argélia',            'DZ',     '🇩🇿', 'CAF',      'J', 3, 0, 0, 'Vladimir Petkovic',   44),
('Austria',             'Áustria',            'AT',     '🇦🇹', 'UEFA',     'J', 2, 0, 0, 'Ralf Rangnick',       25),
('Jordan',              'Jordânia',           'JO',     '🇯🇴', 'AFC',      'J', 4, 0, 0, 'Hussain Amuta',       87),

-- Grupo K
('Portugal',            'Portugal',           'PT',     '🇵🇹', 'UEFA',     'K', 1, 1, 0, 'Bruno Lage',           6),
('Colombia',            'Colômbia',           'CO',     '🇨🇴', 'CONMEBOL', 'K', 2, 0, 0, 'Nestor Lorenzo',      11),
('DR Congo',            'Rep. Dem. do Congo', 'CD',     '🇨🇩', 'CAF',      'K', 4, 0, 0, 'Sebastien Desabre',   50),
('Uzbekistan',          'Uzbequistão',        'UZ',     '🇺🇿', 'AFC',      'K', 3, 0, 0, 'Srecko Katanec',      74),

-- Grupo L
('England',             'Inglaterra',         'GB-ENG', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'UEFA',     'L', 1, 1, 0, 'Thomas Tuchel',        5),
('Croatia',             'Croácia',            'HR',     '🇭🇷', 'UEFA',     'L', 2, 0, 0, 'Zlatko Dalic',        10),
('Ghana',               'Gana',               'GH',     '🇬🇭', 'CAF',      'L', 4, 0, 0, 'Otto Addo',           56),
('Panama',              'Panamá',             'PA',     '🇵🇦', 'CONCACAF', 'L', 3, 0, 0, 'Thomas Christiansen', 51);

COMMIT;
