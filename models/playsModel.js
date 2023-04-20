const pool = require("../config/database");
const Deck = require("./decksModel");
const Settings = require("./gameSettings");

// auxiliary function to check if the game ended
async function checkEndGame(game) {
  //return game.turn >= Play.maxNumberTurns;
}

class Play {
  // At this moment I do not need to store information so we have no constructor

  // Just a to have a way to determine end of game
  //static maxNumberTurns = 10;

  // we consider all verifications were made
  // start cards in hand and add cards after end turn
  static async startGame(game) {
    try {
      // Randomly determines who starts
      //let myTurn = (Math.random() < 0.5);
      //let p1Id = myTurn ? game.player.id : game.opponents[0].id;
      // let p2Id = myTurn ? game.opponents[0].id : game.player.id;
      // Player that start changes to the state Playing and order 1
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

        //await Deck.genPlayerHand(game.player.id);
        //await Deck.genPlayerHand(game.opponents[0].id);
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
      let count = 0;
      for (let nCard of nCards) {
        count = count + 1;
      }
      if (count < Settings.MaxCards) {
        await Deck.addCardToHand(game.player.id);
      }

      let playerchips = game.player.chips;
      if (playerchips < Settings.MaxChips) {
        playerchips += Settings.nChipsPerTurn;

        if (playerchips > Settings.MaxChips) {
          await pool.query(
            `update user_game set ug_chips = 10 where ug_user_id = ?`,
            [game.player.id]
          );
        } else {
          await pool.query(
            `update user_game set ug_chips = ? where ug_user_id = ?`,
            [playerchips, game.player.id]
          );
        }
      }

      // Both players played
      if (game.player.order == 2) {
        // Criteria to check if game ended
        if (await checkEndGame(game)) {
          return await Play.endGame(game);
        } else {
          // Increase the number of turns and continue
          await pool.query(
            `Update game set gm_turn=gm_turn+1 where gm_id = ?`,
            [game.id]
          );
        }
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
