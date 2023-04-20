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
    this.cardx = this.cardimg.width / 6;
    this.cardy = this.cardimg.height;
    this.colsize = this.width / (this.columns.length + 1);
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
      strokeWeight(5);
      line(
        this.x + column.position * this.colsize,
        this.y,
        this.x + column.position * this.colsize,
        this.y + this.height
      );
      strokeWeight(0);
      if (column.posPlayer) {
        image(
          this.cardimg,
          this.x + column.position * this.colsize + 120,
          this.y + Board.headery + this.rowsize + (this.rowsize - 190) / 2,
          120, //this.cardsize,
          190 //this.cardsize
        );
      }
      if (column.posOpponent) {
        image(
          this.cardimg,
          this.x + column.position * this.colsize + this.cardsize,
          this.y + Board.headery + (this.rowsize - this.cardsize) / 2,
          this.cardsize,
          this.cardsize
        );
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
    if (
      y > this.y + Board.headery + this.rowsize &&
      y < this.y + this.height &&
      x > this.x + this.colsize &&
      x < this.x + this.width
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 1;
      let column = this.columns[pos];
      return column.posPlayer;
    } else if (
      y > this.y + Board.headery &&
      y < this.y + Board.headery + this.rowsize &&
      x > this.x + this.colsize &&
      x < this.x + this.width
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 1;
      let column = this.columns[pos];
      return column.posOpponent;
    }
  }

  /*getPlayerCardAt(x, y) {
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
  }

  getOppCardAt(x, y) {
    if (
      y > this.y + Board.headery &&
      y < this.y + Board.headery + this.rowsize &&
      x > this.x + this.colsize &&
      x < this.x + this.width
    ) {
      let pos = Math.floor((x - this.x) / this.colsize) - 1;
      let column = this.columns[pos];
      return column.posOpponent;
    }
  }*/
}
