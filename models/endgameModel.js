const pool = require("../config/database");

class EndGame {
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
      let sqlScore = `Insert into scoreboard (sb_user_game_id,sb_state_id) values (?,?)`;
      await pool.query(sqlScore, [game.player.id, 3]);
      await pool.query(sqlScore, [game.opponents[0].id, 2]);

      return { status: 200, result: { msg: "Game ended. Check scores." } };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
}

module.exports = EndGame;
