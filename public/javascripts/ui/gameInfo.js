// All the variables for the game UI
// we only have one game info so everything is static
class GameInfo {
  // settings variables
  static width = 1879;
  static height = 977;

  static loading = true;

  // data
  static game;
  static gameboard;
  static cardsInBoard;
  static gamebench;
  static cardsInBench;
  static images = {};
  static sounds = {};
  static selectedCards = [];

  // renderers
  static scoreBoard;
  static scoreWindow;
  static yourturn;

  static matchdeck;
  static playerDeck;
  static oppDeck;
  static board;
  static bench;
  static player;
  static opponent;
  static turn;
  static login;
  static gameplay;
  static click;

  //verification
  static dragbenchtoboard = false;
  static attackcard = false;
  static yourturntimer = false;

  // buttons
  static endturnButton;
  static choosedeck1button;
  static choosedeck2button;

  // Write your UI settings for each game state here
  // Call the method every time there is a game state change
  static prepareUI() {
    if (GameInfo.game.player.state == "Choose Deck") {
      //GameInfo.scoreBoard.show();
      GameInfo.choosedeck1button.show();
      GameInfo.choosedeck2button.show();
      GameInfo.endturnButton.hide();
      GameInfo.playerDeck.draggable = false;
      GameInfo.bench.draggable = false;
    } else if (GameInfo.game.player.state == "Ready") {
      GameInfo.endturnButton.hide();
      GameInfo.choosedeck1button.hide();
      GameInfo.choosedeck2button.hide();
      GameInfo.playerDeck.draggable = false;
      GameInfo.bench.draggable = false;
    } else if (GameInfo.game.player.state == "Playing") {
      GameInfo.endturnButton.show();
      GameInfo.choosedeck1button.hide();
      GameInfo.choosedeck2button.hide();
      GameInfo.playerDeck.draggable = true;
      GameInfo.bench.draggable = true;
    } else if (GameInfo.game.player.state == "Waiting") {
      GameInfo.endturnButton.hide();
      GameInfo.choosedeck1button.hide();
      GameInfo.choosedeck2button.hide();
      GameInfo.playerDeck.draggable = false;
      GameInfo.bench.draggable = false;
    } else if (GameInfo.game.player.state == "Score") {
      GameInfo.endturnButton.hide();
      GameInfo.choosedeck1button.hide();
      GameInfo.choosedeck2button.hide();
      GameInfo.scoreWindow.open();
      GameInfo.playerDeck.draggable = false;
      GameInfo.bench.draggable = false;
    }
  }
}
