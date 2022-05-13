"use strict";

// Button text
const play = document.querySelector(".play");
play.textContent = "PLAY";
const reset = document.querySelector(".reset");
reset.textContent = "RESET";

// - Make a 52 card deck
const suits = ["club", "diamond", "heart", "spade"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// creates a dec of cards from variables
let deck = [];
const getDeck = () => {
  for (let i = 0; i < suits.length; ++i) {
    for (let j = 0; j < values.length; ++j) {
      let card = { value: values[j], suit: suits[i] };
      deck.push(card);
    }
  }
  return deck;
};

// - Shuffle the deck
const shuffle = (deck) => {
  // for 1000 turns
  // switch the values of two random cards
  for (let i = 0; i < 1000; ++i) {
    let location1 = Math.trunc(Math.random() * deck.length);
    let location2 = Math.trunc(Math.random() * deck.length);
    let holding = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = holding;
  }
};

//get deck of cards
getDeck();
shuffle(deck);

// Decide to split deck or give each player a full deck and remove randomly pulled card from both decks
let playerDeck;
let computerDeck;
let currentCard;
let playing = true;

// - Split the deck into 26 cards.
const dealDecks = () => {
  playerDeck = deck.slice(0, 26);
  computerDeck = deck.slice(26);
};

dealDecks();

// play card flip sound
const playFlip = () => {
  new Audio("./sound/Card-flip-sound-effect.mp3").play();
};

// - Flip cards
const flipCards = (card) => {
  playFlip();
  const playerCard = playerDeck[card];
  const computerCard = computerDeck[card];

  // declare elements
  const playerCardShow = document.querySelector(".player-card");
  const computerCardShow = document.querySelector(".computer-card");
  const playerImg = document.createElement("img");
  const computerImg = document.createElement("img");

  // add classes to images
  playerImg.className = "player-img";
  computerImg.className = "computer-img";

  // link images
  playerImg.src = `./images/${playerCard.suit}-${playerCard.value}.png`;
  computerImg.src = `./images/${computerCard.suit}-${computerCard.value}.png`;

  // show card in page
  playerCardShow.appendChild(playerImg);
  computerCardShow.appendChild(computerImg);
};

//remove cards from both decks
const removeCards = () => {
  const show = playerDeck.shift();
  const show2 = computerDeck.shift();
  console.log(show);
  console.log(show2);
};

// put cards back in winners deck in random position
const placeWinnerCards = (winnerDeck, numOfCards) => {
  const random = Math.trunc(Math.random() * winnerDeck.length - 1) + 1;
  for (let i = 0; i < numOfCards / 2; ++i) {
    winnerDeck.splice(random, 0, playerDeck[0]);
    winnerDeck.splice(random, 0, computerDeck[0]);
    removeCards();
    console.log(playerDeck);
    console.log(computerDeck);
  }
};

// changes number shown on deck
const deckNumberChange = () => {
  //declare elements
  const playerDeckNum = document.querySelector(".player-deck-number");
  const computerDeckNum = document.querySelector(".computer-deck-number");

  playerDeckNum.textContent = playerDeck.length;
  computerDeckNum.textContent = computerDeck.length;
};

// what to do when player wins
const playerWins = (cardNum) => {
  const text = document.querySelector(".text");
  text.textContent = "Player Wins";
  placeWinnerCards(playerDeck, cardNum);
  deckNumberChange();
};

// what to do when computer wins
const computerWins = (cardNum) => {
  const text = document.querySelector(".text");
  text.textContent = "Computer Wins";
  placeWinnerCards(computerDeck, cardNum);
  deckNumberChange();
};

// clear board
const clear = () => {
  const playerCardImg = document.querySelector(".player-card img");
  const computerCardImg = document.querySelector(".computer-card img");

  playerCardImg.remove();
  computerCardImg.remove();
};

// what happens when there's a tie
const tie = () => {
  const text = document.querySelector(".text");
  let tieCount = 0;

  let cardNum = tieCount * 4;

  // while tied four more cards per player added to stack
  let playerCard = playerDeck[cardNum];
  let computerCard = computerDeck[cardNum];

  while (
    playerCard.value === computerCard.value &&
    (playerDeck.length >= cardNum || computerDeck.length >= cardNum)
  ) {
    clear();
    ++tieCount;
    cardNum = tieCount * 4;
    playerCard = playerDeck[cardNum];
    computerCard = computerDeck[cardNum];

    // if player runs out of cards
    if (computerCard === undefined) {
      text.textContent = "Player Wins";
      playing = false;
    } else if (playerCard === undefined) {
      text.textContent = "Computer Wins";
      playing = false;
    }
    flipCards(cardNum);
  }

  // player deck has less than 4 cards player looses
  if (playerDeck.length < 4) {
    text.textContent = "Computer Wins";
    playing = false;
    // break;

    // computer deck has less than 4 cards computer looses
  } else if (computerDeck.length < 4) {
    text.textContent = "Player Wins";
    playing = false;
    // break;

    // player has higher card player wins
  } else if (playerCard.value > computerCard.value) {
    const playerWinsNum = tieCount * 8;
    clear();
    flipCards(cardNum);
    playerWins(playerWinsNum);
    // break;

    // computer has higher card computer wins
  } else if (computerCard.value > playerCard.value) {
    const computerWinsNum = tieCount * 8;
    clear();
    flipCards(cardNum);
    computerWins(computerWinsNum);
    // break;
  }
};

// highest card wins
const winner = () => {
  // declare elements
  const text = document.querySelector(".text");

  // declare variables
  const playerCard = playerDeck[0];
  const computerCard = computerDeck[0];

  // if deck length = 0
  if (computerDeck.length === 0) {
    text.textContent = "Player Wins";
    playing = false;
  } else if (playerDeck.length === 0) {
    text.textContent = "Computer Wins";
    playing = false;
  } else if (playerCard.value > computerCard.value) {
    playerWins(2);
  } else if (computerCard.value > playerCard.value) {
    computerWins(2);
  } else {
    // in event of a tie add 4 cards from each player continue until there is not a tie
    // declare elements
    const warBtn = document.createElement("button");

    // clear text
    if (text.innerHTML !== "") {
      text.removeChild(text.firstChild);
    }

    // add class name
    warBtn.className = "war-button";

    // append war button
    text.appendChild(warBtn);

    // add text
    warBtn.textContent = "I Declare War!!!";

    // add button functionality
    warBtn.addEventListener("click", tie);
  }
};

const resetFunc = () => {
  clear();
  getDeck();
  shuffle(deck);
};

const playBtn = document.querySelector(".play");
const resetBtn = document.querySelector(".reset");

playBtn.addEventListener("click", function () {
  // declare elements
  const playerCard = document.querySelector(".player-card");
  const img = playerCard.innerHTML;
  const warBtn = document.querySelector(".war-button");

  // if war button doesn't exist
  if (typeof warBtn === "object" && warBtn === null) {
    // as long as we are playing
    if (playing === true && img !== "") {
      clear();
      flipCards(0);
      winner();
    } else if (playing === true) {
      // if there are no cards on the board
      flipCards(0);
      winner();
    }
  }
});

resetBtn.addEventListener("click", function () {
  // declare elements
  const deckNum = document.querySelectorAll(".deck-number");
  const text = document.querySelector(".text");
  const playerCard = document.querySelector(".player-card");
  const result = playerCard.innerHTML;
  // played card area isn't blank
  if (result !== "") {
    clear();
    deck = [];
    getDeck();
    shuffle(deck);
    dealDecks();
    deckNum.forEach((num) => {
      num.textContent = 26;
      playing = true;
    });
    text.textContent = "";
  } else {
    deck = [];
    getDeck();
    shuffle(deck);
    dealDecks();
    deckNum.forEach((num) => {
      num.textContent = 26;
    });
    text.textContent = "";
    playing = true;
  }
});
