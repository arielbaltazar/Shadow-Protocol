const pool = require("../config/database");
const Settings = require("./gameSettings");
const Board = require("./boardModel");
const Play = require("./playsModel");

function fromDBCardToCardGame(dbCardGame) {
  return new CardGame(
    dbCardGame.ugc_id,
    dbCardGame.ugc_user_game_id,
    dbCardGame.ugc_crd_id,
    dbCardGame.ugc_crd_cost,
    dbCardGame.ugc_crd_health,
    dbCardGame.ugc_crd_damage,
    dbCardGame.ugc_crd_name,
    dbCardGame.ugc_crd_gang,
    dbCardGame.ugc_crd_type_id,
    dbCardGame.ugc_infield,
    dbCardGame.crd_state_id
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

  static async genDeck(playerId) {
    try {
      let [PlayerDeck] = await pool.query(
        `select * from deck inner join card on crd_id = deck_crd_id inner join card_type on crd_type_id = ct_id inner join user_game on ug_deck_id = deck_id where ug_id = ?`,
        [playerId]
      );
      let decks = [];
      for (let playerdeck of PlayerDeck) {
        let cards = new Deck(
          playerdeck.deck_id,
          new Card(
            playerdeck.crd_id,
            playerdeck.crd_cost,
            playerdeck.crd_damage,
            playerdeck.crd_health,
            playerdeck.crd_name,
            playerdeck.crd_gang,
            new CardType(playerdeck.ct_id, playerdeck.ct_name)
          ),
          playerdeck.deck_crd_qty
        );

        for (let i = 0; i < playerdeck.deck_crd_qty; i++) {
          let [result] = await pool.query(
            `Insert into user_game_card (ugc_user_game_id,ugc_crd_id,ugc_crd_cost,ugc_crd_health,ugc_crd_damage,ugc_crd_name,ugc_crd_gang,ugc_crd_type_id,crd_state_id)
                  values (?,?,?,?,?,?,?,?,1)`,
            [
              playerId,
              cards.deck_crd_id.crd_id,
              cards.deck_crd_id.crd_cost,
              cards.deck_crd_id.crd_health,
              cards.deck_crd_id.crd_damage,
              cards.deck_crd_id.crd_name,
              cards.deck_crd_id.crd_gang,
              cards.deck_crd_id.crd_type_id.id,
            ]
          );
        }
        decks.push(cards);
      }
      return { status: 200, result: decks };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  static async genCard(playerId) {
    try {
      let [cards] = await pool.query(
        `select * from user_game_card where ugc_crd_type_id != 1 and ugc_user_game_id = ? and crd_state_id = 1`,
        [playerId]
      );
      let rndCard = fromDBCardToCardGame(
        cards[Math.floor(Math.random() * cards.length)]
      );
      // insert the card
      let [result] = await pool.query(
        `update user_game_card set crd_state_id = 2 where ugc_user_game_id = ? and ugc_id = ?`,
        [playerId, rndCard.ugc_id]
      );
      return { status: 200, result: rndCard };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
}

class CardGame {
  constructor(
    ugc_id,
    ugc_user_game_id,
    ugc_crd_id,
    ugc_crd_cost,
    ugc_crd_health,
    ugc_crd_damage,
    ugc_crd_name,
    ugc_crd_gang,
    ugc_crd_type_id,
    ugc_infield,
    crd_state_id
  ) {
    this.ugc_id = ugc_id;
    this.ugc_user_game_id = ugc_user_game_id;
    this.ugc_crd_id = ugc_crd_id;
    this.ugc_crd_cost = ugc_crd_cost;
    this.ugc_crd_health = ugc_crd_health;
    this.ugc_crd_damage = ugc_crd_damage;
    (this.ugc_crd_name = ugc_crd_name),
      (this.ugc_crd_gang = ugc_crd_gang),
      (this.ugc_crd_type_id = ugc_crd_type_id);
    this.ugc_infield = ugc_infield;
    this.crd_state_id = crd_state_id;
  }
}

class Deck {
  constructor(deck_id, deck_crd_id, deck_crd_qty, ugc_id) {
    this.deck_id = deck_id;
    this.deck_crd_id = deck_crd_id;
    this.deck_crd_qty = deck_crd_qty;
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
          ),
          dbDeck.deck_crd_qty
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
        "select * from user_game_card where ugc_user_game_id = ? and crd_state_id = 2",
        [game.player.id]
      );
      let decks = [];
      for (let dbDeck of dbDecks) {
        let cards = new CardGame(
          dbDeck.ugc_id,
          dbDeck.ugc_user_game_id,
          dbDeck.ugc_crd_id,
          dbDeck.ugc_crd_cost,
          dbDeck.ugc_crd_health,
          dbDeck.ugc_crd_damage,
          dbDeck.ugc_crd_name,
          dbDeck.ugc_crd_gang,
          dbDeck.ugc_crd_type_id,
          dbDeck.ugc_infield,
          dbDeck.crd_state_id
        );
        decks.push(cards);
      }
      return { status: 200, result: decks };
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

  static async genPlayerDeck(playerId) {
    try {
      let cards = [];
      //for (let i = 0; i < Settings.nCards; i++) {
      let result = await Card.genDeck(playerId);
      cards.push(result.result);
      //}
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

  static async playCard(game, cardid, column) {
    try {
      // get the card and check if the card is from the player and it is
      let [dbDeckCards] = await pool.query(
        "select * from user_game_card where ugc_user_game_id = ? and crd_state_id = 2 and ugc_id = ?",
        [game.player.id, cardid]
      );

      //Verify if the card exists
      if (!dbDeckCards.length) {
        return {
          status: 400,
          result: { msg: "Player has no cards." },
        };
      }

      let card = fromDBCardToCardGame(dbDeckCards[0]);
      let playerchips = game.player.chips;

      if (playerchips < card.ugc_crd_cost) {
        return { status: 400, result: { msg: "Not enough chips!" } };
      }

      let { result } = await Board.getBoard(game);
      let columns = result;
      //Verify if position exists
      if (!columns[column - 1]) {
        return {
          status: 400,
          result: { msg: "Please choose a valid position to place the card" },
        };
      }
      //Verify if selected position was already taken
      if (columns[column - 1].posPlayer) {
        return {
          status: 400,
          result: { msg: "You already placed a value at that position" },
        };
      }
      //Update Board
      columns[column - 1].posPlayer = cardid;
      await pool.query(
        `Insert into user_game_board(ugb_ug_id,ugb_pos_id,ugb_crd_id) 
                        values (?,?,?)`,
        [game.player.id, column, cardid]
      );

      //Subtract player's chips
      playerchips -= card.ugc_crd_cost;
      await pool.query(
        `update user_game set ug_chips = ? where ug_user_id = ?`,
        [playerchips, game.player.id]
      );
      //Update card's state
      await pool.query(
        `update user_game_card set ugc_infield = true, crd_state_id = 3 where ugc_user_game_id = ? and ugc_id = ?`,
        [game.player.id, cardid]
      );
      return { status: 200, result: { msg: "Card played!" } };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  static async attackCard(game, playercrd, oppcrd) {
    try {
      let [dbCardplayer] = await pool.query(
        "Select * from user_game_card where crd_state_id = 3 and ugc_user_game_id = ? and ugc_id = ?",
        [game.player.id, playercrd]
      );
      let [dbCardopp] = await pool.query(
        "Select * from user_game_card where crd_state_id = 3 and ugc_user_game_id = ? and ugc_id = ?",
        [game.opponents[0].id, oppcrd]
      );

      let [dbBoardCards] = await pool.query(
        "select * from user_game_board, user_game_card where ugb_crd_id = ugc_id and ugc_crd_type_id != 1 and ugb_ug_id = ?",
        [game.opponents[0].id]
      );

      let [dbchiefCard] = await pool.query(
        "Select * from user_game_card where ugc_user_game_id = ? and ugc_crd_type_id = 1",
        [game.opponents[0].id]
      );

      if (!dbCardplayer.length) {
        return { status: 400, result: { msg: "Player has no cards!" } };
      }

      if (!dbCardopp.length) {
        return { status: 400, result: { msg: "Opp has no cards!" } };
      }

      let cardplayer = fromDBCardToCardGame(dbCardplayer[0]);
      let cardopp = fromDBCardToCardGame(dbCardopp[0]); 
      let chiefCard = fromDBCardToCardGame(dbchiefCard[0]);

      //attack other cards
      if (cardplayer.ugc_crd_type_id == 1) {
        return { status: 400, result: { msg: "You can't attack with the chief!" } };
      }else {
        //attack chief
        if (cardopp.ugc_crd_type_id == 1){
          if (dbBoardCards.length == 0){
            cardopp.ugc_crd_health -= cardplayer.ugc_crd_damage;

            if (cardopp.ugc_crd_health <= 0) {
              await pool.query(
                "update user_game_card set crd_state_id = 4, ugc_crd_health = 0 where ugc_id = ?",
                [cardopp.ugc_id]
              );
              //await Play.endGame(game);
              return { status: 200, result: { msg: "You won! Opponent's chief card died." } };
              //await pool.query('update user_game set ug_state_id = 4 where ug_user_id = ?', [game.opponents[0].id]);
              //return { status: 200, result: { msg: "You won! Opponent's chief card died." } }; // colocar no playsmodels para conseguir terminar o jogo
            } else {
              await pool.query(
                "update user_game_card set ugc_crd_health = ? where ugc_id = ?",
                [cardopp.ugc_crd_health, cardopp.ugc_id]
              );
              return { status: 200, result: { msg: "Chief attacked!" } };
            }
          
          }else{
            return { status: 200, result: { msg: "You must clear the board to attack the chief!" } };
          }
        }else{
          cardopp.ugc_crd_health -= cardplayer.ugc_crd_damage;
          if (cardopp.ugc_crd_health < 0) {
            //cheif damage
            chiefCard.ugc_crd_health -= Math.abs(cardopp.ugc_crd_health);

            if (chiefCard.ugc_crd_health <= 0) {
              await pool.query(
                "update user_game_card set crd_state_id = 4, ugc_crd_health = 0 where ugc_id = ?",
                [chiefCard.ugc_id]
              );
              //await Play.endGame(game);
              return { status: 200, result: { msg: "You won! Opponent's chief card died." } };
              //await pool.query('update user_game set ug_state_id = 4 where ug_user_id = ?', [game.opponents[0].id]);
              // colocar no playsmodels para conseguir terminar o jogo
            } else {
              await pool.query(
                "update user_game_card set ugc_crd_health = ? where ugc_id = ?",
                [chiefCard.ugc_crd_health, chiefCard.ugc_id]
              );
            }

            await pool.query(
              "update user_game_card set crd_state_id = 4, ugc_crd_health = 0 where ugc_id = ?",
              [cardopp.ugc_id]
            );

            await pool.query("delete from user_game_board where ugb_crd_id = ?", [
              cardopp.ugc_id,
            ]);

          } else {
            await pool.query(
              "update user_game_card set ugc_crd_health = ? where ugc_id = ?",
              [cardopp.ugc_crd_health, cardopp.ugc_id]
            );
            
          }
          return { status: 200, result: { msg: "Card attacked!" } };
        }
      }

    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
}

module.exports = Deck;
