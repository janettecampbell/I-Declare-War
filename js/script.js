"use strict";

// declare elements
const playerCardShow = document.querySelector(".player-card");
const computerCardShow = document.querySelector(".computer-card");
const playerImg = document.createElement("img");
const computerImg = document.createElement("img");
const play = document.querySelector(".play");
const reset = document.querySelector(".reset");
const text = document.querySelector(".text");
const warBtn = document.createElement("button");
const deckNum = document.querySelectorAll(".deck-number");
const playerDeckNum = document.querySelector(".player-deck-number");
const computerDeckNum = document.querySelector(".computer-deck-number");

// declare variables
let playerDeck;
let computerDeck;
let currentCard;
let playing = true;

// Button text
play.textContent = "PLAY";
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
const shuffle = (deck1) => {
  // for 1000 turns
  // switch the values of two random cards
  for (let i = 0; i < 1000; ++i) {
    let location1 = Math.trunc(Math.random() * deck1.length);
    let location2 = Math.trunc(Math.random() * deck1.length);
    let holding = deck1[location1];

    deck1[location1] = deck1[location2];
    deck1[location2] = holding;
  }
};

// - Split the deck into 26 cards.
const dealDecks = () => {
  playerDeck = deck.slice(0, 26);
  computerDeck = deck.slice(26);
};

//get and deal deck of cards
const deckPrep = () => {
  getDeck();
  shuffle(deck);
  dealDecks();
};
deckPrep();

// Flip cards in position of 'card'
const flipCards = (card) => {
  // add flip sound
  new Audio("./sound/Card-flip-sound-effect.mp3").play();

  // select card from deck
  const playerCard = playerDeck[card];
  const computerCard = computerDeck[card];

  // add classes to images
  playerImg.className = "player-img";
  computerImg.className = "computer-img";

  // link images
  playerImg.src = `./images/${playerCard.suit}-${playerCard.value}.png`;
  computerImg.src = `./images/${computerCard.suit}-${computerCard.value}.png`;

  // show card image in page
  playerCardShow.appendChild(playerImg);
  computerCardShow.appendChild(computerImg);
};

// put cards back in winners deck in random position
const placeWinnerCards = (winnerDeck, numOfCards) => {
  const random = Math.trunc(Math.random() * winnerDeck.length - 1) + 1;
  for (let i = 0; i < numOfCards / 2; ++i) {
    winnerDeck.splice(random, 0, playerDeck[0]);
    winnerDeck.splice(random, 0, computerDeck[0]);
    playerDeck.shift();
    computerDeck.shift();
  }
};

// changes number shown on deck
const deckNumberChange = () => {
  //declare elements

  playerDeckNum.textContent = playerDeck.length;
  computerDeckNum.textContent = computerDeck.length;
};

// what to do when player wins
const playerWins = (cardNum) => {
  text.textContent = "Player Wins";
  placeWinnerCards(playerDeck, cardNum);
  deckNumberChange();
};

// what to do when computer wins
const computerWins = (cardNum) => {
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

// when reset button is clicked
const resetFunc = () => {
  // declare elements
  const result = playerCardShow.innerHTML;

  // if played card area isn't blank
  if (result !== "") {
    clear();
    deck = [];
    deckPrep();
    deckNum.forEach((num) => {
      num.textContent = 26;
      playing = true;
    });
    text.textContent = "";
    // if played card area is blank
  } else {
    deck = [];
    deckPrep();
    deckNum.forEach((num) => {
      num.textContent = 26;
    });
    text.textContent = "";
    playing = true;
  }
};

// when play button is clicked
const playFunc = () => {
  // declare elements
  const playerCard = document.querySelector(".player-card");
  const img = playerCard.innerHTML;
  const warBtnSelect = document.querySelector(".war-button");

  // if war button doesn't exist
  if (typeof warBtnSelect === "object" && warBtnSelect === null) {
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
};

play.addEventListener("click", playFunc);
reset.addEventListener("click", resetFunc);
