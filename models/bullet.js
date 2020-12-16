const server = require("../server.js");
class Bullet {
    constructor(player) {
        this.player = player;
        this.x = player.x + player.width / 2;
        this.y = player.y + player.height / 2;
        this.dx = 0;
        this.dy = 0;
        this.speed = 5;
        this.imageId = player.imageId + "-bullet";
        this.setSpeed();
        this.distance = 200;
        this.width = 13;
        this.opponent = this.findOpponent();
    }
    setSpeed() {
        switch (this.player.direction) {
            case "up":
                this.dy = -this.speed;
                break;
            case "right":
                this.dx = this.speed;
                break;
            case "down":
                this.dy = this.speed;
                break;
            case "left":
                this.dx = -this.speed;
                break;
        }
    }
    forDraw() {
        return {
            imageId: this.imageId,
            drawImageParameters: [
                this.x,
                this.y
            ]
        };
    }
    update() {
        this.move();
        this.checkOpponentCollision();
    }
    move() {
        this.x += this.dx;
        this.y += this.dy;
        this.distance -= this.speed;
    }
    collidedWith(opponent) {
        const center = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
        }

        if (
            opponent.x <= center.x && center.x <= opponent.x + opponent.width &&
            opponent.y <= center.y && center.y <= opponent.y + opponent.height
        )
            return true;
        return false
    }
    checkOpponentCollision() {
        if (this.collidedWith(this.opponent)) {
            this.opponent.hp--;
            this.distance = 0;
        }
    }
    findOpponent() {
        const opponentIndex = this.player.imageId == "space-ranger" ? 1 : 0;
        return server.games[this.player.gameId].players[opponentIndex];
    }
}

module.exports = Bullet;