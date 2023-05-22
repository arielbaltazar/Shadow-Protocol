class Board {
  static headery = 15;

  constructor(
    columns,
    playerName,
    oppName,
    x,
    y,
    width,
    height,
    bordersize,
    cardimg,
    chiefimg,
    clickaction
  ) {
    this.columns = columns;
    this.playerName = playerName;
    this.oppName = oppName;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bordersize = bordersize;
    this.cardimg = cardimg;
    this.chiefimg = chiefimg;
    this.clickaction = clickaction;
    /// precomputed
    this.cardx = this.cardimg.width / 2;
    this.cardy = this.cardimg.height;
    this.colsize = this.width / (this.columns.length);
    this.rowsize = (this.height - Board.headery) / 2;
    this.cardsize = this.colsize / 3;
    this.clickCard = null;
  }

  update(columns) {
    this.columns = columns;
  }

  draw() {
    /*image(
      this.backimg,
      this.x - this.bordersize,
      this.y - this.bordersize,
      this.width + this.bordersize * 2,
      this.height + this.bordersize * 2
    );*/
    stroke(255, 255, 255);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(20);
    strokeWeight(5);
    line(
      this.x + 130,
      this.y + Board.headery + this.rowsize,
      this.x + this.width,
      this.y + Board.headery + this.rowsize
    );
    line(this.x + 650, this.y, this.x + 650, this.y + this.height);
    line(
      this.x + 855,
      this.y + Board.headery + this.rowsize,
      this.x + this.width + 75,
      this.y + Board.headery + this.rowsize
    );
    line(this.x + 855, this.y, this.x + 855, this.y + this.height);
    strokeWeight(0);
    /*text(
      this.oppName,
      this.x,
      this.y + Board.headery,
      this.colsize,
      this.rowsize
    );
    text(
      this.playerName,
      this.x,
      this.y + Board.headery + this.rowsize,
      this.colsize,
      this.rowsize
    );*/
    for (let column of this.columns) {
      if(column.position != 5){
        strokeWeight(5);
        stroke(255, 255, 255);
        line(
          this.x + column.position * this.colsize,
          this.y,
          this.x + column.position * this.colsize,
          this.y + this.height
        );
        strokeWeight(0);
        if (column.posPlayer) {
          let cardX = this.x + column.position * this.colsize + 65;
          let cardY = this.y + Board.headery + this.rowsize + (this.rowsize + 10) / 2;
          for (let card of GameInfo.cardsInBoard) {
            if (card.ugb_crd_id == column.posPlayer) {
              //console.log(card.ugb_crd_id);
              //console.log(GameInfo.selectedCards[0]);
              if (card.crd_state_id == 5) tint(255, 0, 0, 255);
              if(card.ugc_crd_active == false){
                tint(255, 90);
              }

              if(GameInfo.cardattack == true){
                if (GameInfo.selectedCards.length >= 1){
                  if(card.ugc_crd_active == true){
                    if (GameInfo.selectedCards[0].ugc_id == card.ugb_crd_id /*|| GameInfo.selectedCards[1].ugc_id == card.ugb_crd_id*/){
                      tint(0, 255, 0, 255);
                    }
                  }
                }
              }

              image(this.cardimg, cardX, cardY, 120, 190);
              //noTint();
              textAlign(CENTER, CENTER);
              fill(255);
              textStyle(BOLD);
              textSize(15);
              stroke(0);
              strokeWeight(2);
              text(card.ugc_crd_cost, cardX - 49, cardY - 80);
              text(card.ugc_crd_damage, cardX - 49, cardY + 80);
              text(card.ugc_crd_health, cardX + 49, cardY + 80);
              strokeWeight(1);
              noStroke();
              textSize(13);
              text(card.ugc_crd_name, cardX, cardY + 10);
              textSize(10);
              textAlign(CENTER, TOP);
              text(card.ugc_crd_gang, cardX, cardY + 20);
              fill(0);
              textStyle(NORMAL);
              noTint();
            }
          }
        }
        if (column.posOpponent) {
          let cardX = this.x + column.position * this.colsize + 65;
          let cardY = this.y + Board.headery + (this.rowsize - this.cardsize + 30) / 2;
          for (let card of GameInfo.cardsInBoard) {
            if (card.ugb_crd_id == column.posOpponent) {
              if (card.crd_state_id == 5) tint(255, 0, 0, 255);
              if(GameInfo.cardattack == true){
                if (GameInfo.selectedCards.length === 2){
                  if (GameInfo.selectedCards[0].ugc_id == card.ugb_crd_id || GameInfo.selectedCards[1].ugc_id == card.ugb_crd_id ){
                    tint(0, 255, 0, 255);
                  }
                }
              }
              image(this.cardimg, cardX, cardY, 120, 190);
              noTint();
              textAlign(CENTER, CENTER);
              fill(255);
              textStyle(BOLD);
              textSize(15);
              stroke(0);
              strokeWeight(2);
              text(card.ugc_crd_cost, cardX - 49, cardY - 80);
              text(card.ugc_crd_damage, cardX - 49, cardY + 80);
              text(card.ugc_crd_health, cardX + 49, cardY + 80);
              strokeWeight(1);
              noStroke();
              textSize(13);
              text(card.ugc_crd_name, cardX, cardY + 10);
              textSize(10);
              textAlign(CENTER, TOP);
              text(card.ugc_crd_gang, cardX, cardY + 20);
              fill(0);
              textStyle(NORMAL);
              noTint();
            }
          }
        }
      }else{
        strokeWeight(5);
        stroke(255, 255, 255);
        line(
          this.x + column.position * this.colsize + 75,
          this.y,
          this.x + column.position * this.colsize + 75,
          this.y + this.height
        );
        strokeWeight(0);
        if (column.posPlayer) {
          let cardX = this.x + column.position * this.colsize + 140;
          let cardY = this.y + Board.headery + this.rowsize + (this.rowsize + 10) / 2;
          for (let card of GameInfo.cardsInBoard) {
            if (card.ugb_crd_id == column.posPlayer) {
              if (card.crd_state_id == 5) tint(255, 0, 0, 255);

              /*if (GameInfo.selectedCards.length === 2){
                if(card.ugc_crd_active == true){
                  if (GameInfo.selectedCards[1].ugc_id == card.ugb_crd_id){
                    tint(0, 255, 0, 255);
                  }
                }
              }*/
              //if(card.ugc_crd_image){
                //let cardimage = loadImage(card.ugc_crd_image);
                //image(this.chiefimg, cardX, cardY - 190 / 4, 120, 190);
              //}
              image(this.chiefimg, cardX, cardY, 120, 190);
              noTint();
              textAlign(CENTER, CENTER);
              fill(255);
              textStyle(BOLD);
              textSize(15);
              stroke(0);
              strokeWeight(2);
              text(card.ugc_crd_health, cardX, cardY + 85);
              strokeWeight(1);
              noStroke();
              textSize(13);
              text(card.ugc_crd_name, cardX, cardY + 10);
              textSize(10);
              textAlign(CENTER, TOP);
              text(card.ugc_crd_gang, cardX, cardY + 20);
              fill(0);
              textStyle(NORMAL);
              noTint();
            }
          }
        }
        if (column.posOpponent) {
          let cardX = this.x + column.position * this.colsize + 140;
          let cardY = this.y + Board.headery + (this.rowsize - this.cardsize + 30) / 2;
          for (let card of GameInfo.cardsInBoard) {
            if (card.ugb_crd_id == column.posOpponent) {
              if (card.crd_state_id == 5) tint(255, 0, 0, 255);

              if(GameInfo.cardattack == true){
                if (GameInfo.selectedCards.length === 2){
                  if (GameInfo.selectedCards[1].ugc_id == card.ugb_crd_id ){
                    tint(0, 255, 0, 255);
                  }
                }
              }

              //if(card.ugc_crd_image){
               // let cardimage = loadImage(card.ugc_crd_image);
              //  image(cardimage, cardX, cardY, 120, 190);
              //}

              image(this.chiefimg, cardX, cardY, 120, 190);
              noTint();
              textAlign(CENTER, CENTER);
              fill(255);
              textStyle(BOLD);
              textSize(15);
              stroke(0);
              strokeWeight(2);
              text(card.ugc_crd_health, cardX, cardY + 85);
              strokeWeight(1);
              noStroke();
              textSize(13);
              text(card.ugc_crd_name, cardX, cardY + 10);
              textSize(10);
              textAlign(CENTER, TOP);
              text(card.ugc_crd_gang, cardX, cardY + 20);
              fill(0);
              textStyle(NORMAL);
              noTint();
            }
          }
        }
      }
    }
  }

  click() {
    if (this.clickaction) {
      if (
        mouseY > 100 &&
        mouseY < this.y + this.height &&
        mouseX > this.x + this.colsize &&
        mouseX < this.x + this.width
      ) {
        this.clickaction(mouseX, mouseY);
      }else if(
        mouseY > 100 &&
        mouseY < this.y + this.height &&
        mouseX > this.x + 5 * this.colsize + 75 &&
        mouseX < this.x + 855
      ) {
        this.clickaction(mouseX, mouseY);
      }
    }
  }

  getPlayerColumnAt(x, y) {
    if (
      y > this.y + Board.headery + this.rowsize &&
      y < this.y + this.height &&
      x > this.x + this.colsize &&
      x < this.x + this.width
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 1;
      let column = this.columns[pos];
      return column.position;
    } else {
      return false;
    }
  }

  getCardAt(x, y) {
    /*
    this.x + column.position * this.colsize + 75,
    this.y,
    this.x + column.position * this.colsize + 75,
    this.y + this.height

    mouseY > 100 &&
    mouseY < this.y + this.height &&
    mouseX > this.x + 5 * this.colsize + 75 &&
    mouseX < this.x + 855
    */  

    //remake the if
    if (
      y > this.y + Board.headery + this.rowsize &&
      y < this.y + this.height &&
      x > this.x + this.colsize &&
      x < this.x + this.width
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 1;
      let cardpress = this.columns[pos];

      for (let column of this.columns) {
        if (column.posPlayer == cardpress.posPlayer) {
          for (let card of GameInfo.cardsInBoard) {
            if (card.ugb_crd_id == cardpress.posPlayer) {
              return card;
            }
          }
        }
      }
      //return column.posPlayer;
    } 
    else if (
      y > this.y + Board.headery + this.rowsize &&
      y < this.y + this.height &&
      x > this.x + 5 * this.colsize + 75 &&
      x < this.x + 855
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 2;
      let cardpress = this.columns[pos];

      for (let column of this.columns) {
        if (column.posPlayer == cardpress.posPlayer) {
          for (let card of GameInfo.cardsInBoard) {
            if (card.ugb_crd_id == cardpress.posPlayer) {
              return card;
            }
          }
        }
      }
      //return column.posPlayer;
    }
    else if (
      y > this.y + Board.headery &&
      y < this.y + Board.headery + this.rowsize &&
      x > this.x + this.colsize &&
      x < this.x + this.width
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 1;
      let cardpress = this.columns[pos];

      for (let column of this.columns) {
        if (column.posOpponent == cardpress.posOpponent) {
          for (let card of GameInfo.cardsInBoard) {
            if (card.ugb_crd_id == cardpress.posOpponent) {
              return card;
            }
          }
        }
      }
      //return column.posOpponent;
    }
    else if (
      y > this.y + Board.headery &&
      y < this.y + Board.headery + this.rowsize &&
      x > this.x + 5 * this.colsize + 75 &&
      x < this.x + 855
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 2;
      let cardpress = this.columns[pos];

      for (let column of this.columns) {
        if (column.posOpponent == cardpress.posOpponent) {
          for (let card of GameInfo.cardsInBoard) {
            if (card.ugb_crd_id == cardpress.posOpponent) {
              return card;
            }
          }
        }
      }
      //return column.posOpponent;
    }
  }
}
