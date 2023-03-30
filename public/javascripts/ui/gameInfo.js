// All the variables for the game UI
// we only have one game info so everything is static
class GameInfo {
  // settings variables
  static width = 1400;
  static height = 750;

  static loading = true;

  // data
  static game;
  static images = {};
  static sounds = {};

  // rendererers
  static scoreBoard;
  static scoreWindow;

  static matchdeck;
  static playerDeck;

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
    } else if (GameInfo.game.player.state == "Ready") {
      GameInfo.endturnButton.hide();
      GameInfo.choosedeck1button.hide();
      GameInfo.choosedeck2button.hide();
    } else if (GameInfo.game.player.state == "Playing") {
      GameInfo.endturnButton.show();
      GameInfo.choosedeck1button.hide();
      GameInfo.choosedeck2button.hide();
    } else if (GameInfo.game.player.state == "Waiting") {
      GameInfo.endturnButton.hide();
      GameInfo.choosedeck1button.hide();
      GameInfo.choosedeck2button.hide();
    } else if (GameInfo.game.player.state == "Score") {
      GameInfo.endturnButton.hide();
      GameInfo.choosedeck1button.hide();
      GameInfo.choosedeck2button.hide();
      GameInfo.scoreWindow.open();
    }
  }
}
