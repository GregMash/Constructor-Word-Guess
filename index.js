const inquirer = require('inquirer');
const Word = require('./Word');
const Wordbank = require('./Wordbank');
let count = 10;


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
    console.log(`
    ${currentWord.concatenate()}
    `);
    count = 10;
    getGuess(currentWord);
};

function updateWord(currentWord) {
    console.log(`
    ${currentWord.concatenate()}
    `);
    checkForWin(currentWord);
}

function getGuess(currentWord) {
    inquirer.prompt({
        name: 'userGuess',
        type: 'input',
        message: 'Please guess a letter...'
    }).then(res => {
        userGuess = res.userGuess;
        console.log(`You guessed: ${res.userGuess}`);
        checkGuess(currentWord, userGuess);
    })
};

function checkGuess(currentWord, userGuess) {
    currentWord.guessed(userGuess);
        if (currentWord.wordArray.toString().includes(userGuess.toString())) {
            console.log(`Correct! ${count} guesses left!`);
        } else {
            count--;
            console.log(`Sorry, incorrect. ${count} guesses left!`);   
    }
    updateWord(currentWord);
};

function checkForWin(currentWord) {
    if(count <= 0) {
        console.log(`You Lost! The word was ${currentWord.word}`);
        startGame();
    } else if (currentWord.wordArray.toString().includes('_')) {
        getGuess(currentWord);
    } else {
        console.log('You Won!!!');
        startGame();
    }
};

startGame();