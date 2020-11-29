class Game {
    constructor(options) {
        this.id = options.id;
        this.players = options.players;
        this.start(options.gameLoop);
    }
    start(gameLoop) {
        setInterval(
            () => {
                gameLoop(this.id)
            },
            1000 / 60
        );
    }
}
module.exports = Game;