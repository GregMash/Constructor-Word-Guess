const Letter = require('./Letter');

class Word { 
    constructor(word) {
        this.word = word;
        this.wordArray = this.word.split('').map((value) => {
            return new Letter (value);
        })
    };
    concatenate() {
        return this.wordArray.join('');
    };
    guessed(userGuess) {
        this.wordArray.forEach(value => {
            value.guessedIt(userGuess);
            console.log(userGuess);
            console.log(value);
        });
    }
};

module.exports = Word;