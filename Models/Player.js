class Player {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.dx = options.dx; //unused
        this.dy = options.dy; //unused
        this.imageId = options.imageId;
        this.imageStartPoints = options.imageStartPoints;
        this.direction = options.direction;
        this.animationIndex = options.animationIndex;
        this.playerDim = options.playerDim;

        this.name = options.name;

        this.step = options.step;
        this.topLimit = options.step;
        this.botLimit = options.canvas.height - options.playerDim - options.step;
        this.leftLimit = options.step;
        this.rightLimit = options.canvas.width - options.playerDim - options.step;
        console.log("dir: ", this.direction, " ind: ", this.animationIndex);
    }
    forDraw() {
        return {
            imageId: this.imageId,
            drawImageParameters: [
                this.imageStartPoints[this.direction][this.animationIndex],
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
    move(direction) {
        direction == this.direction ? this.animationIndex = (this.animationIndex + 1) % 2 : this.animationIndex = 0;
        this.direction = direction;

        switch (direction) {
            case "up":
                { this.y -= this.step; break }
            case "down":
                { this.y += this.step; break }
            case "left":
                { this.x -= this.step; break }
            case "right":
                { this.x += this.step; break }
        }
        console.log("dir: ", this.direction, " ind: ", this.animationIndex);
    }
}
module.exports = Player;