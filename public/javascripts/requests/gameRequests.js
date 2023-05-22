// Actions
async function requestEndTurn() {
  try {
    const response = await fetch(`/api/plays/endturn`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });
    return { successful: response.status == 200 };
  } catch (err) {
    // Treat 500 errors here
    console.log(err);
    return { err: err };
  }
}

async function requestChooseDeck(deckid) {
  try {
    const response = await fetch(`/api/plays/deck/choosedeck`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        deckid: deckid,
      }),
    });
    var result = deckid;
    return { successful: response.status == 200, deckid: result };
  } catch (err) {
    // Treat 500 errors here
    console.log(err);
    return { err: err };
  }
}

async function requestDeckChoosen() {
  try {
    const response = await fetch(`/api/decks/ChoosenDeck`);
    let result = await response.json();
    return {
      successful: response.status == 200,
      unauthenticated: response.status == 401,
      deck: result
    };
  } catch (err) {
    // Treat 500 errors here
    console.log(err);
    return { err: err };
  }
}

async function requestCloseScore() {
  try {
    const response = await fetch(`/api/scores/auth/close`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });
    return { successful: response.status == 200 };
  } catch (err) {
    // Treat 500 errors here
    console.log(err);
    return { err: err };
  }
}

async function requestBoardInfo() {
  try {
    const response = await fetch(`/api/board`);
    let result = await response.json();
    return {
      successful: response.status == 200,
      unauthenticated: response.status == 401,
      board: result,
    };
  } catch (err) {
    // Treat 500 errors here
    console.log(err);
    return { err: err };
  }
}

async function requestCardsInBoard() {
  try {
    const response = await fetch(`/api/board/in-board`);
    let result = await response.json();
    return {
      successful: response.status == 200,
      unauthenticated: response.status == 401,
      result: result,
    };
  } catch (err) {
    // Treat 500 errors here
    console.log(err);
    return { err: err };
  }
}

async function requestBenchInfo() {
  try {
    const response = await fetch(`/api/bench`);
    let result = await response.json();
    return {
      successful: response.status == 200,
      unauthenticated: response.status == 401,
      bench: result,
    };
  } catch (err) {
    // Treat 500 errors here
    console.log(err);
    return { err: err };
  }
}

async function requestCardsInBench() {
  try {
    const response = await fetch(`/api/bench/in-bench`);
    let result = await response.json();
    return {
      successful: response.status == 200,
      unauthenticated: response.status == 401,
      result: result,
    };
  } catch (err) {
    // Treat 500 errors here
    console.log(err);
    return { err: err };
  }
}

async function requestPlayCardFromHandToBench(CardId, Position) {
  try {
    const response = await fetch(`/api/decks/playfromhandtobench`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        cardid: CardId,
        position: Position,
      }),
    });
    let result = await response.json();
    return { successful: response.status == 200, msg: result.msg };
  } catch (err) {
    // Treat 500 errors here
    console.log(err);
    return { err: err };
  }
}

async function requestPlayCardFromBenchToBoard(CardId, Position) {
  try {
    const response = await fetch(`/api/decks/playfrombenchtoboard`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        cardid: CardId,
        position: Position,
      }),
    });
    let result = await response.json();
    return { successful: response.status == 200, msg: result.msg };
  } catch (err) {
    // Treat 500 errors here
    console.log(err);
    return { err: err };
  }
}

async function requestAttackCard(PlayerCard, OppCard) {
  try {
    const response = await fetch(`/api/decks/attack`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        playercrd: PlayerCard,
        oppcrd: OppCard,
      }),
    });
    let result = await response.json();
    return { successful: response.status == 200, msg: result.msg };
  } catch (err) {
    // Treat 500 errors here
    console.log(err);
    return { err: err };
  }
}
