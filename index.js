var Word = require('./word');
var prompt = require('prompt');
var colors = require("colors/safe");

var words = ['burrata', 'mascarpone', 'parmigiano', 'camembert', 'gruyere', 'mozzarella', 'roquefort', 'fontina', 'taleggio', 'pecorino'];


prompt.message = colors.green("?");
prompt.delimiter = " ";

var schema = {
    properties: {
        guess: {
            description: 'Guess a letter',     // Prompt displayed to the user. If not supplied name will be used.
            type: 'string',
            pattern: /^[a-zA-Z]+$/,
            message: 'Guess must be a letter',
            required: true
        }
    }
};

prompt.start();
var toGuess;

function newGame() {
    toGuess = new Word(words[Math.floor(Math.random() * 10)]);
    toGuess.print();
    stillPlaying();

};

function stillPlaying() {
    if (toGuess.underscores > 0 && toGuess.guesses > 0) {
        prompt.get(schema, function (err, result) {
            if (!err) {
                toGuess.testLetter(result.guess);
                toGuess.print();
                console.log(colors.yellow(`You have ${toGuess.guesses} guesses left`));
                toGuess.noUnderscore();
                stillPlaying();
            }
        });
    } else if (toGuess.underscores > 0 && toGuess.guesses < 1) {
        console.log(colors.red('No guesses left!'));
        console.log(colors.zebra('New Game!'));
        newGame();
    } else if (toGuess.underscores < 1) {
        console.log(colors.zebra('New Game!'));
        newGame();
    }
};

newGame();