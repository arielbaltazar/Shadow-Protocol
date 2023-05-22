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

async function getBoardInfo() {
  let result = await requestBoardInfo();
  let cards = await requestCardsInBoard();
  if (!result.successful) {
    alert("Something is wrong with the game please login again!");
    window.location.pathname = "index.html";
  } else {
    GameInfo.gameboard = result.board;
    GameInfo.cardsInBoard = cards.result;
    if (GameInfo.board) GameInfo.board.update(GameInfo.gameboard);
    else
      GameInfo.board = new Board(
        GameInfo.gameboard,
        GameInfo.game.player.name,
        GameInfo.game.opponents[0].name,
        570,
        300,
        650,
        380,
        30,
        GameInfo.images.card,
        GameInfo.images.chief,
        clickActionAttack
      );
  }
}

async function getBenchInfo() {
  let result = await requestBenchInfo();
  let cards = await requestCardsInBench();
  if (!result.successful) {
    alert("Something is wrong with the game please login again!");
    window.location.pathname = "index.html";
  } else {
    GameInfo.gamebench = result.bench;
    GameInfo.cardsInBench = cards.result;
    if (GameInfo.bench) GameInfo.bench.update(GameInfo.gamebench, GameInfo.cardsInBench);
    else
      GameInfo.bench = new Bench(
        GameInfo.gamebench,
        GameInfo.cardsInBench,
        GameInfo.game.player.name,
        GameInfo.game.opponents[0].name,
        475,
        150,
        800,
        380,
        30,
        GameInfo.images.card,
        GameInfo.images.hack,
        dragndropFromBenchToBoard
      );
  }
}

async function getDecksInfo() {
  let result = await requestDeckChoosen();
  if (!result.successful) {
    alert("Something is wrong with the game please login again!");
    window.location.pathname = "index.html";
  } else {
    GameInfo.matchdeck = result.deck;
    if (GameInfo.playerDeck) GameInfo.playerDeck.update(GameInfo.matchdeck.player);
    else
      GameInfo.playerDeck = new Deck(
        GameInfo.matchdeck.player,
        65,
        820,
        null,
        GameInfo.images.card,
        GameInfo.images.hack,
        dragndropFromHandToBench
      );

    if (GameInfo.oppDeck) GameInfo.oppDeck.update(GameInfo.matchdeck.opponent);
    else
      GameInfo.oppDeck = new Deck(
        GameInfo.matchdeck.opponent,
        1810,
        60,
        null,
        GameInfo.images.backcard,
        null,
        null
      );
  }
}
async function dragndropFromHandToBench(x, y, card) {
  let pos = GameInfo.bench.getPlayerColumnAt(x, y);
  playCardFromHandToBench(card, pos);
  //alert(pos);
}

async function dragndropFromBenchToBoard(x, y, card) {
  let pos = GameInfo.board.getPlayerColumnAt(x, y);
  playCardFromBenchToBoard(card, pos);
  //alert(pos);
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

// remake this
async function clickActionAttack(x, y) {
  if(GameInfo.dragbenchtoboard == true){
    return
  }

  if(GameInfo.game.player.state == "Waiting"){
    return
  }

  if(GameInfo.game.turn == 1) {
    alert("You can't attack in the first turn");
    return
  }

  GameInfo.cardattack = true;

  let card = GameInfo.board.getCardAt(x, y);
  GameInfo.selectedCards.push(card);

  if(GameInfo.selectedCards[0].ugc_crd_active == false){
    alert("You can't use this card");
    GameInfo.selectedCards = [];
    GameInfo.cardattack = false;
  }

  if (GameInfo.selectedCards.length === 2) {

    if(GameInfo.selectedCards[0].ugc_id == GameInfo.selectedCards[1].ugc_id){
      alert("You can't attack your own card");
    }
    
    if(GameInfo.selectedCards[0].ugc_crd_active == true){
      await attackCard(GameInfo.selectedCards[0].ugc_id, GameInfo.selectedCards[1].ugc_id);
    }

    GameInfo.selectedCards = [];
  }
}

async function playCardFromHandToBench(card, position) {
  if (confirm(`Do you want to play the "${card.ugc_crd_name}" card?`)) {
    let result = await requestPlayCardFromHandToBench(card.ugc_id, position);
    if (result.successful) {
      await getGameInfo();
      await getBoardInfo();
      await getBenchInfo();
      await getDecksInfo();
      alert(result.msg);
    }
  }
}

async function playCardFromBenchToBoard(card, position) {
  if (card.ugc_crd_type_id != 4){
    if (confirm(`Do you want to play the "${card.ugc_crd_name}" card?`)) {
      let result = await requestPlayCardFromBenchToBoard(card.ugc_id, position);
      if (result.successful) {
        await getGameInfo();
        await getBoardInfo();
        await getBenchInfo();
        await getDecksInfo();
        GameInfo.dragbenchtoboard = false;
        alert(result.msg);
      }
    }
  }else{
    if (confirm(`Do you want to use this hack?`)) {
      let result = await requestPlayCardFromBenchToBoard(card.ugc_id, position);
      if (result.successful) {
        await getGameInfo();
        await getBoardInfo();
        await getBenchInfo();
        await getDecksInfo();
        GameInfo.dragbenchtoboard = false;
        alert(result.msg);
      }
    }
  }
}

async function attackCard(playercard, oppcard) {
  //if (confirm(`Do you want to play the "${card.ugc_crd_name}" card?`)) {
  let result = await requestAttackCard(playercard, oppcard);
  if (result.successful) {
    await getGameInfo();
    await getBoardInfo();
    await getBenchInfo();
    await getDecksInfo();
    GameInfo.cardattack = false;
    alert(result.msg);
  }
  //}
}

async function closeScore() {
  let result = await requestCloseScore();
  if (result.successful) {
    await checkGame(true); // This should send the player back to matches
  } else alert("Something went wrong when ending the turn.");
}
