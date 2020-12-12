const server = require("../server.js");
const Diamond = require("./diamond.js");

class Game {
    constructor(options) {
        this.id = options.id;
        this.players = options.players;
        this.name = options.name;
        this.diamonds = [];
        this.totalDiamonds = 3;
        this.start();
    }
    start() {
        this.gameInterval = setInterval(
            () => {
                server.gameLoop(this.id)
            },
            1000 / 60
        );
    }
    update() {
        if (this.players[0].score + this.players[1].score === this.score.totalDiamonds) {
            this.over = true;
            this.winner = this.players[0].score > this.players[1].score ? "space-ranger" : "pink-lady";
        }
        this.players.forEach((player) => {
            player.update();
        });
        this.bullets.forEach((player) => {
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