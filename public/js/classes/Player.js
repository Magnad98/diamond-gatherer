class Player {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.dx = options.dx;
        this.dy = options.dy;
        this.imageId = options, imageId;
        this.direction = options.direction;
        this.imageStartPoints = options.imageStartPoints;
        this.playerDim = options.playerDim;
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