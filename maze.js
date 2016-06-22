/* A Pacman maze has 28 by 36 tiles */
var maze = [
00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,
00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,
00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,
01,05,05,05,05,05,05,05,05,05,05,05,05,21,22,05,05,05,05,05,05,05,05,05,05,05,05,02,
07,00,00,00,00,00,00,00,00,00,00,00,00,13,13,00,00,00,00,00,00,00,00,00,00,00,00,08,
07,00,09,14,14,10,00,09,14,14,14,10,00,13,13,00,09,14,14,14,10,00,09,14,14,10,00,08,
07,00,13,00,00,13,00,13,00,00,00,13,00,13,13,00,13,00,00,00,13,00,13,00,00,13,00,08,
07,00,11,14,14,12,00,11,14,14,14,12,00,11,12,00,11,14,14,14,12,00,11,14,14,12,00,08,
07,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,08,
07,00,09,14,14,10,00,09,10,00,09,14,14,14,14,14,14,10,00,09,10,00,09,14,14,10,00,08,
07,00,11,14,14,12,00,13,13,00,11,14,14,10,09,14,14,12,00,13,13,00,11,14,14,12,00,08,
07,00,00,00,00,00,00,13,13,00,00,00,00,13,13,00,00,00,00,13,13,00,00,00,00,00,00,08,
03,06,06,06,06,25,00,13,11,14,14,10,00,13,13,00,09,14,14,12,13,00,27,06,06,06,06,04,
00,00,00,00,00,07,00,13,09,14,14,12,00,11,12,00,11,14,14,10,13,00,08,00,00,00,00,00,
00,00,00,00,00,07,00,13,13,00,00,00,00,00,00,00,00,00,00,13,13,00,08,00,00,00,00,00,
00,00,00,00,00,07,00,13,13,00,27,06,06,00,00,06,06,25,00,13,13,00,08,00,00,00,00,00,
05,05,05,05,05,26,00,11,12,00,08,00,00,00,00,00,00,07,00,11,12,00,28,05,05,05,05,05,
00,00,00,00,00,00,00,00,00,00,08,00,00,00,00,00,00,07,00,00,00,00,00,00,00,00,00,00,
06,06,06,06,06,25,00,09,10,00,08,00,00,00,00,00,00,07,00,09,10,00,27,06,06,06,06,06,
00,00,00,00,00,07,00,13,13,00,28,05,05,05,05,05,05,26,00,13,13,00,08,00,00,00,00,00,
00,00,00,00,00,07,00,13,13,00,00,00,00,00,00,00,00,00,00,13,13,00,08,00,00,00,00,00,
00,00,00,00,00,07,00,13,13,00,09,14,14,14,14,14,14,10,00,13,13,00,08,00,00,00,00,00,
01,05,05,05,05,26,00,11,12,00,11,14,14,10,09,14,14,12,00,11,12,00,28,05,05,05,05,02,
07,00,00,00,00,00,00,00,00,00,00,00,00,13,13,00,00,00,00,00,00,00,00,00,00,00,00,08,
07,00,09,14,14,10,00,09,14,14,14,10,00,13,13,00,09,14,14,14,10,00,09,14,14,10,00,08,
07,00,11,14,10,13,00,11,14,14,14,12,00,11,12,00,11,14,14,14,12,00,13,09,14,12,00,08,
07,00,00,00,13,13,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,13,13,00,00,00,08,
29,14,10,00,13,13,00,09,10,00,09,14,14,14,14,14,14,10,00,09,10,00,13,13,00,09,14,31,
30,14,12,00,11,12,00,13,13,00,11,14,14,10,09,14,14,12,00,13,13,00,11,12,00,11,14,32,
07,00,00,00,00,00,00,13,13,00,00,00,00,13,13,00,00,00,00,13,13,00,00,00,00,00,00,08,
07,00,09,14,14,14,14,12,11,14,14,10,00,13,13,00,09,14,14,12,11,14,14,14,14,10,00,08,
07,00,11,14,14,14,14,14,14,14,14,12,00,11,12,00,11,14,14,14,14,14,14,14,14,12,00,08,
07,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,08,
03,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,04,
00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,
00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00
];