const pool = require("../config/database");
const setting = require("./gameSettings")

class CardType {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Card {
  constructor(
    crd_id,
    crd_cost,
    crd_damage,
    crd_health,
    crd_name,
    crd_gang,
    crd_type_id
  ) {
    this.crd_id = crd_id;
    this.crd_cost = crd_cost;
    this.crd_damage = crd_damage;
    this.crd_health = crd_health;
    this.crd_name = crd_name;
    this.crd_gang = crd_gang;
    this.crd_type_id = crd_type_id;
  }
  static async genPlayerDeck(playerId) {
    try {
        let cards =[];
        for (let i=0; i < Settings.nCards; i++) {
            let result = await Card.genCard(playerId);
            cards.push(result.result);
        }
        return {status:200, result: cards};
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}
}

class Deck {
  constructor(deck_id, deck_crd_id) {
    this.deck_id = deck_id;
    this.deck_crd_id = deck_crd_id;
  }

  

  static async getDecks() {
    try {
      let [dbDecks] = await pool.query(
        "select * from deck, card, card_type where deck_crd_id = crd_id and crd_type_id = ct_id"
      );
      let decks = [];
      for (let dbDeck of dbDecks) {
        let cards = new Deck(
          dbDeck.deck_id,
          new Card(
            dbDeck.crd_id,
            dbDeck.crd_cost,
            dbDeck.crd_damage,
            dbDeck.crd_health,
            dbDeck.crd_name,
            dbDeck.crd_gang,
            new CardType(dbDeck.ct_id, dbDeck.ct_name)
          )
        );
        decks.push(cards);
      }
      return { status: 200, result: decks };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  static async getDeckchoosen(game) {
    try {
      let [dbDecks] = await pool.query(
        "select * from deck, card, card_type, user_game where ug_user_id = ? and deck_crd_id = crd_id and crd_type_id = ct_id and deck_id = ug_deck_id",
        [game.player.id]
      );
      let decks = [];
      for (let dbDeck of dbDecks) {
        let cards = new Deck(
          dbDeck.deck_id,
          new Card(
            dbDeck.crd_id,
            dbDeck.crd_cost,
            dbDeck.crd_damage,
            dbDeck.crd_health,
            dbDeck.crd_name,
            dbDeck.crd_gang,
            new CardType(dbDeck.ct_id, dbDeck.ct_name)
          )
        );
        decks.push(cards);
      }
      return { status: 200, result: decks };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
}

module.exports = Deck;
