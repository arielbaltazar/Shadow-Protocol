const express = require('express');
const router = express.Router();
const Bench = require("../models/benchModel");
const auth = require("../middleware/auth");



router.get('/', auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Get the board for this player in this game");
        if (!req.game  || req.game.opponents.length == 0) {
            res.status(400).send({msg:"You are not at a game, please create or join a game"});
        } else {
            let result = await Bench.getBench(req.game);
            res.status(result.status).send(result.result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/in-bench', auth.verifyAuth, async function (req, res, next) {
    try {
        if (!req.game  || req.game.opponents.length == 0) {
            res.status(400).send({msg:"You are not at a game, please create or join a game"});
        } else {
            let result = await Bench.getCardsInBench(req.game);
            res.status(result.status).send(result.result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});



module.exports = router;