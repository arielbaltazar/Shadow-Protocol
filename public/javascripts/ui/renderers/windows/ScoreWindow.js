
class ScoreWindow extends Window {
    constructor (x,y,width,height,score, action) {
        super(x,y,width,height);
        this.score = score;
        this.player = this.score.playerScores[0];
        this.opp = this.score.playerScores[1];
        this.createButton("Close Score",x+width/2,y+height-50,action, 150);
    }

    close() {
    }

    draw() {
        // super.draw();
        if (this.opened) {
            if(this.player.id == GameInfo.game.player.id){
                if(this.player.state == 'Won'){
                    image(GameInfo.images.win, 950, 500, 550, 510);
                }
                if(this.player.state == 'Lost'){{
                    image(GameInfo.images.lose, 950, 500, 550, 510)};  
                }
            }
            if(this.player.id == GameInfo.game.opponents[0].id){
                if(this.opp.state == 'Won'){
                    image(GameInfo.images.win, 200, 500, 310, 200);
                }
                if(this.opp.state == 'Lost'){{
                    image(GameInfo.images.lose, 200, 150, 310, 200)};  
                }
            }
        }
    }

}