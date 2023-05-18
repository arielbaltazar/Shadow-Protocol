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
    backimg,
    cardimg,
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
    this.backimg = backimg;
    this.cardimg = cardimg;
    this.clickaction = clickaction;
    /// precomputed
    this.cardx = this.cardimg.width / 2;
    this.cardy = this.cardimg.height;
    this.colsize = this.width / (this.columns.length);
    this.rowsize = (this.height - Board.headery) / 2;
    this.cardsize = this.colsize / 3;
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
    stroke(100, 200, 100);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(20);
    strokeWeight(5);
    line(
      this.x,
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
    text(
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
    );
    for (let column of this.columns) {
      if(column.position != 5){
        strokeWeight(5);
        stroke(100, 200, 100);
        line(
          this.x + column.position * this.colsize,
          this.y,
          this.x + column.position * this.colsize,
          this.y + this.height
        );
        strokeWeight(0);
        if (column.posPlayer) {
          let cardX = this.x + column.position * this.colsize + 5;
          let cardY = this.y + Board.headery + this.rowsize + (this.rowsize - 180) / 2;
          for (let card of GameInfo.cardsInBoard) {
            if (card.ugb_crd_id == column.posPlayer) {
              if (card.crd_state_id == 4) tint(255, 0, 0, 255);

              image(
                this.cardimg,
                cardX,
                cardY,
                120, //this.cardsize,
                180 //this.cardsize
              );
              noTint();
              textAlign(CENTER, CENTER);
              fill(255);
              textStyle(BOLD);
              textSize(15);
              stroke(0);
              strokeWeight(2);
              text(card.ugc_crd_cost, cardX + 120 * 0.905, cardY + 180 * 0.065);
              text(card.ugc_crd_damage, cardX + 120 * 0.2, cardY + 180 * 0.85);
              text(card.ugc_crd_health, cardX + 120 * 0.8, cardY + 180 * 0.85);
              strokeWeight(1);
              noStroke();
              fill(0);
              textSize(13);
              text(card.ugc_crd_name, cardX + 120 * 0.5, cardY + 180 * 0.63);
              textSize(10);
              textAlign(CENTER, TOP);
              text(
                card.ugc_crd_gang,
                cardX + 120 * 0.1,
                cardY + 180 * 0.68,
                120 * 0.8,
                180 * 0.1
              );
              text(
                "Health",
                cardX + 120 * 0.39,
                cardY + 180 * 0.9,
                120 * 0.8,
                180 * 0.1
              );
              text(
                "Damage",
                cardX + 120 * -0.19,
                cardY + 180 * 0.9,
                120 * 0.8,
                180 * 0.1
              );
              textStyle(NORMAL);
              noTint();
            }
          }
        }
        if (column.posOpponent) {
          let cardX = this.x + column.position * this.colsize + 5;
          let cardY = this.y + Board.headery + (this.rowsize - this.cardsize - 170) / 2;
          for (let card of GameInfo.cardsInBoard) {
            if (card.ugb_crd_id == column.posOpponent) {
              if (card.crd_state_id == 4) tint(255, 0, 0, 255);

              image(
                this.cardimg,
                cardX,
                cardY,
                120, //this.cardsize,
                180 //this.cardsize
              );
              noTint();
              textAlign(CENTER, CENTER);
              fill(255);
              textStyle(BOLD);
              textSize(15);
              stroke(0);
              strokeWeight(2);
              text(card.ugc_crd_cost, cardX + 120 * 0.905, cardY + 180 * 0.065);
              text(card.ugc_crd_damage, cardX + 120 * 0.2, cardY + 180 * 0.85);
              text(card.ugc_crd_health, cardX + 120 * 0.8, cardY + 180 * 0.85);
              strokeWeight(1);
              noStroke();
              fill(0);
              textSize(13);
              text(card.ugc_crd_name, cardX + 120 * 0.5, cardY + 180 * 0.63);
              textSize(10);
              textAlign(CENTER, TOP);
              text(
                card.ugc_crd_gang,
                cardX + 120 * 0.1,
                cardY + 180 * 0.68,
                120 * 0.8,
                180 * 0.1
              );
              text(
                "Health",
                cardX + 120 * 0.39,
                cardY + 180 * 0.9,
                120 * 0.8,
                180 * 0.1
              );
              text(
                "Damage",
                cardX + 120 * -0.19,
                cardY + 180 * 0.9,
                120 * 0.8,
                180 * 0.1
              );
              textStyle(NORMAL);
              noTint();
            }
          }
        }
      }else{
        strokeWeight(5);
        stroke(100, 200, 100);
        line(
          this.x + column.position * this.colsize + 75,
          this.y,
          this.x + column.position * this.colsize + 75,
          this.y + this.height
        );
        strokeWeight(0);
        if (column.posPlayer) {
          let cardX = this.x + column.position * this.colsize + 80;
          let cardY = this.y + Board.headery + this.rowsize + (this.rowsize - 180) / 2;
          for (let card of GameInfo.cardsInBoard) {
            if (card.ugb_crd_id == column.posPlayer) {
              if (card.crd_state_id == 4) tint(255, 0, 0, 255);

              image(
                this.cardimg,
                cardX,
                cardY,
                120, //this.cardsize,
                180 //this.cardsize
              );
              noTint();
              textAlign(CENTER, CENTER);
              fill(255);
              textStyle(BOLD);
              textSize(15);
              stroke(0);
              strokeWeight(2);
              text(card.ugc_crd_cost, cardX + 120 * 0.905, cardY + 180 * 0.065);
              text(card.ugc_crd_damage, cardX + 120 * 0.2, cardY + 180 * 0.85);
              text(card.ugc_crd_health, cardX + 120 * 0.8, cardY + 180 * 0.85);
              strokeWeight(1);
              noStroke();
              fill(0);
              textSize(13);
              text(card.ugc_crd_name, cardX + 120 * 0.5, cardY + 180 * 0.63);
              textSize(10);
              textAlign(CENTER, TOP);
              text(
                card.ugc_crd_gang,
                cardX + 120 * 0.1,
                cardY + 180 * 0.68,
                120 * 0.8,
                180 * 0.1
              );
              text(
                "Health",
                cardX + 120 * 0.39,
                cardY + 180 * 0.9,
                120 * 0.8,
                180 * 0.1
              );
              text(
                "Damage",
                cardX + 120 * -0.19,
                cardY + 180 * 0.9,
                120 * 0.8,
                180 * 0.1
              );
              textStyle(NORMAL);
              noTint();
            }
          }
        }
        if (column.posOpponent) {
          let cardX = this.x + column.position * this.colsize + 80;
          let cardY = this.y + Board.headery + (this.rowsize - this.cardsize - 170) / 2;
          for (let card of GameInfo.cardsInBoard) {
            if (card.ugb_crd_id == column.posOpponent) {
              if (card.crd_state_id == 4) tint(255, 0, 0, 255);

              image(
                this.cardimg,
                cardX,
                cardY,
                120, //this.cardsize,
                180 //this.cardsize
              );
              noTint();
              textAlign(CENTER, CENTER);
              fill(255);
              textStyle(BOLD);
              textSize(15);
              stroke(0);
              strokeWeight(2);
              text(card.ugc_crd_cost, cardX + 120 * 0.905, cardY + 180 * 0.065);
              text(card.ugc_crd_damage, cardX + 120 * 0.2, cardY + 180 * 0.85);
              text(card.ugc_crd_health, cardX + 120 * 0.8, cardY + 180 * 0.85);
              strokeWeight(1);
              noStroke();
              fill(0);
              textSize(13);
              text(card.ugc_crd_name, cardX + 120 * 0.5, cardY + 180 * 0.63);
              textSize(10);
              textAlign(CENTER, TOP);
              text(
                card.ugc_crd_gang,
                cardX + 120 * 0.1,
                cardY + 180 * 0.68,
                120 * 0.8,
                180 * 0.1
              );
              text(
                "Health",
                cardX + 120 * 0.39,
                cardY + 180 * 0.9,
                120 * 0.8,
                180 * 0.1
              );
              text(
                "Damage",
                cardX + 120 * -0.19,
                cardY + 180 * 0.9,
                120 * 0.8,
                180 * 0.1
              );
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

    if (
      y > this.y + Board.headery + this.rowsize &&
      y < this.y + this.height &&
      x > this.x + this.colsize &&
      x < this.x + this.width
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 1;
      let column = this.columns[pos];
      return column.posPlayer;
    } 
    else if (
      y > this.y + Board.headery + this.rowsize &&
      y < this.y + this.height &&
      x > this.x + 5 * this.colsize + 75 &&
      x < this.x + 855
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 2;
      let column = this.columns[pos];
      return column.posPlayer;
    }
    else if (
      y > this.y + Board.headery &&
      y < this.y + Board.headery + this.rowsize &&
      x > this.x + this.colsize &&
      x < this.x + this.width
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 1;
      let column = this.columns[pos];
      return column.posOpponent;
    }
    else if (
      y > this.y + Board.headery &&
      y < this.y + Board.headery + this.rowsize &&
      x > this.x + 5 * this.colsize + 75 &&
      x < this.x + 855
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 2;
      let column = this.columns[pos];
      return column.posOpponent;
    }
  }
}
