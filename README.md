# I Declare War Card Game

## Wireframe

![wireframe](https://github.com/PotstickerNut/I-Declare-War/blob/main/images/wireframe.jpg?raw=true)

## Explanations of specific Technologies

### HTML

I added a main wrapper for the grid. Inside the container are the divs for the grid. I used classes to be able to use JavaScript and CSS.

### CSS

I used CSS to style the page. I used the grid to make boxes for the cards to sit in, and for the title and player identification.

I added box-shadow to the buttons to make them stand out, and on the card decks to make them seem more like a stack.

I made the page more responsive by using vw and vh to size elements.

### JavaScript

I used JavaScript to put in the game logic. Using functions, arrays, and objects I was able to build a deck, shuffle it, and split it.

I used if else statements to review the cards and what to do next; and, used event listeners to created clickable buttons.

## Approach Taken

I started by trying to break the project into smaller pieces.

- Make a 52 card deck
- Shuffle the deck
- Split the deck into 26 cards.
- Flip cards
- Highest card wins
- Add cards to winners deck (random positions)
- When tie pull 4 cards from deck flip top card winner takes all cards
- Add cards to winners deck (random positions)
- Play until one player runs out of cards

## Unsolved Problems

- Add pause to see each tie
- Add flip animation

## Link to Hosted Site

https://potstickernut.github.io/I-Declare-War/

## Installation Instructions

No installation needed

## Instructions

1. Click "PLAY" to flip cards
2. Higher card wins
3. Incase of tie click "I Declare War!!!" button
4. 4 cards per tie will be added to winners stack
5. Repeat until one player runs out of cards
6. To play again click "RESET"
