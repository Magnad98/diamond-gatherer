class Player {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.dx = options.dx; //unused
        this.dy = options.dy; //unused
        this.imageId = options.imageId;
        this.direction = options.direction;
        this.imageStartPoints = options.imageStartPoints;
        this.playerDim = options.playerDim;

        this.name = options.name;

        this.step = options.step;
        this.topLimit = options.step;
        this.botLimit = options.canvas.height - options.playerDim - options.step;
        this.leftLimit = options.step;
        this.rightLimit = options.canvas.width - options.playerDim - options.step;
    }
    forDraw() {
        return {
            imageId: this.imageId,
            drawImageParameters: [
                this.imageStartPoints[this.direction][0],
                0,
                this.playerDim,
                this.playerDim,
                this.x,
                this.y,
                this.playerDim,
                this.playerDim,
            ],
        };
    }
}
module.exports = Player;