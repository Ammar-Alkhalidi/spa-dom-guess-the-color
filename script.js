// Select elements
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("color-display");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");

// Variables to hold game state
let numSquares = 6; // Default to "Hard" mode (6 squares)
let colors = [];
let pickedColor;

// Initialize the game
function init() {
  setupModeButtons();
  setupSquares();
  resetGame();
}

// Mode button event listeners (Easy and Hard)
function setupModeButtons() {
  modeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      modeButtons.forEach((btn) => btn.classList.remove("selected"));
      this.classList.add("selected");
      numSquares = this.textContent === "Easy" ? 3 : 6;
      resetGame();
    });
  });
}

// Set up square event listeners
function setupSquares() {
  squares.forEach((square, index) => {
    square.addEventListener("click", function () {
      const clickedColor = this.style.backgroundColor;

      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "CORRECT";
        changeColors(pickedColor);
        resetButton.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = "#232323"; // Hide wrong color
        messageDisplay.textContent = "TRY AGAIN";
      }
    });
  });
}

// Reset the game
function resetGame() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";

  squares.forEach((square, index) => {
    if (colors[index]) {
      square.style.display = "block";
      square.style.backgroundColor = colors[index];
    } else {
      square.style.display = "none"; // Hide extra squares in Easy mode
    }
  });
}

// Reset button event listener
resetButton.addEventListener("click", resetGame);

// Change colors of all squares to the correct color
function changeColors(color) {
  squares.forEach((square) => {
    square.style.backgroundColor = color;
  });
}

// Pick a random color from the colors array
function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Generate an array of random colors
function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

// Generate a single random RGB color
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Initialize game on page load
init();
