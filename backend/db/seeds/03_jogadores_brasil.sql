BEGIN;

-- Brasil (selecao_id = 25)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(25, 1,  'Ederson Moraes',        'Ederson',          'GK',  'Manchester City',  30, 0),
(25, 12, 'Weverton Pereira',      'Weverton',         'GK',  'Palmeiras',        37, 0),
(25, 23, 'Bento Krepski',         'Bento',            'GK',  'Al-Qadsiah',       25, 0),
(25, 2,  'Danilo Luiz da Silva',  'Danilo',           'DEF', 'Flamengo',         33, 1),
(25, 3,  'Guilherme Arana',       'Arana',            'DEF', 'Atlético Mineiro', 27, 0),
(25, 4,  'Marquinhos',            'Marquinhos',       'DEF', 'PSG',              30, 0),
(25, 5,  'Gabriel Magalhães',     'Gabriel Magalhães','DEF', 'Arsenal',          26, 0),
(25, 6,  'Éder Militão',          'Militão',          'DEF', 'Real Madrid',      26, 0),
(25, 13, 'Alex Telles',           'Alex Telles',      'DEF', 'Sevilla',          31, 0),
(25, 22, 'Vanderson',             'Vanderson',        'DEF', 'Monaco',           23, 0),
(25, 7,  'Vinícius Júnior',       'Vini Jr.',         'FWD', 'Real Madrid',      25, 0),
(25, 8,  'Bruno Guimarães',       'Bruno G.',         'MID', 'Newcastle United', 27, 0),
(25, 9,  'Richarlison',           'Richarlison',      'FWD', 'Tottenham',        27, 0),
(25, 10, 'Neymar Júnior',         'Neymar Jr.',       'MID', 'Al-Hilal',         34, 0),
(25, 11, 'Raphinha',              'Raphinha',         'FWD', 'Barcelona',        29, 0),
(25, 14, 'Endrick Felipe',        'Endrick',          'FWD', 'Real Madrid',      20, 0),
(25, 15, 'Carlos Henrique Casemiro', 'Casemiro',      'MID', 'Manchester United',34, 0),
(25, 16, 'Gerson Santos',         'Gerson',           'MID', 'Flamengo',         27, 0),
(25, 17, 'Rodrygo Goes',          'Rodrygo',          'MID', 'Real Madrid',      25, 0),
(25, 18, 'Gabriel Martinelli',    'Martinelli',       'FWD', 'Arsenal',          25, 0),
(25, 19, 'Lucas Paquetá',         'Paquetá',          'MID', 'West Ham United',  28, 0),
(25, 20, 'Savinho',               'Savinho',          'FWD', 'Manchester City',  21, 0),
(25, 21, 'Evanilson',             'Evanilson',        'FWD', 'Bournemouth',      25, 0);

COMMIT;
