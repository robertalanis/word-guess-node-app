var Word = require("./Word");

var inquirer = require("inquirer");
var Table = require("cli-table3");
var clear = require("clear");

let wordBank = [
  "argentina",
  "belize",
  "bolivia",
  "brazil",
  "chile",
  "colombia",
  //'costa rica',
  "cuba",
  //'dominican republic',
  "ecuador",
  //'el salvador',
  "guatemala",
  "guyana",
  "haiti",
  "honduras",
  "mexico",
  "nicaragua",
  "panama",
  "paraguay",
  "peru",
  "suriname",
  "uruguay",
  "venezuela",
];

function newGame() {
  clear();
  //Pick a random word from the word bank.
  var word = new Word(wordBank[Math.floor(Math.random() * wordBank.length)]);
  //Create an array of new Letter objects representing the letters of the underlying word
  word.wordToArray();

  //Function to display our word on a table
  function display() {
    var displayTable = new Table({ wordWrap: true });
    displayTable.push(
      [{ hAlign: "center", content: "Guess the Latin American country below:" }],
      [{ hAlign: "center", content: word.displayString() }]
    );
    console.log(displayTable.toString());
  }
  //Call our display function
  display();

  //Function to check gameplay status
  function checkStatus() {
    // if there are no underscores the user has won
    if (word.displayString().split("_").length - 1 === 0) {
      isWinner();
    } else {
      makeGuess();
    }
  }
  //Call our status function
  checkStatus();
  //Function to prompt our user to make a guess
  function makeGuess() {
    inquirer
      .prompt([
        {
          /* Pass your questions in here */
          type: "input",
          name: "guess",
          message: "Guess a letter: ",
        },
      ])
      .then((answers) => {
        // Use user feedback for... whatever!!
        var before = word.displayString().split("_").length - 1;
        word.checkGuess(answers.guess);
        var after = word.displayString().split("_").length - 1;
        clear();
        display();
        if (before === after) {
          console.log("incorrect");
        } else {
          console.log("correct");
        }

        checkStatus();
      });
  }
}

function isWinner() {
  console.log("Good Job! You win!");
}

newGame();
