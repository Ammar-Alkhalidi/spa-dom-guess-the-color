const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const browserOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
};

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch(browserOptions);
  page = await browser.newPage();
  await page.goto("file://" + path.resolve("./index.html"));
}, 30000);

afterAll((done) => {
  try {
    this.puppeteer.close();
  } catch (e) {}
  done();
});

describe("Generate colors", () => {
  it("New color to guess is generated when 'New Colors' is clicked", async () => {
    const currentColor = await page.$eval(
      "#color-display",
      (el) => el.textContent
    );
    const resetColorBtn = await page.$("#reset");
    await resetColorBtn.click();
    const newColor = await page.$eval("#color-display", (el) => el.textContent);
    expect(newColor).not.toBe(currentColor);
  });
});
describe("Easy mode", () => {
  it("When 'Easy' mode is selected, only 3 color options are displayed", async () => {
    const easyModeBtn = await page.$(".mode");
    await easyModeBtn.click();
    const visibleSquares = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".square")).filter(
        (square) => square.style.display !== "none"
      ).length;
    });
    expect(visibleSquares).toBe(3);
  });
});
describe("Hard mode", () => {
  it("When 'Hard' mode is selected, 6 color options are displayed", async () => {
    const hardModeBtn = await page.$(".selected");
    await hardModeBtn.click();
    const visibleSquares = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".square")).filter(
        (square) => square
      ).length;
    });
    expect(visibleSquares).toBe(6);
  });
});
describe("Guess meggage", () => {
  it("A 'Correct' message is displayed in the `#message` container when user guesses color correctly", async () => {
    const colorToGuess = await page.$eval(
      "#color-display",
      (el) => el.textContent
    );
    const squares = await page.$$(".square");
    const squareColors = await Promise.all(
      squares.map((square) => square.evaluate((el) => el.style.backgroundColor))
    );
    const index = squareColors.findIndex((color) => color === colorToGuess);
    await squares[index].click();
    const message = await page.$eval("#message", (el) => el.textContent);
    expect(message).toMatch(/correct/i);
  });
});
