const server = require("../server.js");
const constants = require("./constants.js");

class Player {
    constructor(options) {
        this.dx = 0;
        this.dy = 0;
        this.step = 0;
        this.direction = "down";
        this.gameId = options.gameId;
        this.socketId = options.socketId;
        this.hasDiamond = false;
        this.score = 0;
        this.width = constants.PLAYER_DIM.width;
        this.height = constants.PLAYER_DIM.height;

    }
    forDraw() {
        return {
            imageId: this.hasDiamond ? this.imageId + "-with-diamond" : this.imageId,
            drawImageParameters: [
                this.imageStartPoints[this.direction][this.step],
                0,
                this.width,
                this.height,
                this.x,
                this.y,
                this.width,
                this.height,
            ],
        };
    }
    startMoving(direction) {
        switch (direction) {
            case "up":
                this.dy = -3;
                break;
            case "down":
                this.dy = 3;
                break;
            case "left":
                this.dx = -3;
                break;
            case "right":
                this.dx = 3;
                break;
        }
        this.direction = direction;
    }
    move() {
        const newX = this.x + this.dx;
        if (newX != this.x && newX > 0 && (newX + this.width) < constants.MAP.width) {
            this.x += this.dx;
            this.step = Math.floor(this.x / this.width) % 2;
        }

        const newY = this.y + this.dy;
        if (newY != this.y && newY > 0 && (newY + this.height) < constants.MAP.height) {
            this.y += this.dy;
            this.step = Math.floor(this.y / this.height) % 2;
        }
    }
    stopMoving(axis) {
        this[axis] = 0;
    }
    update() {
        this.move();
        if (this.hasDiamond)
            this.checkBaseCollision();
        else
            this.checkDiamondsCollision();
    }
    checkDiamondsCollision() {
        const game = server.games[this.gameId];
        game.diamonds.forEach((diamond, index) => {
            if (this.collidedWith(diamond)) {
                //console.log("COLLISION WITH DIAMOND");
                this.hasDiamond = true;
                delete game.diamonds[index];
            }
        })
    }
    collidedWith(diamond) {
        const center = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
        }

        if (
            diamond.x <= center.x && center.x <= diamond.x + diamond.width &&
            diamond.y <= center.y && center.y <= diamond.y + diamond.height
        )
            return true;
        return false
    }
    checkBaseCollision() {
        if (this.collidedWith(this.base)) {
            this.hasDiamond = false;
            this.score++;
        }
    }
}

module.exports = Player;