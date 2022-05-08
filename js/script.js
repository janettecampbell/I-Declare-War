"use strict";

// Make a deck of 52 cards
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
  "J",
  "Q",
  "K",
  "A",
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

// "Shuffle" the deck
const shuffle = (deck) => {
  // for 1000 turns
  // switch the values of two random cards
  for (let i = 0; i < 1000; ++i) {
    let location1 = Math.trunc(Math.random() * deck.length);
    let location2 = Math.trunc(Math.random() * deck.length);
    let temp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = temp;
  }
};

//get deck of cards
getDeck();
shuffle(deck);
console.log(deck);
// Decide to split deck or give each player a full deck and remove randomly pulled card from both decks
let playerHand;
let computerHand;

const dealHand = () => {
  playerHand = deck.slice(0, 26);
  computerHand = deck.slice(26);
};
dealHand();
console.log(playerHand);
console.log(computerHand);
// select "top" card to play each round
// highest card wins
// put cards back in winners deck in random position
// in event of a tie add 4 cards from each player continue until there is not a tie
// winner of tie takes all cards
// player with all the cards wins
// If time add images in place of words.
