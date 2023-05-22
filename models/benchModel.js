const pool = require("../config/database");



class Bench {
    constructor(position, posPlayer, posOpponent) {
        this.position = position;
        this.posPlayer = posPlayer;
        this.posOpponent = posOpponent;
    }

    static async getBench(game) {
        try {
            let [dbBench] = await pool.query(`select gben_pos, player.ugben_crd_id as player_crd_id, opp.ugben_crd_id as opp_crd_id from game_bench
            left join user_game_bench as player on player.ugben_pos_id = gben_id and player.ugben_ug_id = ?
            left join user_game_bench as opp on opp.ugben_pos_id = gben_id and opp.ugben_ug_id = ?
            order by gben_pos ASC`, [game.player.id, game.opponents[0].id]);
            let bench = [];
            for(let dbbench of dbBench) {
                bench.push(new Bench(dbbench.gben_pos, dbbench.player_crd_id, dbbench.opp_crd_id));
            }
            return { status: 200, result: bench };
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async getCardsInBench(game){
        try{
            let [cards] = await pool.query(`select * from user_game_bench, user_game_card where ugben_crd_id = ugc_id and (ugben_ug_id = ? or ugben_ug_id = ?)`, [game.player.id, game.opponents[0].id]);

            return{ status: 200, result: cards }
        } catch(err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}


module.exports = Bench;