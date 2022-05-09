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
const flipCards = () => {
  const playerCard = playerDeck[0];
  const computerCard = computerDeck[0];

  // declare elements
  const playerCardShow = document.querySelector(".player-card");
  const computerCardShow = document.querySelector(".computer-card");
  const playerImg = document.createElement("img");
  const computerImg = document.createElement("img");

  // link images
  playerImg.src = `./images/${playerCard.suit}-${playerCard.value}.png`;
  //   playerImg.setAttribute(
  //     "src",
  //     "./images/${playerCard.suit}-${playerCard.value}.png"
  //   );
  computerImg.src = `./images/${computerCard.suit}-${computerCard.value}.png`;
  console.log(playerImg);
  console.log(computerImg);
  console.log(playerCardShow);

  // show card in page
  playerCardShow.appendChild(playerImg);
  computerCardShow.appendChild(computerImg);

  console.log(
    `player flips ${playerCard.value}${playerCard.suit} computer flips ${computerCard.value}${computerCard.suit}`
  );
};
flipCards();

// put cards back in winners deck in random position
const placeWinnerCards = (winnerDeck, numOfCards) => {
  for (let i = 0; i < numOfCards / 2; ++i) {
    winnerDeck.splice(
      Math.trunc(Math.random) * winnerDeck.length,
      0,
      playerDeck[0]
    );
    winnerDeck.splice(
      Math.trunc(Math.random) * winnerDeck.length,
      0,
      computerDeck[0]
    );

    // const random = winnerDeck[Math.trunc(Math.random() * 26)];
  }
};

//remove cards from both decks
const removeCards = () => {
  playerDeck.shift();
  computerDeck.shift();
};

// highest card wins
const winner = () => {
  const playerCard = playerDeck[0];
  const computerCard = computerDeck[0];
  console.log(playerCard);
  console.log(computerCard);

  //declare elements
  const text = document.querySelector(".text");

  if (Number(playerCard.value) > Number(computerCard.value)) {
    console.log("Player wins");
    text.textContent = "Player Wins";
    placeWinnerCards(playerDeck, 2);
    removeCards();
    console.log(playerDeck);
    console.log(computerDeck);
  } else if (Number(computerCard.value) > Number(playerCard.value)) {
    console.log("Computer wins");
    text.textContent = "Computer Wins";
    placeWinnerCards(computerDeck, 2);
    removeCards();
    console.log(playerDeck);
    console.log(computerDeck);
  } else {
    console.log("TBD");
    text.textContent = "I Declare War!!";
  }
};

winner();

// in event of a tie add 4 cards from each player continue until there is not a tie
// winner of tie takes all cards
// player with all the cards wins
// If time add images in place of words.

// - Flip cards
// - Highest card wins
// - Add cards to winners deck (random positions)
// - When tie pull 4 cards from deck flip top card winner takes all cards
// - Add cards to winners deck (random positions)
// - play until one player runs out of cards
