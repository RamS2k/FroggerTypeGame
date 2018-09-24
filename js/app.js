"use strict";


const Setup = {
    width: 505,
    height: 606,
    numRows: 6,
    numCols: 5, 
    dx: 101,
    dy: 83,
    playerStartPosition:{
        x: 202,
        y: 404,
    },
    Boundary: {
        left: 0,
        Right: 404,
        up: 404-83*5,
        down: 404,
    },
}
Object.seal(Setup);

// Enemies our player must avoid
class Enemy  {
    constructor(y, pace) {
        this.character = 'images/enemy-bug.png';
        this.xDir = 0;
        this.yDir = y;
        this.pace = pace;
        this.middle = 45;
    }

    update (dt) {
        if (this.xDir > Setup.Boundary.Right) {
            this.xDir = Setup.Boundary.left;
        }
        else {
            this.xDir += dt*this.pace;
            if(this.yDir == player.getPlayerY()) {
                if(Math.abs(this.xDir - player.getPlayerX()) < (this.middle + player.getPlayerHalf())) {
                    player.playerReset();
                }
            }
        }
    }
    render () {
        ctx.drawImage(Resources.get(this.character), this.xDir, this.yDir);
    }
}
class Player {
    constructor() {
        this.character = "images/char-boy.png";
        this.middle = 30;
        this.position = Setup.playerStartPosition;
        this.keyPress = null;
    }

    playerReset () {
        this.position = Setup.playerStartPosition;
        this.render();
    }
    getPlayerX() {
        return this.position.x;
    }
    getPlayerY() {
        return this.position.y;
    }
    getPlayerHalf() {
        return this.middle;
    }
    update() {
        if (this.position.y == Setup.Boundary.up) {
            window.alert("Congratulations, you Made it!");
            this.playerReset();
       
        }
        if (this.keyPress = 'left') {
            if (this.position.x != Setup.Boundary.left) {
                this.position.x = this.position.x - Setup.dx;
            }
        }
        else if (this.keyPress = 'right') {
            if (this.position.x != Setup.Boundary.Right) {
                this.position.x = this.position.x + Setup.dx;
            }
        }
        else if (this.keyPress = 'up') {
            if (this.position.y != Setup.Boundary.up) {
                this.position.y = this.position.y + Setup.dy;
            }
        }
        else if (this.keyPress = 'down') {
            if (this.position.y != Setup.Boundary.down) {
                this.position.y = this.position.y - Setup.dy;
            }  
        }
        this.keyPress = null;
    }
    render () {
        ctx.drawImage(Resources.get(this.character), this.position.x, this.position.y)
    }
    handleInput(input) {
        this.keyPress = input;
    }
}

const allEnemies = [new Enemy(404-83*1, 590), new Enemy(404-83*2, 380),new Enemy(404-83*3, 110),new Enemy(404-83*4, 110)];
const player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
