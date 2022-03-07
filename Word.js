// Require our Letter module exported from Letter.js
import Letter from "./Letter.js";

// Constructor for words
class Word {
    constructor(answer) {
        //Create an array of new Letter objects representing the letters of the underlying word
        this.letterObjectArray = [],
            this.wordToArray = function () {
                for (var i = 0; i < answer.length; i++) {
                    var letterObject = new Letter(answer[i]);
                    this.letterObjectArray.push(letterObject);
                }
            };
        //A function that returns a string representing the word. 
        //This should call the function on each letter object (the first function defined in Letter.js) 
        //that displays the character or an underscore and concatenate those together.
        this.displayString = function () {
            this.displayArray = [];
            for (let i = 0; i < answer.length; i++) {
                this.displayArray.push(this.letterObjectArray[i].toString());
            }
            return this.displayArray.join(" ");
        };
        //A function that takes a character as an argument 
        // and calls the guess function on each letter object (the second function defined in Letter.js)
        this.checkGuess = function (input) {
            for (let j = 0; j < answer.length; j++) {
                this.letterObjectArray[j].checkCharacter(input);
            }
        };
    }
}

//Export our Letter constructor
export default Word;





