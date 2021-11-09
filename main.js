const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let currentPlaying = true;

class Field {
    constructor (field) {
        this._field = field;
        this._x = x;
        this._y = y;
    }

    get field() {
        return this.field;
    }

    print() {
        const result = this.field.map((row) => {
         return row.join('');
        })
        return result.join('\n');
      }

    ask() {
        let move = prompt('Which Direction do you want to go?' 'U for Up, D for Down, L for left, R for Right');
        switch(move.toLocaleLowerCase()) {
            case 'u':
                console.log('Moving Up');
                this.y -= 1;
                break;
            case 'd':
                console.log('Moving Down');
                this.y += 1;
                break;
            case 'l':
                console.log('Moving Left');
                this.x -= 1;
                break;
            case 'r':
                console.log('Moving Right');
                break;
            default:
                break;
        }
    }

    checkWin () {
        if(this.field[this.y] == undefined) {
            console.log('You lost - Out of boundry')
            return currentPlaying = false;
        }
        switch(this.field[this.y][this.x]) {
            case hole:
                console.log('You Lost - You fall in hole');
                currentPlaying = false;
                break;
            case undefined:
                console.log('You Lost - Out of Boundry');
                currentPlaying = false;
                break;
            case hat:
                console.log('You Won - You Found the Hat!');
                currentPlaying = false;
                break;
            case fieldCharacter:
                console.log('Keep looking for hat');
                this.field[this.y][this.x] = pathCharacter;
                break;
            case pathCharacter:
                console.log('You are stepping on *');
                break;
            default:
                break;
        }
    }

    static generateField(height, width, percentage) {
        const fieldAndHold = (percentage) => {
            if(percentage >= 0 && percentage <= 100) {
                const randomNum = Math.random() * 100;
                if (randomNum < percentage) {
                    return hole;
                } else {
                    return fieldCharacter;
                }
            } else {
                console.log('Enter a valid No. 0 to 100');
            }
        }

        const plainField = () => {
            function makeWidthArray () {
                let widthArray = [];
                for(let i = 0; i < width; i++) {
                    widthArray.push(fieldAndHold(percentage));
                }
                return widthArray;
            }
            let plainField = [];
            for(let i = 0; i < height; i++) {
                plainField.push(makeWidthArray());
            }
            return plainField;
        }

        const gameOfField = plainField;

        do {
            gameOfField[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;
        } while (gameOfField[0] [0]);

            gameOfField [0] [0] = pathCharacter;

        return gameOfField;
    }
}

const newField = new Field(Field.generateField(10,25,15));

function playGame () {
    while(currentPlaying) {
        console.log(newField.print());
        newField.ask();
        newField.checkWin();
    }
    console.log('Game Over');
}

playGame();