# Do not change the order or names of states 
#(the code is assuming specific IDs and names)
# You can add more in the end
insert into game_state (gst_state) values ('Waiting');
insert into game_state (gst_state) values ('Started');
insert into game_state (gst_state) values ('Finished');
insert into game_state (gst_state) values ('Canceled');
insert into game_state (gst_state) values ('Choose Deck');
insert into game_state (gst_state) values ('Ready');

# Do not change the order, but you can add more in the end
insert into user_game_state (ugst_state) values ('Waiting');
insert into user_game_state (ugst_state) values ('Playing');
insert into user_game_state (ugst_state) values ('Score');
insert into user_game_state (ugst_state) values ('End');
insert into user_game_state (ugst_state) values ('Choose Deck');
insert into user_game_state (ugst_state) values ('Ready');

# Possible end game states
insert into scoreboard_state (sbs_state) values ('Tied');
insert into scoreboard_state (sbs_state) values ('Lost');
insert into scoreboard_state (sbs_state) values ('Won');

insert into card_type (ct_name) values ('Chief'),('Member'),('High Ranking Member'), ('Hacks');

insert into card_state (crd_state) values ('In deck');
insert into card_state (crd_state) values ('In hand');
insert into card_state (crd_state) values ('In field');
insert into card_state (crd_state) values ('Killed');

insert into card (crd_id, crd_cost, crd_damage, crd_health, crd_name, crd_gang, crd_type_id) values 
   (1, 5, 5, 25, "Cipher","Neon Syndicate", 1),
   (2, 2, 9, 6, "Armitager", "Neon Syndicate", 2),
   (3, 2, 1, 12, "Gunnar","Neon Syndicate", 2),
   (4, 2, 2, 1, "Rezin","Neon Syndicate", 2),
   (5, 2, 3, 5, "Maxine","Neon Syndicate", 2),
   (6, 5, 5, 25, "Makko","Data Devils", 1),
   (7, 2, 9, 6, "Erythrina", "Data Devils", 2),
   (8, 2, 1, 12, "Vyrva","Data Devils", 2),
   (9, 2, 2, 1, "Dredd Officer","Data Devils", 2),
   (10, 2, 3, 5, "Deckard","Data Devils", 2);
   
insert into deck (deck_id, deck_crd_id, deck_crd_qty) values (1, 1, 1), (1, 2, 2), (1, 3, 3), (1, 4, 2), (1, 5, 2), (2, 6, 1), (2, 7, 2), (2, 8, 3), (2, 9, 2), (2, 10, 2);

insert into game_board (gb_pos) values (1),(2),(3),(4);

INSERT INTO user VALUES (1,'me','$2b$10$Wemfac2wY/7RSCdKxuYUL.GV2clfhXC66OL76uCpDFUmpYZ/bGZtW','48MnTVJ6sKIvanVHbP5Vx5rysbYrVN4EbYmk4D8xESdfm1hx8jDfNFZGNw9OZs'),(2,'me2','$2b$10$6j2xIDnnxv.TLfBSstbbO.qE7wFTf5envx/uijiFjCP3slsy7EE4K','dQ7NrsbPsuF81xFGNioR1K0tiYkjtxOhemcgMhuFIS68VrFUC9gggm3JCgzkqe');