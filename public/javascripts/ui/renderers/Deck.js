class Card {
  static width = 120;
  static height = 190;
  constructor(card, x, y, cimg, himg) {
    this.card = card;
    this.x = x;
    this.y = y;
    this.cimg = cimg;
    this.himg = himg;

    this.dragging = false;
    this.offsety = 0;
    this.offsetx = 0;
    this.dragx = 0;
    this.dragy = 0;
    this.selected = false;
  }

  draw() {
    if(this.card.ugc_user_game_id == GameInfo.game.opponents[0].id){
      image(this.cimg, this.x, this.y, Card.width, Card.height);
    }else if(this.card.ugc_crd_type_id == 4){
      image(this.himg, this.x, this.y, Card.width, Card.height);
      //if(this.card.ugc_crd_image){
        //image(this.card.ugc_crd_image, this.x, this.y - Card.height/4 , Card.width, Card.height);
      //}

      textAlign(CENTER, CENTER);
      fill(255);
      textStyle(BOLD);
      textSize(15);
      stroke(0);
      strokeWeight(2);
      text(
        this.card.ugc_crd_cost,
        this.x - 49,
        this.y - 80
      );
      strokeWeight(1);
      noStroke();
      textSize(13);
      text(
        this.card.ugc_crd_name,
        this.x,
        this.y + 10
      );
      textSize(10);
      textAlign(CENTER, TOP);
      text(
        this.card.ugc_crd_gang,
        this.x,
        this.y + 20
      );
      text(
        this.card.ugc_crd_info,
        this.x - 50,
        this.y + 45,
        100
      );
      textStyle(NORMAL);
      fill(0);
      noTint();

      if (this.dragging) {
        tint(255, 100);
        image(this.himg, this.dragx, this.dragy, Card.width, Card.height);
        tint(255, 255);
      }
    }else{
      image(this.cimg, this.x, this.y, Card.width, Card.height);

      textAlign(CENTER, CENTER);
      fill(255);
      textStyle(BOLD);
      textSize(15);
      stroke(0);
      strokeWeight(2);
      text(
        this.card.ugc_crd_cost,
        this.x - 49,
        this.y - 80
      );
      text(
        this.card.ugc_crd_damage,
        this.x - 49,
        this.y + 80
      );
      text(
        this.card.ugc_crd_health,
        this.x + 49,
        this.y + 80
      );
      strokeWeight(1);
      noStroke();
      textSize(13);
      text(
        this.card.ugc_crd_name,
        this.x,
        this.y + 10
      );
      textSize(10);
      textAlign(CENTER, TOP);
      text(
        this.card.ugc_crd_gang,
        this.x,
        this.y + 20
      );
      textStyle(NORMAL);
      fill(0);
      noTint();

      if (this.dragging) {
        tint(255, 100);
        image(this.cimg, this.dragx, this.dragy, Card.width, Card.height);
        tint(255, 255);
      }
    }
  }
}

class Deck {
  static titleHeight = 50;
  static nCards = 3;
  selectedCard = null;

  constructor(cardsInfo, x, y, clickAction, cardImg, hacksimg, dragAction) {
    this.x = x;
    this.y = y;
    this.width = Card.width * Deck.nCards;
    this.clickAction = clickAction;
    this.cardImg = cardImg;
    this.hacksimg = hacksimg;
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
        new Card(cardInfo, x, this.y + Deck.titleHeight, this.cardImg, this.hacksimg)
      );
      if (cardInfo.ugc_user_game_id == GameInfo.game.opponents[0].id){
        x -= Card.width;
      }else{
        x += Card.width;
      }
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

  //se houver problemas com o dragndrop ver isto aqui
  press() {
    if (!this.draggable) {
      return;
    }
     //add if for limit the drandrop
    for (let card of this.cards) {
      if (this.draggable && mouseX > card.x - Card.width / 2 && mouseX < card.x + Card.width / 2 && mouseY > card.y - Card.height / 2 && mouseY < card.y + Card.height / 2) {
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