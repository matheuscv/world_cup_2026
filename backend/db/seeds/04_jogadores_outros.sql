BEGIN;

-- ============================================================
-- JOGADORES DAS DEMAIS 47 SELEÇÕES (min. 3 por seleção)
-- selecao_id conforme 01_selecoes.sql (sorteio oficial 2026)
-- ============================================================

-- Grupo A
-- México (id=1)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(1, 1,  'Guillermo Ochoa',    'Ochoa',      'GK',  'América',            39, 0),
(1, 10, 'Raúl Jiménez',       'Jiménez',    'FWD', 'Fulham',             35, 1),
(1, 22, 'Hirving Lozano',     'Lozano',     'FWD', 'PSV',                30, 0),
(1, 8,  'Edson Álvarez',      'E. Álvarez', 'MID', 'West Ham United',    27, 0);

-- Coreia do Sul (id=2)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(2, 3,  'Kim Min-jae',        'Kim Min-jae', 'DEF', 'Bayern München',    28, 1),
(2, 7,  'Son Heung-min',      'Son',         'FWD', 'Tottenham',         34, 0),
(2, 17, 'Lee Kang-in',        'Lee Kang-in', 'MID', 'PSG',               24, 0),
(2, 1,  'Kim Seung-gyu',      'K. Seung-gyu','GK',  'Vissel Kobe',       34, 0);

-- África do Sul (id=3)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(3, 1,  'Ronwen Williams',    'R. Williams', 'GK',  'Mamelodi Sundowns', 32, 1),
(3, 11, 'Percy Tau',          'Percy Tau',   'FWD', 'Al Ahly',           30, 0),
(3, 10, 'Themba Zwane',       'Zwane',       'MID', 'Mamelodi Sundowns', 33, 0);

-- Tchéquia (id=4)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(4, 8,  'Tomáš Souček',       'Souček',     'MID', 'West Ham United',    30, 1),
(4, 10, 'Patrik Schick',      'Schick',     'FWD', 'Bayer Leverkusen',   30, 0),
(4, 2,  'Vladimír Coufal',    'Coufal',     'DEF', 'West Ham United',    32, 0),
(4, 1,  'Jiří Staněk',        'Staněk',     'GK',  'Atletico Madrid',    27, 0);

-- Grupo B
-- Canadá (id=5)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(5, 1,  'Milan Borjan',       'Borjan',     'GK',  'Estrela Vermelha',   37, 0),
(5, 3,  'Alphonso Davies',    'A. Davies',  'DEF', 'Bayern München',     25, 1),
(5, 9,  'Jonathan David',     'J. David',   'FWD', 'LOSC Lille',         25, 0),
(5, 10, 'Tajon Buchanan',     'Buchanan',   'MID', 'Inter de Milão',     26, 0);

-- Bósnia e Herzegovina (id=6)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(6, 9,  'Edin Džeko',         'Džeko',      'FWD', 'Fenerbahce',         38, 1),
(6, 8,  'Miralem Pjanić',     'Pjanić',     'MID', 'Sharjah FC',         34, 0),
(6, 5,  'Sead Kolašinac',     'Kolašinac',  'DEF', 'Marseille',          31, 0);

-- Catar (id=7)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(7, 1,  'Meshaal Barsham',    'Barsham',    'GK',  'Al-Sadd',            27, 0),
(7, 11, 'Akram Afif',         'Afif',       'FWD', 'Al-Sadd',            28, 1),
(7, 9,  'Almoez Ali',         'Almoez',     'FWD', 'Al-Duhail',          28, 0);

-- Suíça (id=8)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(8, 1,  'Yann Sommer',        'Sommer',     'GK',  'Inter de Milão',     36, 0),
(8, 10, 'Granit Xhaka',       'Xhaka',      'MID', 'Bayer Leverkusen',   32, 1),
(8, 23, 'Xherdan Shaqiri',    'Shaqiri',    'MID', 'Chicago Fire',        33, 0),
(8, 9,  'Breel Embolo',       'Embolo',     'FWD', 'Monaco',              27, 0);

-- Grupo C (Brasil=9 em 03_jogadores_brasil.sql)
-- Marrocos (id=10)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(10, 1,  'Yassine Bounou',    'Bono',       'GK',  'Al-Hilal',           33, 1),
(10, 2,  'Achraf Hakimi',     'Hakimi',     'DEF', 'PSG',                27, 0),
(10, 10, 'Hakim Ziyech',      'Ziyech',     'MID', 'Galatasaray',        32, 0),
(10, 9,  'Youssef En-Nesyri', 'En-Nesyri',  'FWD', 'Fenerbahce',         28, 0);

-- Haiti (id=11)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(11, 9,  'Frantzdy Pierrot',  'Pierrot',    'FWD', 'Apollon Limassol',   30, 1),
(11, 11, 'Duckens Nazon',     'Nazon',      'FWD', 'Sem clube',           33, 0),
(11, 3,  'James Léveillé',    'Léveillé',   'DEF', 'CF Montréal',        27, 0);

-- Escócia (id=12)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(12, 1,  'Craig Gordon',      'Gordon',     'GK',  'Heart of Midlothian', 42, 1),
(12, 3,  'Andrew Robertson',  'Robertson',  'DEF', 'Liverpool',           32, 0),
(12, 8,  'Scott McTominay',   'McTominay',  'MID', 'Napoli',              28, 0);

-- Grupo D
-- Estados Unidos (id=13)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(13, 4,  'Tyler Adams',       'T. Adams',   'MID', 'Bournemouth',        26, 1),
(13, 10, 'Christian Pulisic', 'Pulisic',    'MID', 'AC Milan',           27, 0),
(13, 1,  'Matt Turner',       'Turner',     'GK',  'Crystal Palace',     30, 0),
(13, 9,  'Josh Sargent',      'Sargent',    'FWD', 'Norwich City',       25, 0);

-- Paraguai (id=14)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(14, 8,  'Óscar Romero',      'O. Romero',  'MID', 'San Lorenzo',        32, 1),
(14, 10, 'Miguel Almirón',    'Almirón',    'MID', 'Newcastle United',   30, 0),
(14, 9,  'Ángel Romero',      'A. Romero',  'FWD', 'San Lorenzo',        30, 0);

-- Austrália (id=15)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(15, 1,  'Mathew Ryan',       'Ryan',       'GK',  'Real Sociedad',      33, 1),
(15, 7,  'Mat Leckie',        'Leckie',     'FWD', 'Melbourne City',     34, 0),
(15, 5,  'Harry Souttar',     'Souttar',    'DEF', 'Leicester City',     26, 0);

-- Turquia (id=16)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(16, 8,  'Hakan Çalhanoğlu',  'Çalhanoğlu', 'MID', 'Inter de Milão',    31, 1),
(16, 10, 'Arda Güler',        'Arda Güler', 'MID', 'Real Madrid',        20, 0),
(16, 3,  'Merih Demiral',     'Demiral',    'DEF', 'Al-Qadsiah',         26, 0);

-- Grupo E
-- Alemanha (id=17)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(17, 1,  'Manuel Neuer',      'Neuer',      'GK',  'Bayern München',     40, 1),
(17, 6,  'Joshua Kimmich',    'Kimmich',    'MID', 'Bayern München',     30, 0),
(17, 10, 'Florian Wirtz',     'Wirtz',      'MID', 'Bayer Leverkusen',   23, 0),
(17, 9,  'Kai Havertz',       'Havertz',    'FWD', 'Arsenal',            26, 0);

-- Costa do Marfim (id=18)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(18, 9,  'Sébastien Haller',  'Haller',     'FWD', 'Borussia Dortmund',  30, 1),
(18, 8,  'Franck Kessié',     'Kessié',     'MID', 'Al-Ahli',            28, 0),
(18, 6,  'Simon Deli',        'Deli',       'DEF', 'Slavia Praga',       34, 0);

-- Equador (id=19)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(19, 13, 'Enner Valencia',    'Valencia',   'FWD', 'Internacional',      35, 1),
(19, 10, 'Moisés Caicedo',    'Caicedo',    'MID', 'Chelsea',            23, 0),
(19, 3,  'Piero Hincapié',    'Hincapié',   'DEF', 'Bayer Leverkusen',   23, 0);

-- Curaçao (id=20)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(20, 8,  'Leandro Bacuna',    'Bacuna',     'MID', 'Cardiff City',       33, 1),
(20, 2,  'Cuco Martina',      'Martina',    'DEF', 'Sem clube',           36, 0),
(20, 11, 'Jarchinio Antonia', 'Antonia',    'FWD', 'Willem II',          33, 0);

-- Grupo F
-- Países Baixos (id=21)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(21, 4,  'Virgil van Dijk',   'Van Dijk',   'DEF', 'Liverpool',          34, 1),
(21, 21, 'Frenkie de Jong',   'F. de Jong', 'MID', 'Barcelona',          29, 0),
(21, 11, 'Cody Gakpo',        'Gakpo',      'FWD', 'Liverpool',          26, 0),
(21, 10, 'Memphis Depay',     'Memphis',    'FWD', 'Atletico Madrid',    31, 0);

-- Japão (id=22)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(22, 1,  'Shuichi Gonda',     'Gonda',      'GK',  'Shimizu S-Pulse',    35, 0),
(22, 5,  'Maya Yoshida',      'Yoshida',    'DEF', 'Celtic',             36, 1),
(22, 17, 'Takefusa Kubo',     'Kubo',       'MID', 'Real Sociedad',      23, 0);

-- Suécia (id=23)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(23, 2,  'Victor Nilsson Lindelöf', 'Lindelöf', 'DEF', 'Manchester United', 30, 1),
(23, 14, 'Alexander Isak',    'Isak',       'FWD', 'Newcastle United',   27, 0),
(23, 10, 'Emil Forsberg',     'Forsberg',   'MID', 'RB Leipzig',         33, 0);

-- Tunísia (id=24)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(24, 9,  'Wahbi Khazri',      'Khazri',     'FWD', 'Montpellier',        34, 1),
(24, 11, 'Naïm Sliti',        'Sliti',      'MID', 'Lugano',             32, 0),
(24, 5,  'Montassar Talbi',   'Talbi',      'DEF', 'Lorient',            27, 0);

-- Grupo G
-- Bélgica (id=25)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(25, 1,  'Thibaut Courtois',  'Courtois',   'GK',  'Real Madrid',        33, 1),
(25, 7,  'Kevin De Bruyne',   'De Bruyne',  'MID', 'Manchester City',    34, 0),
(25, 9,  'Romelu Lukaku',     'Lukaku',     'FWD', 'AS Roma',            31, 0),
(25, 15, 'Leandro Trossard',  'Trossard',   'FWD', 'Arsenal',            30, 0);

-- Egito (id=26)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(26, 11, 'Mohamed Salah',     'Salah',      'FWD', 'Liverpool',          34, 1),
(26, 1,  'Ahmed El-Shenawy',  'El-Shenawy', 'GK',  'Al-Ahly',            38, 0),
(26, 9,  'Omar Marmoush',     'Marmoush',   'FWD', 'Manchester City',    26, 0);

-- Irã (id=27)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(27, 1,  'Alireza Beiranvand','Beiranvand',  'GK',  'Sporting CP',       32, 1),
(27, 9,  'Mehdi Taremi',      'Taremi',     'FWD', 'Inter de Milão',     32, 0),
(27, 7,  'Sardar Azmoun',     'Azmoun',     'FWD', 'Bayer Leverkusen',   30, 0);

-- Nova Zelândia (id=28)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(28, 8,  'Joe Bell',          'J. Bell',    'MID', 'Charlotte FC',       26, 1),
(28, 9,  'Chris Wood',        'C. Wood',    'FWD', 'Nottm Forest',       33, 0),
(28, 1,  'Oliver Sail',       'O. Sail',    'GK',  'Wellington Phoenix',  28, 0);

-- Grupo H
-- Espanha (id=29)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(29, 1,  'Unai Simón',        'Unai Simón', 'GK',  'Athletic Bilbao',    27, 0),
(29, 16, 'Rodri',             'Rodri',      'MID', 'Manchester City',    28, 1),
(29, 26, 'Pedri',             'Pedri',      'MID', 'Barcelona',          23, 0),
(29, 11, 'Ferran Torres',     'Ferran',     'FWD', 'Barcelona',          25, 0);

-- Uruguai (id=30)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(30, 3,  'José María Giménez','Giménez',    'DEF', 'Atletico Madrid',    30, 1),
(30, 8,  'Federico Valverde', 'Valverde',   'MID', 'Real Madrid',        26, 0),
(30, 9,  'Darwin Núñez',      'Darwin',     'FWD', 'Liverpool',          25, 0);

-- Arábia Saudita (id=31)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(31, 1,  'Mohammed Al-Owais', 'Al-Owais',   'GK',  'Al-Hilal',           33, 1),
(31, 11, 'Salem Al-Dawsari',  'Al-Dawsari', 'FWD', 'Al-Hilal',           33, 0),
(31, 13, 'Mohammed Al-Burayk','Al-Burayk',  'DEF', 'Al-Hilal',           31, 0);

-- Cabo Verde (id=32)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(32, 11, 'Ryan Mendes',       'R. Mendes',  'FWD', 'Ponferradina',        35, 1),
(32, 7,  'Garry Rodrigues',   'G. Rodrigues','FWD','Samsunspor',          33, 0),
(32, 5,  'Stopira',           'Stopira',    'DEF', 'Sin club',            36, 0);

-- Grupo I
-- França (id=33)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(33, 1,  'Mike Maignan',      'Maignan',    'GK',  'AC Milan',            29, 0),
(33, 10, 'Kylian Mbappé',     'Mbappé',     'FWD', 'Real Madrid',         27, 1),
(33, 7,  'Antoine Griezmann', 'Griezmann',  'MID', 'Atletico Madrid',     35, 0),
(33, 9,  'Olivier Giroud',    'Giroud',     'FWD', 'LAFC',                40, 0);

-- Senegal (id=34)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(34, 16, 'Édouard Mendy',     'E. Mendy',   'GK',  'Al-Ahli',             32, 1),
(34, 10, 'Sadio Mané',        'Mané',       'FWD', 'Al-Nassr',            32, 0),
(34, 5,  'Kalidou Koulibaly', 'Koulibaly',  'DEF', 'Al-Hilal',            33, 0);

-- Noruega (id=35)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(35, 9,  'Erling Haaland',    'Haaland',    'FWD', 'Manchester City',     26, 1),
(35, 8,  'Martin Ødegaard',   'Ødegaard',   'MID', 'Arsenal',             27, 0),
(35, 17, 'Alexander Sørloth', 'Sørloth',    'FWD', 'Atletico Madrid',     29, 0);

-- Iraque (id=36)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(36, 10, 'Bashar Resan',      'Resan',      'MID', 'Al-Shorta',           28, 1),
(36, 9,  'Aymen Hussein',     'A. Hussein', 'FWD', 'Al-Zowraa',           30, 0),
(36, 1,  'Jalal Hassan',      'J. Hassan',  'GK',  'Al-Zawraa',           32, 0);

-- Grupo J
-- Argentina (id=37)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(37, 10, 'Lionel Messi',      'Messi',      'FWD', 'Inter Miami',         39, 1),
(37, 9,  'Lautaro Martínez',  'Lautaro',    'FWD', 'Inter de Milão',      27, 0),
(37, 23, 'Emiliano Martínez', 'Dibu',       'GK',  'Aston Villa',         32, 0),
(37, 11, 'Ángel Di María',    'Di María',   'FWD', 'Benfica',             38, 0);

-- Argélia (id=38)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(38, 26, 'Riyad Mahrez',      'Mahrez',     'FWD', 'Al-Ahli',             33, 1),
(38, 9,  'Islam Slimani',     'Slimani',    'FWD', 'Montpellier',         36, 0),
(38, 22, 'Youcef Atal',       'Atal',       'DEF', 'Nice',                28, 0);

-- Áustria (id=39)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(39, 8,  'Marcel Sabitzer',   'Sabitzer',   'MID', 'Borussia Dortmund',   31, 1),
(39, 14, 'David Alaba',       'Alaba',      'DEF', 'Real Madrid',         33, 0),
(39, 17, 'Christoph Baumgartner','Baumgartner','MID','RB Leipzig',         26, 0),
(39, 9,  'Michael Gregoritsch','Gregoritsch','FWD','SC Freiburg',          31, 0);

-- Jordânia (id=40)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(40, 7,  'Ahmad Salameh',     'Salameh',    'MID', 'Al-Wehdat',           27, 1),
(40, 9,  'Yazan Al-Naimat',   'Al-Naimat',  'FWD', 'Al-Faisaly',          26, 0),
(40, 1,  'Yazeed Abulaila',   'Abulaila',   'GK',  'Al-Wehdat',           29, 0);

-- Grupo K
-- Portugal (id=41)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(41, 7,  'Cristiano Ronaldo', 'Ronaldo',    'FWD', 'Al-Nassr',            41, 1),
(41, 10, 'Bernardo Silva',    'B. Silva',   'MID', 'Manchester City',     31, 0),
(41, 3,  'Rúben Dias',        'R. Dias',    'DEF', 'Manchester City',     28, 0),
(41, 17, 'Rafael Leão',       'Leão',       'FWD', 'AC Milan',            26, 0);

-- Colômbia (id=42)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(42, 1,  'David Ospina',      'Ospina',     'GK',  'Sem clube',            36, 1),
(42, 10, 'James Rodríguez',   'James',      'MID', 'Rayo Vallecano',      34, 0),
(42, 7,  'Luis Díaz',         'L. Díaz',    'FWD', 'Liverpool',           27, 0),
(42, 11, 'Rafael Santos Borré','Borré',     'FWD', 'Frankfurt',           29, 0);

-- Rep. Dem. do Congo (id=43)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(43, 5,  'Chancel Mbemba',    'Mbemba',     'DEF', 'Olympique Marseille', 30, 1),
(43, 11, 'Cédric Bakambu',    'Bakambu',    'FWD', 'Olympique Marseille', 34, 0),
(43, 7,  'Yannick Bolasie',   'Bolasie',    'MID', 'Sporting CP',         35, 0);

-- Uzbequistão (id=44)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(44, 9,  'Jasur Jalolov',     'Jalolov',    'FWD', 'Al-Ahli',             27, 1),
(44, 11, 'Eldor Shomurodov',  'Shomurodov', 'FWD', 'AS Roma',             30, 0),
(44, 8,  'Mirzohid Qodirov',  'Qodirov',    'MID', 'Pakhtakor',           26, 0);

-- Grupo L
-- Inglaterra (id=45)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(45, 1,  'Jordan Pickford',   'Pickford',   'GK',  'Everton',             32, 0),
(45, 9,  'Harry Kane',        'Kane',       'FWD', 'Bayern München',      33, 1),
(45, 5,  'Jude Bellingham',   'Bellingham', 'MID', 'Real Madrid',         23, 0),
(45, 20, 'Phil Foden',        'Foden',      'MID', 'Manchester City',     26, 0);

-- Croácia (id=46)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(46, 10, 'Luka Modrić',       'Modrić',     'MID', 'Real Madrid',         41, 1),
(46, 4,  'Ivan Perišić',      'Perišić',    'FWD', 'Hajduk Split',        36, 0),
(46, 23, 'Dominik Livaković', 'Livaković',  'GK',  'Fenerbahce',          29, 0),
(46, 9,  'Andrej Kramarić',   'Kramarić',   'FWD', 'Hoffenheim',          33, 0);

-- Gana (id=47)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(47, 5,  'Thomas Partey',     'Partey',     'MID', 'Arsenal',             32, 1),
(47, 10, 'Mohammed Kudus',    'Kudus',      'FWD', 'West Ham United',     24, 0),
(47, 7,  'Jordan Ayew',       'J. Ayew',    'FWD', 'Crystal Palace',      33, 0);

-- Panamá (id=48)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(48, 5,  'Óscar Méndez',      'O. Méndez',  'DEF', 'Dep. Independiente',  29, 1),
(48, 9,  'Ismael Díaz',       'I. Díaz',    'FWD', 'Lausanne-Sport',       24, 0),
(48, 11, 'Gabriel Torres',    'G. Torres',  'FWD', 'Sem clube',            36, 0);

COMMIT;
