const pool = require("../config/database");
const Deck = require("./decksModel");
const Settings = require("./gameSettings");

// auxiliary function to check if the game ended
/*async function checkEndGame(game) {
 let oppinf = await pool.query(
    `select * from user_game where ug_id = ?`,
    [ game.opponents[0].id]) // opp da posição 0
   if (oppinf[0].ug_state_id == 4)
   {
    await Play.endGame(game)
   }
}*/

class Play {
  // At this moment I do not need to store information so we have no constructor

  // Just a to have a way to determine end of game
  //static maxNumberTurns = 10;

  // we consider all verifications were made
  // start cards in hand and add cards after end turn
  static async startGame(game) {
    try {
      await pool.query(
        `Update user_game set ug_state_id=?,ug_order=? where ug_id = ?`,
        [5, 1, game.player.id]
      );
      // Player that is second changes to order 2
      await pool.query(
        `Update user_game set ug_state_id=?,ug_order=? where ug_id = ?`,
        [5, 2, game.opponents[0].id]
      );

      // Changing the game state to start
      await pool.query(`Update game set gm_state_id=? where gm_id = ?`, [
        5,
        game.id,
      ]);
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  static async choosedeck(game, deckid) {
    try {
      await pool.query(
        `Update user_game set ug_state_id = ?, ug_deck_id = ? where ug_id = ?`,
        [6, deckid, game.player.id]
      );
      await Deck.genPlayerDeck(game.player.id);
      await Deck.genPlayerHand(game.player.id);

      if (
        game.player.state.name == "Ready" ||
        game.opponents[0].state.name == "Ready"
      ) {
        let myTurn = Math.random() < 0.5;
        let p1Id = myTurn ? game.player.id : game.opponents[0].id;
        let p2Id = myTurn ? game.opponents[0].id : game.player.id;
        // Player that start changes to the state Playing and order 1
        await pool.query(`Update user_game set ug_state_id=? where ug_id = ?`, [
          2,
          p1Id,
        ]);
        await pool.query(`Update user_game set ug_state_id=? where ug_id = ?`, [
          1,
          p2Id,
        ]);
        await pool.query(`Update game set gm_state_id=? where gm_id = ?`, [
          2,
          game.id,
        ]);

        // put the chief in the board
        await pool.query(
          `Update user_game_card set crd_state_id = 3 where ugc_crd_type_id = 1 and ugc_user_game_id = ?`,
          [p1Id]
        );
        await pool.query(
          `Insert into user_game_board(ugb_ug_id,ugb_pos_id,ugb_crd_id) values (?,5,(select ugc_id from user_game_card where ugc_crd_type_id = 1 and ugc_user_game_id = ?));`, [p1Id, p1Id]
        );
        await pool.query(
          `Update user_game_card set crd_state_id = 3 where ugc_crd_type_id = 1 and ugc_user_game_id = ?`,
          [p2Id]
        );
        await pool.query(
          `Insert into user_game_board(ugb_ug_id,ugb_pos_id,ugb_crd_id) values (?,5,(select ugc_id from user_game_card where ugc_crd_type_id = 1 and ugc_user_game_id = ?));`, [p2Id, p2Id]
        );
      }
      return { status: 200, result: { msg: "You choose the deck: " + deckid } };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  // This considers that only one player plays at each moment,
  // so ending my turn starts the other players turn
  // We consider the following verifications were already made:
  // - The user is authenticated
  // - The user has a game running
  // NOTE: This might be the place to check for victory, but it depends on the game
  static async endTurn(game) {
    try {
      // Change player state to waiting (1)
      await pool.query(`Update user_game set ug_state_id=? where ug_id = ?`, [
        1,
        game.player.id,
      ]);
      // Change opponent state to playing (2)
      await pool.query(`Update user_game set ug_state_id=? where ug_id = ?`, [
        2,
        game.opponents[0].id,
      ]);

      let [nCards] = await pool.query(
        `Select ugc_crd_id from user_game_card where ugc_user_game_id = ? and crd_state_id = 2`,
        [game.player.id]
      );

      if (nCards.length < Settings.MaxCards) {
        await Deck.addCardToHand(game.player.id);
      }

      let playerchips = game.player.chips;

      playerchips += Settings.nChipsPerTurn;
      if (playerchips > Settings.MaxChips) playerchips = Settings.MaxChips;
      await pool.query(
        `update user_game set ug_chips = ? where ug_user_id = ?`,
        [playerchips, game.player.id]
      );

      // Both players played
      if (game.player.order == 2) {
        await pool.query(
          `Update game set gm_turn=gm_turn+1 where gm_id = ?`,
          [game.id]
        );
      }

      return { status: 200, result: { msg: "Your turn ended." } };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  // Makes all the calculation needed to end and score the game
  static async endGame(game) {
    try {
      // Both players go to score phase (id = 3)
      let sqlPlayer = `Update user_game set ug_state_id = ? where ug_id = ?`;
      await pool.query(sqlPlayer, [3, game.player.id]);
      await pool.query(sqlPlayer, [3, game.opponents[0].id]);
      // Set game to finished (id = 3)
      await pool.query(`Update game set gm_state_id=? where gm_id = ?`, [
        3,
        game.id,
      ]);

      // Insert score lines with the state and points.
      // For this template both are  tied (id = 1) and with one point
      let sqlScore = `Insert into scoreboard (sb_user_game_id,sb_state_id,sb_points) values (?,?,?)`;
      await pool.query(sqlScore, [game.player.id, 1, 1]);
      await pool.query(sqlScore, [game.opponents[0].id, 1, 1]);

      return { status: 200, result: { msg: "Game ended. Check scores." } };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
}

module.exports = Play;
