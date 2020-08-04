const Word = require("./Word");

const inquirer = require("inquirer");
const Table = require("cli-table3");
const chalk = require("chalk");
const clear = require("clear");

const wordBank = [
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
	//Pick a random word from the word bank and store it.
	var answer = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Pass our answer through our Word constructor
	var word = new Word(answer);
	//Create an array of new Letter objects representing the letters of the underlying word
	word.wordToArray();

	//Set incorrect guess limit
	let remainingGuesses = 7;
	//Incorrect answer bank
	let guessBank = [];

	//clear the terminal
	clear();
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
					content: chalk.cyan("Guess the Latin American country below:"),
				},
			],
			[{ hAlign: "center", content: word.displayString() }]
		);
		console.log(displayTable.toString());
	}

	//Function to check gameplay status
	function checkStatus() {
		//If there are no underscores the user has won
		if (word.displayString().split("_").length - 1 === 0) {
			//Congratulate user
			var winnerTable = new Table({ wordWrap: true });
			winnerTable.push([
				{
					hAlign: "center",
					content: chalk.cyan("Good Job! You win!"),
				},
			]);
			console.log(winnerTable.toString());
			//Ask to play again
			playAgain();
		}
		//If the user runs out of guesses
		else if (remainingGuesses === 0) {
			//Give correct answer
			var loserTable = new Table({ wordWrap: true });
			loserTable.push([
				{
					hAlign: "center",
					content: chalk.cyan("Sorry! You lost! The correct answer was " + chalk.magenta(answer)),
				},
			]);
			console.log(loserTable.toString());
			//Ask to play again
			playAgain();
		} else {
			makeGuess();
		}
	}

	function score() {
		var statsTable = new Table({ wordWrap: true });
		statsTable.push(
			[
				{
					hAlign: "center",
					content: chalk.cyan("Remaining guesses: " + remainingGuesses.toString()),
				},
			],
			[
				{
					hAlign: "center",
					content: "Letters Guessed: " + guessBank.sort().join(" "),
				},
			]
		);
		console.log(statsTable.toString());
	}

	//Function to prompt our user to make a guess
	function makeGuess() {
		inquirer
			.prompt([
				{
					type: "input",
					name: "guess",
					message: "Guess a letter: ",
					//validate against an empty string
					validate: function inputLength(input) {
						if (/^[a-z]{1}$/.test(input)) return true;
						else return "Please make a valid guess.";
					},
				},
			])
			.then((answers) => {
				//Check to see if input has already been guessed
				if (guessBank.includes(answers.guess)) {
					//Clear the console
					clear();
					//Update the display
					display();
					score();
					console.log("you already guessed that!");
				}
				//Test to see user input
				else {
					//Records number of underscores before the guess is checked
					var before = word.displayString().split("_").length - 1;
					//Takes input as an argument for our checkGuess function from our Word constructor
					word.checkGuess(answers.guess);
					//
					guessBank.push(answers.guess);
					//Clear the console
					clear();
					//Update the display
					display();
					//Records number of underscores after the guess has been checked
					var after = word.displayString().split("_").length - 1;
					//If the number of underscores is the same the user was incorrect
					if (before === after) {
						//Update score display
						score();
						//Alert the user they made an incorrect guess
						var incorrectTable = new Table({ wordWrap: true });
						incorrectTable.push([
							{
								hAlign: "center",
								content: chalk.bgRed("incorrect!"),
							},
						]);
						console.log(incorrectTable.toString());
						//Decrement incorrect attempts
						remainingGuesses--;
						//If the number of underscores changes the user guessed correctly
					} else {
						//Update score display
						score();
						//Alert user they made a correct guess
						var correctTable = new Table({ wordWrap: true });
						correctTable.push([
							{
								hAlign: "center",
								content: chalk.bgGreen("correct!"),
							},
						]);
						console.log(correctTable.toString());
					}
				}
				//Check status to see if user has won, lost, or still has guesses remaining
				checkStatus();
			});
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
