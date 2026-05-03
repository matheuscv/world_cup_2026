BEGIN;

-- ============================================================
-- JOGADORES DAS DEMAIS 47 SELECOES (min. 3 por selecao)
-- selecao_id conforme 01_selecoes.sql
-- ============================================================

-- Grupo A
-- México (id=1)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(1, 1,  'Guillermo Ochoa',    'Ochoa',      'GK',  'América',           39, 0),
(1, 10, 'Raúl Jiménez',       'Jiménez',    'FWD', 'Fulham',            35, 1),
(1, 22, 'Hirving Lozano',     'Lozano',     'FWD', 'PSV',               30, 0),
(1, 8,  'Edson Álvarez',      'E. Álvarez', 'MID', 'West Ham United',   27, 0);

-- Coreia do Sul (id=2)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(2, 3,  'Kim Min-jae',        'Kim Min-jae','DEF', 'Bayern München',    28, 1),
(2, 7,  'Son Heung-min',      'Son',        'FWD', 'Tottenham',         34, 0),
(2, 17, 'Lee Kang-in',        'Lee Kang-in','MID', 'PSG',               24, 0),
(2, 1,  'Kim Seung-gyu',      'K. Seung-gyu','GK', 'Vissel Kobe',       34, 0);

-- República Tcheca (id=3)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(3, 8,  'Tomáš Souček',       'Souček',     'MID', 'West Ham United',   30, 1),
(3, 10, 'Patrik Schick',      'Schick',     'FWD', 'Bayer Leverkusen',  30, 0),
(3, 2,  'Vladimír Coufal',    'Coufal',     'DEF', 'West Ham United',   32, 0),
(3, 1,  'Jiří Staněk',        'Staněk',     'GK',  'Atletico Madrid',   27, 0);

-- África do Sul (id=4)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(4, 1,  'Ronwen Williams',    'R. Williams','GK',  'Mamelodi Sundowns', 32, 1),
(4, 11, 'Percy Tau',          'Percy Tau',  'FWD', 'Al Ahly',           30, 0),
(4, 10, 'Themba Zwane',       'Zwane',      'MID', 'Mamelodi Sundowns', 33, 0);

-- Grupo B
-- Canadá (id=5)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(5, 1,  'Milan Borjan',       'Borjan',     'GK',  'Estrela Vermelha',  37, 0),
(5, 3,  'Alphonso Davies',    'A. Davies',  'DEF', 'Bayern München',    25, 1),
(5, 9,  'Jonathan David',     'J. David',   'FWD', 'LOSC Lille',        25, 0),
(5, 10, 'Tajon Buchanan',     'Buchanan',   'MID', 'Inter de Milão',    26, 0);

-- Bósnia e Herzegovina (id=6)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(6, 9,  'Edin Džeko',         'Džeko',      'FWD', 'Fenerbahce',        38, 1),
(6, 8,  'Miralem Pjanić',     'Pjanić',     'MID', 'Sharjah FC',        34, 0),
(6, 5,  'Sead Kolašinac',     'Kolašinac',  'DEF', 'Marseille',         31, 0);

-- Catar (id=7)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(7, 1,  'Meshaal Barsham',    'Barsham',    'GK',  'Al-Sadd',           27, 0),
(7, 11, 'Akram Afif',         'Afif',       'FWD', 'Al-Sadd',           28, 1),
(7, 9,  'Almoez Ali',         'Almoez',     'FWD', 'Al-Duhail',         28, 0);

-- Suíça (id=8)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(8, 1,  'Yann Sommer',        'Sommer',     'GK',  'Inter de Milão',    36, 0),
(8, 10, 'Granit Xhaka',       'Xhaka',      'MID', 'Bayer Leverkusen',  32, 1),
(8, 23, 'Xherdan Shaqiri',    'Shaqiri',    'MID', 'Chicago Fire',      33, 0),
(8, 9,  'Breel Embolo',       'Embolo',     'FWD', 'Monaco',            27, 0);

-- Grupo C
-- Argentina (id=9)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(9, 10, 'Lionel Messi',       'Messi',      'MID', 'Inter Miami',       39, 1),
(9, 9,  'Lautaro Martínez',   'Lautaro',    'FWD', 'Inter de Milão',    27, 0),
(9, 23, 'Emiliano Martínez',  'Dibu',       'GK',  'Aston Villa',       32, 0),
(9, 11, 'Ángel Di María',     'Di María',   'FWD', 'Benfica',           38, 0);

-- Croácia (id=10)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(10, 10, 'Luka Modrić',       'Modrić',     'MID', 'Real Madrid',       41, 1),
(10, 4,  'Ivan Perišić',      'Perišić',    'FWD', 'Hajduk Split',      36, 0),
(10, 23, 'Dominik Livaković', 'Livaković',  'GK',  'Fenerbahce',        29, 0),
(10, 9,  'Andrej Kramarić',   'Kramarić',   'FWD', 'Hoffenheim',        33, 0);

-- Marrocos (id=11)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(11, 1,  'Yassine Bounou',    'Bono',       'GK',  'Al-Hilal',          33, 1),
(11, 2,  'Achraf Hakimi',     'Hakimi',     'DEF', 'PSG',               27, 0),
(11, 10, 'Hakim Ziyech',      'Ziyech',     'MID', 'Galatasaray',       32, 0),
(11, 9,  'Youssef En-Nesyri', 'En-Nesyri',  'FWD', 'Fenerbahce',        28, 0);

-- Equador (id=12)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(12, 13, 'Enner Valencia',    'Valencia',   'FWD', 'Internacional',     35, 1),
(12, 10, 'Moisés Caicedo',    'Caicedo',    'MID', 'Chelsea',           23, 0),
(12, 3,  'Piero Hincapié',    'Hincapié',   'DEF', 'Bayer Leverkusen',  23, 0);

-- Grupo D
-- EUA (id=13)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(13, 4,  'Tyler Adams',       'T. Adams',   'MID', 'Bournemouth',       26, 1),
(13, 10, 'Christian Pulisic', 'Pulisic',    'MID', 'AC Milan',          27, 0),
(13, 1,  'Matt Turner',       'Turner',     'GK',  'Crystal Palace',    30, 0),
(13, 9,  'Josh Sargent',      'Sargent',    'FWD', 'Norwich City',      25, 0);

-- Austrália (id=14)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(14, 1,  'Mathew Ryan',       'Ryan',       'GK',  'Real Sociedad',     33, 1),
(14, 7,  'Mat Leckie',        'Leckie',     'FWD', 'Melbourne City',    34, 0),
(14, 5,  'Harry Souttar',     'Souttar',    'DEF', 'Leicester City',    26, 0);

-- Paraguai (id=15)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(15, 8,  'Óscar Romero',      'O. Romero',  'MID', 'San Lorenzo',       32, 1),
(15, 10, 'Miguel Almirón',    'Almirón',    'MID', 'Newcastle United',  30, 0),
(15, 9,  'Ángel Romero',      'A. Romero',  'FWD', 'San Lorenzo',       30, 0);

-- Turquia (id=16)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(16, 8,  'Hakan Çalhanoğlu',  'Çalhanoğlu', 'MID', 'Inter de Milão',    31, 1),
(16, 10, 'Arda Güler',        'Arda Güler', 'MID', 'Real Madrid',       20, 0),
(16, 3,  'Merih Demiral',     'Demiral',    'DEF', 'Al-Qadsiah',        26, 0);

-- Grupo E
-- Alemanha (id=17)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(17, 1,  'Manuel Neuer',      'Neuer',      'GK',  'Bayern München',    40, 1),
(17, 6,  'Joshua Kimmich',    'Kimmich',    'MID', 'Bayern München',    30, 0),
(17, 10, 'Florian Wirtz',     'Wirtz',      'MID', 'Bayer Leverkusen',  23, 0),
(17, 9,  'Kai Havertz',       'Havertz',    'FWD', 'Arsenal',           26, 0);

-- Japão (id=18)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(18, 1,  'Shuichi Gonda',     'Gonda',      'GK',  'Shimizu S-Pulse',   35, 0),
(18, 5,  'Maya Yoshida',      'Yoshida',    'DEF', 'Celtic',            36, 1),
(18, 17, 'Takefusa Kubo',     'Kubo',       'MID', 'Real Sociedad',     23, 0),
(18, 10, 'Shunsuke Nakamura', 'S. Nakamura','MID', 'Jubilo Iwata',      47, 0);

-- Costa do Marfim (id=19)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(19, 9,  'Sébastien Haller',  'Haller',     'FWD', 'Borussia Dortmund', 30, 1),
(19, 8,  'Franck Kessié',     'Kessié',     'MID', 'Al-Ahli',           28, 0),
(19, 6,  'Simon Deli',        'Deli',       'DEF', 'Slavia Praga',      34, 0);

-- Curaçao (id=20)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(20, 8,  'Leandro Bacuna',    'Bacuna',     'MID', 'Cardiff City',      33, 1),
(20, 2,  'Cuco Martina',      'Martina',    'DEF', 'Sem clube',          36, 0),
(20, 11, 'Jarchinio Antonia', 'Antonia',    'FWD', 'Willem II',         33, 0);

-- Grupo F
-- Holanda (id=21)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(21, 4,  'Virgil van Dijk',   'Van Dijk',   'DEF', 'Liverpool',         34, 1),
(21, 21, 'Frenkie de Jong',   'F. de Jong', 'MID', 'Barcelona',         29, 0),
(21, 11, 'Cody Gakpo',        'Gakpo',      'FWD', 'Liverpool',         26, 0),
(21, 10, 'Memphis Depay',     'Memphis',    'FWD', 'Atletico Madrid',   31, 0);

-- Suécia (id=22)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(22, 2,  'Victor Nilsson Lindelöf', 'Lindelöf', 'DEF', 'Manchester United', 30, 1),
(22, 14, 'Alexander Isak',    'Isak',       'FWD', 'Newcastle United',  27, 0),
(22, 10, 'Emil Forsberg',     'Forsberg',   'MID', 'RB Leipzig',        33, 0);

-- Tunísia (id=23)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(23, 9,  'Wahbi Khazri',      'Khazri',     'FWD', 'Montpellier',       34, 1),
(23, 11, 'Naïm Sliti',        'Sliti',      'MID', 'Lugano',            32, 0),
(23, 5,  'Montassar Talbi',   'Talbi',      'DEF', 'Lorient',           27, 0);

-- Venezuela (id=24)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(24, 8,  'Tomás Rincón',      'Rincón',     'MID', 'Estudiantes',       37, 1),
(24, 11, 'Yeferson Soteldo',  'Soteldo',    'FWD', 'Santos',            27, 0),
(24, 1,  'Wuilker Faríñez',   'Faríñez',    'GK',  'Millonarios',       28, 0);

-- Grupo G (Brasil=25 já tem jogadores)
-- Nigéria (id=26)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(26, 7,  'Ahmed Musa',        'Musa',       'FWD', 'Al-Nassr',          32, 1),
(26, 9,  'Victor Osimhen',    'Osimhen',    'FWD', 'Galatasaray',       26, 0),
(26, 11, 'Samuel Chukwueze',  'Chukwueze',  'MID', 'AC Milan',          25, 0),
(26, 1,  'Stanley Nwabali',   'Nwabali',    'GK',  'Chippa United',     27, 0);

-- Colômbia (id=27)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(27, 1,  'David Ospina',      'Ospina',     'GK',  'Sem clube',          36, 1),
(27, 10, 'James Rodríguez',   'James',      'MID', 'Rayo Vallecano',    34, 0),
(27, 7,  'Luis Díaz',         'L. Díaz',    'FWD', 'Liverpool',         27, 0),
(27, 11, 'Rafael Santos Borré', 'Borré',   'FWD', 'Frankfurt',          29, 0);

-- Arábia Saudita (id=28)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(28, 1,  'Mohammed Al-Owais', 'Al-Owais',   'GK',  'Al-Hilal',          33, 1),
(28, 11, 'Salem Al-Dawsari',  'Al-Dawsari', 'FWD', 'Al-Hilal',          33, 0),
(28, 13, 'Mohammed Al-Burayk','Al-Burayk',  'DEF', 'Al-Hilal',          31, 0);

-- Grupo H
-- Espanha (id=29)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(29, 1,  'Unai Simón',        'Unai Simón', 'GK',  'Athletic Bilbao',   27, 0),
(29, 16, 'Rodri',             'Rodri',      'MID', 'Manchester City',   28, 1),
(29, 26, 'Pedri',             'Pedri',      'MID', 'Barcelona',         23, 0),
(29, 11, 'Ferran Torres',     'Ferran',     'FWD', 'Barcelona',         25, 0);

-- Uruguai (id=30)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(30, 3,  'José María Giménez','Giménez',    'DEF', 'Atletico Madrid',   30, 1),
(30, 8,  'Federico Valverde', 'Valverde',   'MID', 'Real Madrid',       26, 0),
(30, 9,  'Darwin Núñez',      'Darwin',     'FWD', 'Liverpool',         25, 0);

-- Cabo Verde (id=31)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(31, 11, 'Ryan Mendes',       'R. Mendes',  'FWD', 'Ponferradina',       35, 1),
(31, 7,  'Garry Rodrigues',   'G. Rodrigues','FWD','Samsunspor',         33, 0),
(31, 5,  'Stopira',           'Stopira',    'DEF', 'Sin club',           36, 0);

-- Jamaica (id=32)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(32, 7,  'Bobby Reid',        'B. Reid',    'FWD', 'Fulham',             31, 1),
(32, 9,  'Michail Antonio',   'Antonio',    'FWD', 'Nottm Forest',       34, 0),
(32, 1,  'André Blake',       'A. Blake',   'GK',  'Philadelphia Union', 33, 0);

-- Grupo I
-- França (id=33)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(33, 1,  'Mike Maignan',      'Maignan',    'GK',  'AC Milan',           29, 0),
(33, 10, 'Kylian Mbappé',     'Mbappé',     'FWD', 'Real Madrid',        27, 1),
(33, 7,  'Antoine Griezmann', 'Griezmann',  'MID', 'Atletico Madrid',    35, 0),
(33, 9,  'Olivier Giroud',    'Giroud',     'FWD', 'LAFC',               40, 0);

-- Noruega (id=34)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(34, 9,  'Erling Haaland',    'Haaland',    'FWD', 'Manchester City',    26, 1),
(34, 8,  'Martin Ødegaard',   'Ødegaard',   'MID', 'Arsenal',            27, 0),
(34, 17, 'Alexander Sørloth', 'Sørloth',    'FWD', 'Atletico Madrid',    29, 0);

-- Senegal (id=35)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(35, 16, 'Édouard Mendy',     'E. Mendy',   'GK',  'Al-Ahli',            32, 1),
(35, 10, 'Sadio Mané',        'Mané',       'FWD', 'Al-Nassr',           32, 0),
(35, 5,  'Kalidou Koulibaly', 'Koulibaly',  'DEF', 'Al-Hilal',           33, 0);

-- Iraque (id=36)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(36, 10, 'Bashar Resan',      'Resan',      'MID', 'Al-Shorta',          28, 1),
(36, 9,  'Aymen Hussein',     'A. Hussein', 'FWD', 'Al-Zowraa',          30, 0),
(36, 1,  'Jalal Hassan',      'J. Hassan',  'GK',  'Al-Zawraa',          32, 0);

-- Grupo J
-- Portugal (id=37)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(37, 7,  'Cristiano Ronaldo', 'Ronaldo',    'FWD', 'Al-Nassr',           41, 1),
(37, 10, 'Bernardo Silva',    'B. Silva',   'MID', 'Manchester City',    31, 0),
(37, 3,  'Rúben Dias',        'R. Dias',    'DEF', 'Manchester City',    28, 0),
(37, 17, 'Rafael Leão',       'Leão',       'FWD', 'AC Milan',           26, 0);

-- Rep. Democrática do Congo (id=38)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(38, 5,  'Chancel Mbemba',    'Mbemba',     'DEF', 'Olympique Marseille',30, 1),
(38, 11, 'Cédric Bakambu',    'Bakambu',    'FWD', 'Olympique Marseille',34, 0),
(38, 7,  'Yannick Bolasie',   'Bolasie',    'MID', 'Sporting CP',        35, 0);

-- Camarões (id=39)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(39, 1,  'André Onana',       'Onana',      'GK',  'Manchester United',  29, 1),
(39, 10, 'Vincent Aboubakar', 'Aboubakar',  'FWD', 'Besiktas',           33, 0),
(39, 7,  'Karl Toko Ekambi',  'Toko Ekambi','FWD', 'Lyon',               32, 0);

-- Uzbequistão (id=40)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(40, 9,  'Jasur Jalolov',     'Jalolov',    'FWD', 'Al-Ahli',            27, 1),
(40, 11, 'Eldor Shomurodov',  'Shomurodov', 'FWD', 'AS Roma',            30, 0),
(40, 8,  'Mirzohid Qodirov',  'Qodirov',    'MID', 'Pakhtakor',          26, 0);

-- Grupo K
-- Bélgica (id=41)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(41, 1,  'Thibaut Courtois',  'Courtois',   'GK',  'Real Madrid',        33, 1),
(41, 7,  'Kevin De Bruyne',   'De Bruyne',  'MID', 'Manchester City',    34, 0),
(41, 9,  'Romelu Lukaku',     'Lukaku',     'FWD', 'AS Roma',            31, 0),
(41, 15, 'Leandro Trossard',  'Trossard',   'FWD', 'Arsenal',            30, 0);

-- Irã (id=42)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(42, 1,  'Alireza Beiranvand','Beiranvand',  'GK', 'Sporting CP',        32, 1),
(42, 9,  'Mehdi Taremi',      'Taremi',     'FWD', 'Inter de Milão',     32, 0),
(42, 7,  'Sardar Azmoun',     'Azmoun',     'FWD', 'Bayer Leverkusen',   30, 0);

-- Egito (id=43)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(43, 11, 'Mohamed Salah',     'Salah',      'FWD', 'Liverpool',          34, 1),
(43, 1,  'Ahmed El-Shenawy',  'El-Shenawy', 'GK',  'Al-Ahly',            38, 0),
(43, 9,  'Omar Marmoush',     'Marmoush',   'FWD', 'Manchester City',    26, 0);

-- Nova Zelândia (id=44)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(44, 8,  'Joe Bell',          'J. Bell',    'MID', 'Charlotte FC',       26, 1),
(44, 9,  'Chris Wood',        'C. Wood',    'FWD', 'Nottm Forest',       33, 0),
(44, 1,  'Oliver Sail',       'O. Sail',    'GK',  'Wellington Phoenix',  28, 0);

-- Grupo L
-- Inglaterra (id=45)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(45, 1,  'Jordan Pickford',   'Pickford',   'GK',  'Everton',            32, 0),
(45, 9,  'Harry Kane',        'Kane',       'FWD', 'Bayern München',     33, 1),
(45, 5,  'Jude Bellingham',   'Bellingham', 'MID', 'Real Madrid',        23, 0),
(45, 20, 'Phil Foden',        'Foden',      'MID', 'Manchester City',    26, 0);

-- Escócia (id=46)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(46, 1,  'Craig Gordon',      'Gordon',     'GK',  'Heart of Midlothian',42, 1),
(46, 3,  'Andrew Robertson',  'Robertson',  'DEF', 'Liverpool',          32, 0),
(46, 8,  'Scott McTominay',   'McTominay',  'MID', 'Napoli',             28, 0);

-- Gana (id=47)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(47, 5,  'Thomas Partey',     'Partey',     'MID', 'Arsenal',            32, 1),
(47, 10, 'Mohammed Kudus',    'Kudus',      'FWD', 'West Ham United',    24, 0),
(47, 7,  'Jordan Ayew',       'J. Ayew',    'FWD', 'Crystal Palace',     33, 0);

-- Panamá (id=48)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao) VALUES
(48, 5,  'Óscar Méndez',      'O. Méndez',  'DEF', 'Deportivo Independiente', 29, 1),
(48, 9,  'Ismael Díaz',       'I. Díaz',    'FWD', 'Lausanne-Sport',     24, 0),
(48, 11, 'Gabriel Torres',    'G. Torres',  'FWD', 'Sin club',           36, 0);

COMMIT;
