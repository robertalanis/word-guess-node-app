var Word = require("./Word");

var inquirer = require("inquirer");
var Table = require("cli-table3");
const chalk = require("chalk");
var clear = require("clear");

let wordBank = [
  "argentina",
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
  "honduras",
  "mexico",
  "nicaragua",
  "panama",
  "paraguay",
  "peru",
  "uruguay",
  "venezuela",
];

//Starts game
function newGame() {
  //clear the terminal
  clear();
  //Pick a random word from the word bank and store it.
  var answer = wordBank[Math.floor(Math.random() * wordBank.length)];
  //Pass our answer through our Word constructor
  var word = new Word(answer);
  //Create an array of new Letter objects representing the letters of the underlying word
  word.wordToArray();

  let inputArray = [];

  //Set incorrect guess limit
  let incorrectAttempts = 5;

  //Call our display function
  display();
  //Call our status function
  checkStatus();

  //Function to display our word on a table
  function display() {
    var displayTable = new Table({ wordWrap: true });
    displayTable.push(
      [
        {
          hAlign: "center",
          content: "Guess the Latin American country below:",
        },
      ],
      [{ hAlign: "center", content: word.displayString() }]
    );
    console.log(displayTable.toString());
  }

  //Function to check gameplay status
  function checkStatus() {
    // if there are no underscores the user has won
    if (word.displayString().split("_").length - 1 === 0) {
      isWinner();
    } else if (incorrectAttempts === 0) {
      isLoser();
    } else {
      makeGuess();
    }
  }

  //Function to prompt our user to make a guess
  function makeGuess() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "guess",
          message: "Guess a letter: ",
        },
      ])
      .then((answers) => {
        var before = word.displayString().split("_").length - 1;
        word.checkGuess(answers.guess);
        var after = word.displayString().split("_").length - 1;
        clear();
        display();
        if (before === after) {
          incorrectAttempts--;
          console.log(chalk.red("incorrect"));
          console.log(
            chalk.red(
              "you have " + incorrectAttempts + " incorrect attempts left!"
            )
          );
        } else {
          console.log(chalk.green("correct"));
        }
        checkStatus();
      });
  }
  //If user wins
  function isWinner() {
    //Congratulate user
    console.log("Good Job! You win!");
    //Ask to play again
    playAgain();
  }
  //If user loses
  function isLoser() {
    //Give correct answer
    console.log("Sorry! You lost! The correct answer was " + answer);
    //Ask to play again
    playAgain();
  }
}
//Gives user option to play another game
function playAgain() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "response",
        choices: ["yes", "no"],
        message: "Would you like to play again?",
      },
    ])
    .then((answers) => {
      //Starts new game
      if (answers.response === "yes") {
        newGame();
      //Ends game  
      } else {
        //Clear console
        clear();
        //Thank you message
        var thankYouTable = new Table({ wordWrap: true });
        thankYouTable.push([
          {
            hAlign: "center",
            content: chalk.cyan("Thanks for playing!"),
          },
        ]);
        console.log(thankYouTable.toString());
      }
    });
}
//Run game
newGame();
