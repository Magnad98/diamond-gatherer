e coursclass Bullet {
    constructor(player) {
        this.player = player;
        this.x = player.x + player.width / 2;
        this.y = player.y + player.height / 2;
        this.dx = 0;
        this.dy = 0;
        this.speed = 5;
        this.image = player.imageId + "-bullet"; ///here
        this.setSpeed();
        this.distance = 200;
    }
    setSpeed() {
        switch (this.player) {
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

    }
    update() {
        if (this.distance <= 0) {

        } else {
            this.x = this.x + this.dx;
            this.y = this.y + this.dy
            this.distance -= this.speed;
        }
    }
}

module.exports = Bullet;