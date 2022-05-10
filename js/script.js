"use strict";

// Button text
const play = document.querySelector(".play");
play.textContent = "PLAY";

// - Make a 52 card deck
const suits = ["club", "diamond", "heart", "spade"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
];

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
console.log(deck);
// Decide to split deck or give each player a full deck and remove randomly pulled card from both decks
let playerDeck;
let computerDeck;
let currentCard;
const playing = true;

// - Split the deck into 26 cards.
const dealDecks = () => {
  playerDeck = deck.slice(0, 26);
  computerDeck = deck.slice(26);
};

dealDecks();
console.log(playerDeck);
console.log(computerDeck);

// - Flip cards
const flipCards = (card) => {
  const playerCard = playerDeck[card];
  const computerCard = computerDeck[card];

  // declare elements
  const playerCardShow = document.querySelector(".player-card");
  const computerCardShow = document.querySelector(".computer-card");
  const playerImg = document.createElement("img");
  const computerImg = document.createElement("img");

  playerImg.className = "player-img";
  computerImg.className = "computer-img";

  // link images
  playerImg.src = `./images/${playerCard.suit}-${playerCard.value}.png`;
  computerImg.src = `./images/${computerCard.suit}-${computerCard.value}.png`;

  // show card in page
  playerCardShow.appendChild(playerImg);
  computerCardShow.appendChild(computerImg);

  console.log(
    `player flips ${playerCard.value}${playerCard.suit} computer flips ${computerCard.value}${computerCard.suit}`
  );
};

//remove cards from both decks
const removeCards = () => {
  playerDeck.shift();
  computerDeck.shift();
};

// const tie = () => {
//   const playerTemp = [];
//   const computerTemp = [];
//   for (let i = 0; i < 4; ++i) {
//     playerTemp.push(playerDeck[i]);
//     playerDeck.shift();
//   }

//   for (let i = 0; i < 4; ++i) {
//     computerTemp.push(computerDeck[i]);
//     computerDeck.shift();
//   }
//   const merged = playerTemp.concat(computerTemp);
// };

// put cards back in winners deck in random position
const placeWinnerCards = (winnerDeck, numOfCards) => {
  const random = Math.trunc(Math.random() * winnerDeck.length - 1) + 1;
  for (let i = 0; i < numOfCards / 2; ++i) {
    winnerDeck.splice(random, 0, playerDeck[i]);
    winnerDeck.splice(random, 0, computerDeck[i]);
    removeCards();
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
  console.log("Player wins");
  text.textContent = "Player Wins";
  placeWinnerCards(playerDeck, cardNum);
  deckNumberChange();

  console.log(playerDeck);
  console.log(computerDeck);
};

// what to do when computer wins
const computerWins = (cardNum) => {
  const text = document.querySelector(".text");
  console.log("Computer wins");
  text.textContent = "Computer Wins";
  placeWinnerCards(computerDeck, cardNum);
  deckNumberChange();
  console.log(playerDeck);
  console.log(computerDeck);
};

// clear board
const clear = () => {
  const playerCardImg = document.querySelector(".player-card img");
  const computerCardImg = document.querySelector(".computer-card img");

  playerCardImg.remove();
  computerCardImg.remove();
};
// highest card wins
const winner = () => {
  const playerCard = playerDeck[0];
  const computerCard = computerDeck[0];
  console.log(playerCard);
  console.log(computerCard);

  if (Number(playerCard.value) > Number(computerCard.value)) {
    playerWins(2);
  } else if (Number(computerCard.value) > Number(playerCard.value)) {
    computerWins(2);
  } else {
    // in event of a tie add 4 cards from each player continue until there is not a tie
    // declare elements
    const text = document.querySelector(".text");
    const warBtn = document.createElement("button");

    // clear text
    text.removeChild(text.firstChild);

    console.log(text);
    console.log(warBtn);
    // add class name
    warBtn.className = "war-button";

    // let tieCount = 1;
    console.log("I Declare War");

    // append war button
    text.appendChild(warBtn);

    // add text
    warBtn.textContent = "I Declare War!!!";

    // warBtn.addEventListener("click", deal4)

    // if (Number(playerCard.value) > Number(computerCard.value)) {
    //   playerWins(8 * tieCount);
    // } else if (Number(computerCard.value) > Number(playerCard.value)) {
    //   computerWins(8 * tieCount);
    // } else {
    //   while (Number(playerCard.value) === Number(computerCard.value)) {
    //     flipCards(tieCount * 4);
    //     clear();
    //     ++tieCount;
    //   }
    // }
  }
};

// winner of tie takes all cards
// player with all the cards wins
// - When tie pull 4 cards from deck flip top card winner takes all cards
// - Add cards to winners deck (random positions)
const playBtn = document.querySelector(".play");

playBtn.addEventListener("click", function () {
  const playerCard = document.querySelector(".player-card");
  const result = playerCard.innerHTML;
  if (result !== "") {
    clear();
    flipCards(0);
    winner();
  } else {
    flipCards(0);
    winner();
  }
});
