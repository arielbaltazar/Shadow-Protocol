# Do not change the order or names of states 
#(the code is assuming specific IDs and names)
# You can add more in the end
insert into game_state (gst_state) values ('Waiting');
insert into game_state (gst_state) values ('Started');
insert into game_state (gst_state) values ('Finished');
insert into game_state (gst_state) values ('Canceled');

# Do not change the order, but you can add more in the end
insert into user_game_state (ugst_state) values ('Waiting');
insert into user_game_state (ugst_state) values ('Playing');
insert into user_game_state (ugst_state) values ('Score');
insert into user_game_state (ugst_state) values ('End');

# Possible end game states
insert into scoreboard_state (sbs_state) values ('Tied');
insert into scoreboard_state (sbs_state) values ('Lost');
insert into scoreboard_state (sbs_state) values ('Won');


insert into card_type (ct_name) values ('Chief'),('Member'),('High Ranking Member'), ('Hacks');


insert into card (crd_id, crd_cost, crd_damage, crd_health, crd_name, crd_gang, crd_type_id, crd_gangability, crd_ability) values 
   (1, 5, 5, 25, "Cipher","Neon Syndicate", 1 , true, false),
   (2, 2, 9, 6, "Armitager", "Neon Syndicate", 2, false, true);
