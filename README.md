# Guess the color!

The player must correctly guess the correct color by clicking on the colored squares on the page. The page has already been built, but you have to complete the JavaScript to make it work!

## Task

Complete the JavaScript to make the game work, for example;

- By adding event listeners to the buttons
- Adding the missing game logic

- The [HTML](./index.html) and [CSS](./style.css) have already been prepared for you. Do not edit these files.
- Write your code in [script.js](./script.js)

## Requirements

#### For each new game;

- The computer must create new random colors for all squares on the page
- One of those random colors must be the correct color
- The RBG value of the correct color must be set in the element `#color-display`. This will provide a clue to the player.

#### For the buttons;

- The button _New Colors_ must create new random colors for all squares on the page
- The button _Easy_ must set the number of colored squares to 3
- The button _Hard_ must se the number of colored squares to 6

#### When the player clicks on one of the colored squares;

- If they clicked on the **correct** color;
  - set the text in the `#message` element to `CORRECT`
- If they clicked on the **wrong** color;
  - set the text in the `#message` element to `TRY AGAIN`
  - set the color of the colored square to the background color (making it look invisible)

## Expected Result

![Reference Image](./reference.gif)
# spa-dom-guess-the-color
