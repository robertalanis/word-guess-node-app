// requiring our Letter module exported from Letter.js
var Letter = require("./Letter");

// Constructor for words
function Word(answer){
    //An array of new Letter objects representing the letters of the underlying word
    this.letterObjectArray = [],
    this.wordToArray = function(){
        for(var i = 0; i < answer.length; i++){
            var letterObject = new Letter(answer[i]);
            this.letterObjectArray.push(letterObject);
        }
    }
    //A function that returns a string representing the word. 
    //This should call the function on each letter object (the first function defined in Letter.js) 
    //that displays the character or an underscore and concatenate those together.
    this.displayString = function () {
        this.displayArray = []
        for (let i = 0; i < answer.length; i++) {
            this.displayArray.push(this.letterObjectArray[i].toString());
        }
        return this.displayArray.join(" ");
    }
    //A function that takes a character as an argument 
    // and calls the guess function on each letter object (the second function defined in Letter.js)
    this.checkGuess = function (input) {
        for (let j = 0; j < array.length; j++) {
            country.letterObjectArray[j].checkCharacter(input);
        }
    }
    
}

//Testing letterObjectArray
var country = new Word("argentina");
console.log(country.letterObjectArray);
country.wordToArray();
console.log(country.letterObjectArray);

//Testing displayString function
console.log(country.letterObjectArray[0].toString());
console.log(country.displayString());

//Testing checkGuess function
console.log(country.letterObjectArray[0].guessed);
country.letterObjectArray[0].checkCharacter("a");
console.log(country.letterObjectArray[0].guessed);

// exporting our Letter constructor
module.exports = Word;





