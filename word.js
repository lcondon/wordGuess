var Letter = require('./letter');
var colors = require("colors/safe");

var Word = function (word) {
    this.arr = [];
    this.arr2 = [];
    this.underscores = 0;
    this.guesses = 10;
    for (var i = 0; i < word.length; i++) {
        this.arr.push(new Letter(word.charAt(i)))
    };
    this.print = function () {
        this.arr2 = [];
        this.underscores = 0;
        for (var j = 0; j < this.arr.length; j++) {
            this.arr2.push(this.arr[j].render());
            if (this.arr[j].render() == '_') {
                this.underscores++;
            }
        }
        console.log(colors.rainbow(this.arr2.join(" ")));
    };
    this.testLetter = function (x) {
        var found = false;
        for (var k = 0; k < this.arr.length; k++) {
            this.arr[k].guessLetter(x);
        }
        for (var m = 0; m < this.arr.length; m++) {
            if (this.arr[m].letter == x) {
                found = true;
                break;
            };
        };
        if (found === false) {
            this.guesses--;
            console.log(colors.red('Wrong!'))
        } else if (found === true) {
            console.log(colors.green(`That's right!`))
        }
    };
    this.noUnderscore = function () {
        if (this.arr2.every(this.didYouWin)) {
            console.log(colors.magenta('You won!'));
        } else {
            if (this.guesses > 0) {
            console.log(colors.cyan('Guess again!'));
            } 
        }
    };
    this.didYouWin = function (letter, index, array) {
        return letter != "_";
    };
}

module.exports = Word;


