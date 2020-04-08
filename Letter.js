//Letter.js: Contains a constructor, Letter. 
var Letter = function(character){
    //A string value to store the underlying character for the letter
    this.letter = character;
    //A boolean value that stores whether that letter has been guessed yet
    this.guessed = false;
    this.toString = function () {
        //Returns the underlying character if the letter has been guessed
        if (this.guessed = true) {return this.letter;}
        //Returnsor a placeholder (underscore) if the letter has not been guessed
        else {return "_";}
    }
    this.checkGuess = function (guess){
        //Takes a character as an argument and checks it against the underlying character
        if (guess === this.letter) 
        //Updates the stored boolean value to true if it was guessed correctly
        {this.guessed = true;}
    }
}

// exporting our Letter constructor
module.exports = Letter;
