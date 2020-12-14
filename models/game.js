const server = require("../server.js");
const Diamond = require("./diamond.js");

class Game {
    constructor(options) {
        this.id = options.id;
        this.players = options.players;
        this.name = options.name;
        this.diamonds = [];
        this.bullets = [];
        this.totalDiamonds = 3;
        this.over = false;
        this.start();
    }
    start() {
        this.gameInterval = setInterval(
            () => {
                server.gameLoop(this.id);
            },
            1000 / 60
        );
    }
    update() {
        if (this.inProgress() && this.players[0].score + this.players[1].score === this.totalDiamonds) {
            this.over = true;
            this.winner = this.players[0].score > this.players[1].score ? "space-ranger" : "pink-lady";
            return;
        }
        this.players.forEach((player) => {
            player.update();
        });
        this.bullets.forEach((bullet, index) => {
            if (bullet.distance <= 0)
                delete this.bullets[index];
            else
                bullets.update();
        });
    }
    generateDiamonds() {
        for (let i = 0; i < this.totalDiamonds; i++)
            this.diamonds.push(new Diamond());
    }
    inProgress() {
        return this.players.length == 2;
    }
}

module.exports = Game;