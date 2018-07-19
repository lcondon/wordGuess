var Letter = function (x) {
    this.letter = x;
    this.hasBeenGuessed = false;
    this.render = function () {
        switch (this.hasBeenGuessed) {
            case true:
                return this.letter;
            case false:
                return '_';
        }
    };
    this.guessLetter = function (y) {
        if (y == this.letter) {
            this.hasBeenGuessed = true;
        }
    }
}

module.exports = Letter;