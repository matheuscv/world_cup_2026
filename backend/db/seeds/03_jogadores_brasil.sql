BEGIN;

-- Brasil (selecao_id = 9)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(9, 1,  'Ederson Moraes',        'Ederson',          'GK',  'Manchester City',  30, 0),
(9, 12, 'Weverton Pereira',      'Weverton',         'GK',  'Palmeiras',        37, 0),
(9, 23, 'Bento Krepski',         'Bento',            'GK',  'Al-Qadsiah',       25, 0),
(9, 2,  'Danilo Luiz da Silva',  'Danilo',           'DEF', 'Flamengo',         33, 1),
(9, 3,  'Guilherme Arana',       'Arana',            'DEF', 'Atlético Mineiro', 27, 0),
(9, 4,  'Marquinhos',            'Marquinhos',       'DEF', 'PSG',              30, 0),
(9, 5,  'Gabriel Magalhães',     'Gabriel Magalhães','DEF', 'Arsenal',          26, 0),
(9, 6,  'Éder Militão',          'Militão',          'DEF', 'Real Madrid',      26, 0),
(9, 13, 'Alex Telles',           'Alex Telles',      'DEF', 'Sevilla',          31, 0),
(9, 22, 'Vanderson',             'Vanderson',        'DEF', 'Monaco',           23, 0),
(9, 7,  'Vinícius Júnior',       'Vini Jr.',         'FWD', 'Real Madrid',      25, 0),
(9, 8,  'Bruno Guimarães',       'Bruno G.',         'MID', 'Newcastle United', 27, 0),
(9, 9,  'Richarlison',           'Richarlison',      'FWD', 'Tottenham',        27, 0),
(9, 10, 'Neymar Júnior',         'Neymar Jr.',       'MID', 'Al-Hilal',         34, 0),
(9, 11, 'Raphinha',              'Raphinha',         'FWD', 'Barcelona',        29, 0),
(9, 14, 'Endrick Felipe',        'Endrick',          'FWD', 'Real Madrid',      20, 0),
(9, 15, 'Carlos Henrique Casemiro', 'Casemiro',      'MID', 'Manchester United',34, 0),
(9, 16, 'Gerson Santos',         'Gerson',           'MID', 'Flamengo',         27, 0),
(9, 17, 'Rodrygo Goes',          'Rodrygo',          'MID', 'Real Madrid',      25, 0),
(9, 18, 'Gabriel Martinelli',    'Martinelli',       'FWD', 'Arsenal',          25, 0),
(9, 19, 'Lucas Paquetá',         'Paquetá',          'MID', 'West Ham United',  28, 0),
(9, 20, 'Savinho',               'Savinho',          'FWD', 'Manchester City',  21, 0),
(9, 21, 'Evanilson',             'Evanilson',        'FWD', 'Bournemouth',      25, 0);

COMMIT;
