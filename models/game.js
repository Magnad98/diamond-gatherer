const server = require("../server.js");

class Game {
    constructor(options) {
        this.id = options.id;
        this.players = options.players;
        this.name = options.name;
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
        this.players.forEach((player) => {
            player.move();
        });
    }
}
module.exports = Game;