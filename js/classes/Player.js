export class Player {
    constructor(name, path, width, height, x, y, canvas, step) {
        this.name = name;

        this.image = new Image();
        this.image.src = path;

        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.step = step;

        this.topLimit = step;
        this.botLimit = canvas.height - height - step;
        this.leftLimit = step;
        this.rightLimit = canvas.width - width - step;
    }
    draw(context) {
        context.drawImage(
            this.image,
            0 * this.width,
            0 * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}