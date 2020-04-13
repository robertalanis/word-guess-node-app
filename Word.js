// requiring our Letter module exported from Letter.js
var Letter = require("./Letter");


//A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)



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
        for (let index = 0; index < answer.length; index++) {
            this.displayArray.push(this.letterObjectArray[index].toString());
        }
        return this.displayArray.join(" ");
    }
    
}



var country = new Word("argentina");
console.log(country.letterObjectArray);
country.wordToArray();
console.log(country.letterObjectArray);

console.log(country.letterObjectArray[0].toString());
country.displayString();

console.log("test")


// exporting our Letter constructor
module.exports = Word;





