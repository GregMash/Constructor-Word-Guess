class Letter {
    constructor(value) {
        this.letter = value;
        this.guessed = false;
    };
    toString() {
        if (this.guessed) {
            return this.letter;
        } else {
            return "_ ";
        }
    };
    guessedIt(userGuess) {
        if (userGuess === this.letter) {
            this.guessed = true;
        }
    };
};

module.exports = Letter;