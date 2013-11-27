INSERT INTO todos_role (id, name, add, edit, remove, "check") VALUES (1, 'doctor', true, true, true, true);
INSERT INTO todos_role (id, name, add, edit, remove, "check") VALUES (2, 'nurse', false, false, false, true);
INSERT INTO todos_role (id, name, add, edit, remove, "check") VALUES (3, 'patient', false, false, false, false);

INSERT INTO todos_time (id, "time") VALUES (1, '2013-11-23 05:18:04+02');
INSERT INTO todos_time (id, "time") VALUES (2, '2013-11-24 12:00:00+02');
INSERT INTO todos_time (id, "time") VALUES (3, '2013-11-25 00:00:00+02');

INSERT INTO todos_todo (id, text, date_created, date_finished, amount, done) VALUES (1, 'todo n1', '2013-11-23 05:18:52.505079+02', '2013-11-23 05:18:43+02', 1, false);
INSERT INTO todos_todo (id, text, date_created, date_finished, amount, done) VALUES (2, 'todo n2', '2013-11-23 05:19:00.912976+02', '2013-11-23 05:18:57+02', 1, false);
INSERT INTO todos_todo (id, text, date_created, date_finished, amount, done) VALUES (3, 'todo n3', '2013-11-23 05:19:09.520267+02', '2013-11-23 05:19:07+02', 1, false);

INSERT INTO todos_todo_time (id, todo_id, time_id) VALUES (1, 1, 1);
INSERT INTO todos_todo_time (id, todo_id, time_id) VALUES (2, 1, 2);
INSERT INTO todos_todo_time (id, todo_id, time_id) VALUES (3, 2, 2);
INSERT INTO todos_todo_time (id, todo_id, time_id) VALUES (4, 3, 3);

INSERT INTO todos_users (id, first_name, last_name, login, password, role_id, access_token, foto) VALUES (4, 'Elma', 'Harry', 'patient2', '1111', 3, 'ElmaHarry', 'fotos/282d1ba64e43854190124147f175b188.jpeg');
INSERT INTO todos_users (id, first_name, last_name, login, password, role_id, access_token, foto) VALUES (5, 'Rick', 'Miller', 'patient3', '1111', 3, 'RickMiller', 'fotos/perello_ibarionex_e.jpg');
INSERT INTO todos_users (id, first_name, last_name, login, password, role_id, access_token, foto) VALUES (7, 'Craig', 'Ozz', 'patient5', '1111', 3, 'CraigOzz', 'fotos/FIFA1221-51x51.jpg');
INSERT INTO todos_users (id, first_name, last_name, login, password, role_id, access_token, foto) VALUES (3, 'Leonardo', 'Vinci', 'patient1', '1111', 3, 'Patient', 'fotos/images-4.jpg');
INSERT INTO todos_users (id, first_name, last_name, login, password, role_id, access_token, foto) VALUES (1, 'Otto', 'Bismark', 'doctor', '1111', 1, 'Doctor', 'fotos/image_thumb_man6.png');
INSERT INTO todos_users (id, first_name, last_name, login, password, role_id, access_token, foto) VALUES (2, 'Elizabeth', 'Mary', 'nurse', '1111', 2, 'Nurse', 'fotos/picture-1766.jpg');
INSERT INTO todos_users (id, first_name, last_name, login, password, role_id, access_token, foto) VALUES (6, 'Vilma', 'Graice', 'patient4', '1111', 3, 'VilmaGraice', 'fotos/smith_dori_e.jpg');
INSERT INTO todos_users (id, first_name, last_name, login, password, role_id, access_token, foto) VALUES (8, 'Wilhelm', 'Adler', 'patient6', '1111', 3, 'WilhelmAdler', 'fotos/845.thumbnail.jpg');
INSERT INTO todos_users (id, first_name, last_name, login, password, role_id, access_token, foto) VALUES (9, 'Evan', 'Olister', 'patient7', '1111', 3, 'EvanOlister', 'fotos/man.jpg');
INSERT INTO todos_users (id, first_name, last_name, login, password, role_id, access_token, foto) VALUES (10, 'Liza', 'Shelon', 'patient8', '1111', 3, 'LizaShelon', 'fotos/5d530c569a8536e33dfb9c0fb3300d17.jpeg');
INSERT INTO todos_users (id, first_name, last_name, login, password, role_id, access_token, foto) VALUES (11, 'Marry', 'Summer', 'patient9', '1111', 3, 'MarrySummer', 'fotos/87debccac4f47f3839bd6759e31998ad.jpeg');
INSERT INTO todos_users (id, first_name, last_name, login, password, role_id, access_token, foto) VALUES (12, 'Samuel', 'Didi', 'patient10', '1111', 3, 'SamuelDidi', 'fotos/myqd1t3h_5bf4_0_51.jpg');


INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (10, 4, 3);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (11, 5, 3);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (13, 7, 3);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (14, 3, 1);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (15, 3, 2);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (16, 3, 3);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (17, 1, 1);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (18, 2, 2);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (19, 6, 3);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (20, 8, 2);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (21, 9, 2);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (22, 9, 3);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (27, 10, 1);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (28, 10, 2);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (29, 11, 1);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (30, 11, 3);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (31, 12, 1);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (32, 12, 2);
INSERT INTO todos_users_todo (id, users_id, todo_id) VALUES (33, 12, 3);
