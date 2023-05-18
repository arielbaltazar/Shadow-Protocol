class Card {
  static width = 120; //210
  static height = 190; //315
  constructor(card, x, y, img) {
    this.card = card;
    this.x = x;
    this.y = y;
    this.img = img;

    this.dragging = false;
    this.offsety = 0;
    this.offsetx = 0;
    this.dragx = 0;
    this.dragy = 0;
    this.selected = false;
  }

  draw() {
    image(this.img, this.x, this.y, Card.width, Card.height);

    textAlign(CENTER, CENTER);
    fill(255);
    textStyle(BOLD);
    textSize(15);
    stroke(0);
    strokeWeight(2);
    text(
      this.card.ugc_crd_cost,
      this.x + Card.width * 0.905,
      this.y + Card.height * 0.065
    );
    text(
      this.card.ugc_crd_damage,
      this.x + Card.width * 0.2,
      this.y + Card.height * 0.85
    );
    text(
      this.card.ugc_crd_health,
      this.x + Card.width * 0.8,
      this.y + Card.height * 0.85
    );
    strokeWeight(1);
    noStroke();
    fill(0);
    textSize(13);
    text(
      this.card.ugc_crd_name,
      this.x + Card.width * 0.5,
      this.y + Card.height * 0.63
    );
    textSize(10);
    textAlign(CENTER, TOP);
    text(
      this.card.ugc_crd_gang,
      this.x + Card.width * 0.1,
      this.y + Card.height * 0.68,
      Card.width * 0.8,
      Card.height * 0.1
    );
    text(
      "Health",
      this.x + Card.width * 0.39,
      this.y + Card.height * 0.9,
      Card.width * 0.8,
      Card.height * 0.1
    );
    text(
      "Damage",
      this.x + Card.width * -0.19,
      this.y + Card.height * 0.9,
      Card.width * 0.8,
      Card.height * 0.1
    );
    textStyle(NORMAL);
    noTint();

    if (this.dragging) {
      tint(255, 100);
      image(this.img, this.dragx, this.dragy, Card.width, Card.height);
      tint(255, 255);
    }
  }
  /*click() {
    return (
      mouseX > this.x &&
      mouseX < this.x + Card.width &&
      mouseY > this.y &&
      mouseY < this.y + Card.height
    );
  }*/
  
}

class Deck {
  static titleHeight = 50;
  static nCards = 3;
  selectedCard = null;

  constructor(cardsInfo, x, y, clickAction, cardImg, dragAction) {
    this.x = x;
    this.y = y;
    this.width = Card.width * Deck.nCards;
    this.clickAction = clickAction;
    this.cardImg = cardImg;
    this.cards = this.createCards(cardsInfo);
    this.draggable = false;
    this.dragAction = dragAction;
    this.draggingCard = null;
  }

  createCards(cardsInfo) {
    let cards = [];
    let x = this.x;
    for (let cardInfo of cardsInfo) {
      cards.push(
        new Card(cardInfo, x, this.y + Deck.titleHeight, this.cardImg)
      );
      x += Card.width;
    }
    return cards;
  }

  update(cardsInfo) {
    this.cards = this.createCards(cardsInfo);
  }

  updateDrag() {
    //for (let card of this.cards) {
      if (this.draggingCard !== null) {
        this.draggingCard.dragx = mouseX + this.draggingCard.offsetX;
        this.draggingCard.dragy = mouseY + this.draggingCard.offsetY;
      }
    //}
  }

  draw() {
    fill(0);
    noStroke();
    textSize(28);
    textAlign(CENTER, CENTER);
    for (let card of this.cards) {
      card.draw();
    }
  }

  press() {
    if (!this.draggable) {
      return;
    }
    for (let card of this.cards) {
      if (this.draggable && mouseX > card.x && mouseX < card.x + Card.width && mouseY > card.y && mouseY < card.y + Card.height) {
        card.offsetX = card.x - mouseX;
        card.offsetY = card.y - mouseY;
        card.dragx = mouseX + card.offsetX;
        card.dragy = mouseY + card.offsetY;
        card.dragging = true;
        this.draggingCard = card;
      }
    }
  }

  release() {
    if (!this.draggable || this.draggingCard === null) {
      return;
    }
    this.draggingCard.dragging = false;
    if (this.dragAction) {
      this.dragAction(mouseX, mouseY, this.draggingCard.card);
    }
    this.draggingCard = null;
  }

/*click() {
    if (this.clickAction) {
      for (let card of this.cards) {
        if (card.click()) {
          this.clickAction(card.card);
        }
      }
    }
  }*/
  
}