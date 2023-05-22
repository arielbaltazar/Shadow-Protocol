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

insert into card_type (ct_name) values ('Chief'),('Member'),('High Ranking Member'),('Hacks');

insert into card_hack_type (cht_name) values ('Give Health'),('Give Damage');

insert into card_state (crd_state) values ('In deck');
insert into card_state (crd_state) values ('In hand');
insert into card_state (crd_state) values ('In Bench');
insert into card_state (crd_state) values ('In Board');
insert into card_state (crd_state) values ('Killed');

insert into card (crd_id, crd_cost, crd_damage, crd_health, crd_bonus, crd_name, crd_gang, crd_info, crd_image, crd_hack_type_id, crd_type_id) values 
   (1, 0, 0, 250, null, "Cipher","Neon Syndicate", null,"/assets/card_image1.png", null, 1), /*QTY = 1 */ /* CARD TYPE: LEADER */
   (2, 9, 80, 90, null, "Armitager", "Neon Syndicate", null, null, null, 3), /*QTY = 1 */ /* CARD TYPE: HIGH RANKING MEMBER */
   (3, 8, 65, 85, null, "Gunnar", "Neon Syndicate", null, null, null, 3), /*QTY = 2 */ /* CARD TYPE: HIGH RANKING MEMBER */
   (4, 7, 50, 60, null, "Rezin", "Neon Syndicate", null, null, null, 3), /*QTY = 2 */ /* CARD TYPE: HIGH RANKING MEMBER */
   (5, 6, 40, 50, null, "Maxine","Neon Syndicate", null,  null,null, 2), /*QTY = 2 */ /* CARD TYPE: MEMBER */
   (6, 4, 30, 45, null, "Geneve","Neon Syndicate", null,  null,null, 2), /*QTY = 3 */ /* CARD TYPE: MEMBER */
   (7, 3, 20, 30, null, "5","Neon Syndicate", null, null, null, 2), /*QTY = 3 */ /* CARD TYPE: MEMBER */
   (8, 2, 0, 0, 3, "6","Neon Syndicate", "Give +3 damage to a unit", null, 2, 4), /*QTY = 3 */ /* CARD TYPE: HACKS */
   (9, 2, 0, 0, 3, "7","Neon Syndicate", "Give +3 health to a unit", null, 1, 4), /*QTY = 3 */ /* CARD TYPE: HACKS */
   (10, 0, 0, 250, null, "Makko","Data Devils", null, null, null, 1), /*QTY = 1 */ /* CARD TYPE: LEADER */
   (11, 9, 80, 90, null, "Erythrina", "Data Devils", null, null, null, 3), /*QTY = 1 */ /* CARD TYPE: HIGH RANKING MEMBER */
   (12, 8, 60, 80, null, "Vyrva", "Data Devils", null, null, null, 3), /*QTY = 2 */ /* CARD TYPE: HIGH RANKING MEMBER */
   (13, 7, 55, 65, null, "Dredd Officer", "Data Devils", null,  null,null, 3), /*QTY = 2 */ /* CARD TYPE: HIGH RANKING MEMBER */
   (14, 6, 40, 50, null, "Deckard","Data Devils", null, null, null, 2), /*QTY = 2 */ /* CARD TYPE: MEMBER */
   (15, 4, 30, 40, null, "Dex skill","Data Devils", null,  null,null, 2), /*QTY = 3 */ /* CARD TYPE: MEMBER */
   (16, 3, 25, 35, null, "5","Data Devils", null,  null,null, 2), /*QTY = 3 */ /* CARD TYPE: MEMBER */
   (17, 2, 0, 0, 3, "6","Data Devils", "Give +3 damage to a unit", null, 2, 4), /*QTY = 3 */ /* CARD TYPE: HACKS */
   (18, 2, 0, 0, 3, "7","Data Devils", "Give +3 health to a unit",  null,1, 4); /*QTY = 3 */ /* CARD TYPE: HACKS */
   
insert into deck (deck_id, deck_crd_id, deck_crd_qty) values (1, 1, 1), (1, 2, 1), (1, 3, 2), (1, 4, 2), (1, 5, 2), (1, 6, 3), (1, 7, 3), (1, 8, 3), (1, 9, 3),(2, 10, 1), (2, 11, 1), (2, 12, 2), (2, 13, 2), (2, 14, 2), (1, 15, 3), (1, 16, 3), (1, 17, 3), (1, 18, 3);

insert into game_board (gb_pos) values (1),(2),(3),(4),(5);
insert into game_bench (gben_pos) values (1),(2),(3),(4),(5);

INSERT INTO user VALUES (1,'me','$2b$10$Wemfac2wY/7RSCdKxuYUL.GV2clfhXC66OL76uCpDFUmpYZ/bGZtW','48MnTVJ6sKIvanVHbP5Vx5rysbYrVN4EbYmk4D8xESdfm1hx8jDfNFZGNw9OZs'),(2,'me2','$2b$10$6j2xIDnnxv.TLfBSstbbO.qE7wFTf5envx/uijiFjCP3slsy7EE4K','dQ7NrsbPsuF81xFGNioR1K0tiYkjtxOhemcgMhuFIS68VrFUC9gggm3JCgzkqe');
