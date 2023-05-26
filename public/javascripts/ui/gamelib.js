async function refresh() {
  if (
    GameInfo.game.player.state == "Waiting" ||
    GameInfo.game.player.state == "Choose Deck" ||
    GameInfo.game.player.state == "Ready"
  ) {
    // Every time we are waiting
    await getGameInfo();
    await getBoardInfo();
    await getBenchInfo();
    await getDecksInfo();
    
    GameInfo.prepareUI();
  }

  if(!GameInfo.yourturntimer){
    GameInfo.yourturn.draw();
  }
  // Nothing to do when we are playing since we control all that happens
  // so no update is needed from the server
}

function preload() {
  GameInfo.images.card = loadImage("/assets/card_template.png");
  GameInfo.images.turn = loadImage("/assets/your_turn.png");
  GameInfo.images.win = loadImage("/assets/win.png");
  GameInfo.images.lose = loadImage("/assets/lose.png");
  GameInfo.images.backcard = loadImage("/assets/backcard_template.png");
  GameInfo.images.hack = loadImage("/assets/hack_template.png");
  GameInfo.images.chief = loadImage("/assets/chief_template.png");
  GameInfo.images.chipplayer = loadImage("/assets/chip_p.png");
  GameInfo.images.chipopp = loadImage("/assets/chip_o.png");
  GameInfo.images.backgroundgame = loadImage("/assets/background_game.jpg");
  
  //GameInfo.images.boardbg = loadImage("/assets/window_green.png");
}

async function setup() {
  let canvas = createCanvas(GameInfo.width, GameInfo.height);
  canvas.parent("game");

  imageMode(CENTER);
  angleMode(DEGREES);
  frameRate(60);
  // preload  images

  await getGameInfo();
  await getBoardInfo();
  await getBenchInfo();
  await getDecksInfo();
  setInterval(refresh, 1000);

  //buttons (create a separated function if they are many)
  // end turn button
  GameInfo.endturnButton = createButton("End Turn");
  GameInfo.endturnButton.parent("game");
  GameInfo.endturnButton.position(GameInfo.width - 150, GameInfo.height - 50);
  GameInfo.endturnButton.mousePressed(endturnAction);
  GameInfo.endturnButton.addClass("game");

  //Choose deck 1 button
  GameInfo.choosedeck1button = createButton("Deck 1");
  GameInfo.choosedeck1button.parent("game");
  GameInfo.choosedeck1button.position(
    GameInfo.width - 700,
    GameInfo.height - 300
  );
  GameInfo.choosedeck1button.mousePressed(ChooseDeck1Action);
  GameInfo.choosedeck1button.addClass("game");
  //Choose deck 2 button
  GameInfo.choosedeck2button = createButton("Deck 2");
  GameInfo.choosedeck2button.parent("game");
  GameInfo.choosedeck2button.position(
    GameInfo.width - 600,
    GameInfo.height - 300
  );
  GameInfo.choosedeck2button.mousePressed(ChooseDeck2Action);
  GameInfo.choosedeck2button.addClass("game");

  

  GameInfo.prepareUI();

  GameInfo.loading = false;
}

function draw() {
  imageMode(CENTER);
  image(GameInfo.images.backgroundgame, GameInfo.width / 2, GameInfo.height / 2);
  if (GameInfo.loading) {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill("black");
    text("Loading...", GameInfo.width / 2, GameInfo.height / 2);
  } else if (GameInfo.game.state == "Finished" && GameInfo.scoreWindow) {
    GameInfo.scoreWindow.draw();
  } else if (GameInfo.game.state != "Choose Deck" && GameInfo.game.state != "Ready"){
    GameInfo.playerDeck.draw();
    GameInfo.oppDeck.draw();
    GameInfo.playerDeck.updateDrag();
    GameInfo.scoreBoard.draw();
    GameInfo.board.draw();
    GameInfo.bench.draw();
    GameInfo.bench.updateDrag();
    GameInfo.yourturn.draw();
  }
}


async function mouseClicked() {
  /*if ( GameInfo.playerDeck) {
      GameInfo.playerDeck.click();
  }*/
  GameInfo.board.click();
  //GameInfo.bench.click();
}

async function mousePressed() {
  if ( GameInfo.playerDeck) {
    GameInfo.playerDeck.press();
  }
  if (GameInfo.bench) {
    GameInfo.bench.press();
  }
}

async function mouseReleased() {
  if (GameInfo.playerDeck) {
    GameInfo.playerDeck.release();
  }
  if (GameInfo.bench) {
    GameInfo.bench.release();
  }
}  