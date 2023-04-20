const pool = require("../config/database");



class Board {
    constructor(position, posPlayer, posOpponent) {
        this.position = position;
        this.posPlayer = posPlayer;
        this.posOpponent = posOpponent;
    }

    static async getBoard(game) {
        try {
            let [dbBoard] = await pool.query(`select gb_pos, player.ugb_crd_id as player_crd_id, opp.ugb_crd_id as opp_crd_id from game_board
            left join user_game_board as player on player.ugb_pos_id = gb_id and player.ugb_ug_id = ?
            left join user_game_board as opp on opp.ugb_pos_id = gb_id and opp.ugb_ug_id = ?
            order by gb_pos ASC`, [game.player.id, game.opponents[0].id]);
            let board = [];
            for(let dbboard of dbBoard) {
                board.push(new Board(dbboard.gb_pos, dbboard.player_crd_id, dbboard.opp_crd_id));
            }
            return { status: 200, result: board };
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}


module.exports = Board;