//================================= Global Variables ====================================
const inquirer = require('inquirer');
const Word = require('./Word');
const Wordbank = require('./Wordbank');
let count = 7;
let userGuesses = [];

//================================= Functions ====================================
//This function uses inquirer to prompt the user if they would like to play the game
function startGame() {
    userGuesses = [];
    inquirer.prompt({
        name: 'play',
        type: "list",
        message: 'Would you like to play Hangman?',
        choices: ['YES', "NO"]
    }).then(res => {
        if (res.play === 'YES') {
            console.clear();
            getWord();
        } else {
            console.log('Okay, perhaps next time!');
        };
    })
};

//This function will call to the wordbank and use the constructor Word to create the random word for the game
function getWord() {
    let currentWord = new Word(Wordbank[Math.floor(Math.random() * Wordbank.length)]);
    console.log(`
    ${currentWord.concatenate()}
    `);
    count = 7;
    getGuess(currentWord);
};

//This function simply takes the current word selected and displays it using the Word method concatenate
function updateWord(currentWord) {
    console.log(`
    ${currentWord.concatenate()}
    `);
    checkForWin(currentWord);
};

// This function grabs the input from the user
function getGuess(currentWord) {
    inquirer.prompt({
        name: 'userGuess',
        type: 'input',
        message: 'Please guess a letter...'
    }).then(res => {
        console.clear();
        userGuess = res.userGuess.toLowerCase();
        if (userGuess.length === 1 && /^[a-z]+$/i.test(userGuess)) {
            userGuesses.push(userGuess);
            console.log(`
You guessed: ${res.userGuess}

You have guessed: ${userGuesses}`);
            checkGuess(currentWord, userGuess);
        } else {
            console.log("Please enter only one letter");
            getGuess(currentWord);
        };
    })
};

//This function checks the user input against the values of the letters in the current word
function checkGuess(currentWord, userGuess) {
    currentWord.guessed(userGuess);
        if (currentWord.wordArray.toString().includes(userGuess.toString())) {
            console.log(`Correct! ${count} incorrect guesses left!`);
        } else {
            count--;
            console.log(`Sorry, incorrect. ${count} incorrect guesses left!`);   
    }
    updateWord(currentWord);
};

//This function checks to see if the user won, lost, or is to keep playing
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

//================================= Main Process ====================================
//physically call the start game function, which in turn calls the next function
startGame();