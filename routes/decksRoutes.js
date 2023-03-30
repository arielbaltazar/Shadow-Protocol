const express = require("express");
const router = express.Router();
const Deck = require("../models/decksModel");
const auth = require("../middleware/auth");

router.get("/auth", auth.verifyAuth, async function (req, res, next) {
  try {
    console.log("Get decks");
    let result = await Deck.getDecks();
    res.status(result.status).send(result.result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/ChoosenDeck", auth.verifyAuth, async function (req, res, next) {
  try {
    console.log("Get decks");
    let result = await Deck.getDeckchoosen(req.game);
    res.status(result.status).send(result.result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
