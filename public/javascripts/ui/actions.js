async function getGameInfo() {
  let result = await requestPlayerGame();
  if (!result.successful) {
    alert("Something is wrong with the game please login again!");
    window.location.pathname = "index.html";
  } else {
    GameInfo.game = result.game;
    if (GameInfo.scoreBoard) GameInfo.scoreBoard.update(GameInfo.game);
    else GameInfo.scoreBoard = new ScoreBoard(GameInfo.game);
    // if game ended we get the scores and prepare the ScoreWindow
    if (GameInfo.game.state == "Finished") {
      let result = await requestScore();
      GameInfo.scoreWindow = new ScoreWindow(
        50,
        50,
        GameInfo.width - 100,
        GameInfo.height - 100,
        result.score,
        closeScore
      );
    }
  }
}

async function getDecksInfo() {
  let result = await requestDeckChoosen();
  if (!result.successful) {
    alert("Something is wrong with the game please login again!");
    window.location.pathname = "index.html";
  } else {
    GameInfo.matchdeck = result.deck;
    if (GameInfo.playerDeck) GameInfo.playerDeck.update(GameInfo.matchdeck);
    else
      GameInfo.playerDeck = new Deck(
        GameInfo.matchdeck,
        400,
        500,
        playCard,
        GameInfo.images.card
      );
  }
}

async function endturnAction() {
  let result = await requestEndTurn();
  if (result.successful) {
    await getGameInfo();
    GameInfo.prepareUI();
  } else alert("Something went wrong when ending the turn.");
}

async function ChooseDeck1Action() {
  if (confirm(`Do you want to choose the deck 1 ?`)) {
    let result = await requestChooseDeck(1);
    if (result.successful) {
      await getGameInfo();
      GameInfo.prepareUI();
    } else alert("Something went wrong choosing the deck.");
  }
}
async function ChooseDeck2Action() {
  if (confirm(`Do you want to choose the deck 2 ?`)) {
    let result = await requestChooseDeck(2);
    if (result.successful) {
      await getGameInfo();
      GameInfo.prepareUI();
    } else alert("Something went wrong choosing the deck.");
  }
}


async function playCard(card) {
if (confirm(`Do you want to play the "${card.deck_crd_id.crd_name}" card?`)) {
      let result = await requestPlayCard(card.deck_crd_id.crd_id);
      if (result.successful) {
          await getGameInfo();
          await getDecksInfo();
          alert("Card Played!");
      }
  }
}

async function attackCard(cardopp, cardopp) {
  if (confirm(`Do you want to attack the "${cardopp.deck_crd_id.crd_name}" card with your "${cardopp.deck_crd_id.crd_name}" card?`)) {
    let result = await requestAttackCard( playercrd.ugc_id, oppcrd.ugc_id);
    if (result.successful) {
      await getGameInfo();
      await getDecksInfo();
      alert("Card Attacked!");
    }
  }
}



async function closeScore() {
  let result = await requestCloseScore();
  if (result.successful) {
    await checkGame(true); // This should send the player back to matches
  } else alert("Something went wrong when ending the turn.");
}
