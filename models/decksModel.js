const pool = require("../config/database");
const Settings = require("./gameSettings");

function fromDBCardToCard(dbDeck) {

  if (!dbDeck) {
    console.error('Erro: dbDeck não definido.');
    return null;
  }

  return new Deck(
    dbDeck.deck_id,
    new Card(
      dbDeck.crd_id,
      dbDeck.crd_cost,
      dbDeck.crd_damage,
      dbDeck.crd_health,
      dbDeck.crd_name,
      dbDeck.crd_gang,
      new CardType(dbDeck.ct_id, dbDeck.ct_name)
    ),
    dbDeck.ugc_id
  );
}

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

  static async genCard(playerId) {
    try {
      let [cards] = await pool.query(
        `select d.deck_id, c.*, ct.ct_id, ct.ct_name from deck d, card c, card_type ct, user_game where ug_user_id = ? and deck_crd_id = crd_id and crd_type_id = ct_id and crd_type_id != 1 and deck_id = ug_deck_id`,
        [playerId]
      );
      let rndCard = fromDBCardToCard(
        cards[Math.floor(Math.random() * cards.length)]
      );
      // insert the card
      let [result] = await pool.query(
        `Insert into user_game_card (ugc_user_game_id,ugc_crd_id,crd_state_id)
              values (?,?,2)`,
        [playerId, rndCard.deck_crd_id.crd_id]
      );
      return { status: 200, result: rndCard };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
}

class Deck {
  constructor(deck_id, deck_crd_id, ugc_id) {
    this.deck_id = deck_id;
    this.deck_crd_id = deck_crd_id;
    this.ugc_id = ugc_id;
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
        "Select * from card inner join deck on deck_crd_id = crd_id inner join card_type on crd_type_id = ct_id inner join user_game_card on ugc_crd_id = crd_id and crd_state_id = 2 where ugc_user_game_id = ?",
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

   
  static async playCard(game, cardid) {
    try {
        // get the card and check if the card is from the player and it is 
        let [dbDeckCards] = await pool.query("Select * from card inner join deck on deck_crd_id = crd_id inner join card_type on crd_type_id = ct_id inner join user_game_card on ugc_crd_id = crd_id and crd_state_id = 2 where ugc_user_game_id = ? and ugc_crd_id = ?", [game.player.id, cardid]);
        let card = fromDBCardToCard(dbDeckCards[0]);
        let playerchips = game.player.chips;

        if (playerchips < card.deck_crd_id.crd_cost) {
          alert("Not enough chips points");
        }

        playerchips -= card.deck_crd_id.crd_cost;

        await pool.query(`update user_game set ug_chips = ? where ug_user_id = ?`, [playerchips, game.player.id]);
        await pool.query(`update user_game_card set ugc_infield = true, crd_state_id = 3 where ugc_user_game_id = ? and ugc_id = ?`, [game.player.id, card.ugc_id]);
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
  }


  static async genPlayerHand(playerId) {
    try {
      let cards = [];
      for (let i = 0; i < Settings.nCards; i++) {
        let result = await Card.genCard(playerId);
        cards.push(result.result);
      }
      return { status: 200, result: cards };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  static async addCardToHand(playerId) {
    try {
      let cards = [];
      for (let i = 0; i < Settings.nCardsPerTurn; i++) {
        let result = await Card.genCard(playerId);
        cards.push(result.result);
      }
      return { status: 200, result: cards };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
}

module.exports = Deck;
