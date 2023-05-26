class YourTurn {
    
    static width = 300;
    static height = 100;
    static x = 10;
    static y = 350;
    constructor(game) {
      this.game = game;
    }

    update(game) {
        this.game = game;
    }

    draw() {
        if(this.game.player.state == "Playing"){
            if(!GameInfo.yourturntimer){
                let currentTime = 0;
                currentTime = int(millis()/1000);
                if(currentTime < 2){
                    image(GameInfo.images.turn, 950, 500, 550, 510);
                }else{
                    currentTime = 0;
                    GameInfo.yourturntimer = true;
                }
            }
        }
    }    
  }
  