const inquirer = require('inquirer');
const Word = require('./Word');
const Wordbank = require('./Wordbank');


function startGame() {
    inquirer.prompt({
        name: 'play',
        type: "list",
        message: 'Would you like to play Hangman?',
        choices: ['YES', "NO"]
    }).then(res => {
        if (res.play === 'YES') {
            getWord();
        } else {
            console.log('Okay, perhaps next time!');
        };
    })
};

function getWord() {
    let currentWord = new Word(Wordbank[Math.floor(Math.random() * Wordbank.length)]);
    console.log(currentWord.concatenate());
    getGuess();
    checkGuess();
};

function updateWord(currentWord) {
    console.log(currentWord.concatenate());
}

function getGuess() {
    inquirer.prompt({
        name: 'userGuess',
        type: 'input',
        message: 'Please guess a letter...'
    }).then(res => {
        userGuess = res.userGuess;
        checkGuess(userGuess);
    })
};

function checkGuess(currentWord, userGuess) {
    console.log(currentWord);
    console.log(userGuess);
    //currentWord.guessed(userGuess);
    //updateWord();
}



startGame();