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
        this.sprites = this.getSprites("../../assets/sprites/george.png", 4, 4, { width: 10, height: 10 }, { width: [0, 17, 22, 20], height: [0, 17, 16, 16] });
        this.currentSprite = {
            sprite: this.sprites.down[0],
            direction: "down",
            index: 0,
        }

        this.topLimit = step;
        this.botLimit = canvas.height - height - step;
        this.leftLimit = step;
        this.rightLimit = canvas.width - width - step;
    }
    getSprites(path, rows, columns, offsetBefore, offsetBetween) {
        let sprites = {
            up: [],
            down: [],
            left: [],
            right: [],
        };

        for (let i = 0; i < rows; i++)
            for (let j = 0; j < columns; j++) {
                let sprite = {
                    x: offsetBefore.width + (this.width + offsetBetween.width[j]) * j,
                    y: offsetBefore.height + (this.height + offsetBetween.height[i]) * i,
                };

                switch (j) {
                    case 0: { sprites.down.push(sprite); break; }
                    case 1: { sprites.left.push(sprite); break; }
                    case 2: { sprites.up.push(sprite); break; }
                    case 3: { sprites.right.push(sprite); break; }
                }
            }
        return sprites;
    }
    getNextSprite(direction){
        if (this.currentSprite.direction == direction){
            this.currentSprite.index++;
            this.currentSprite.index = this.currentSprite.index % 4;
        }
        else{
            this.currentSprite.index = 0;
            this.currentSprite.direction = direction;
        }

        switch(this.currentSprite.direction){
            case "up": {this.currentSprite.sprite = this.sprites.up[this.currentSprite.index]; break;};
            case "down": {this.currentSprite.sprite = this.sprites.down[this.currentSprite.index]; break;};
            case "left": {this.currentSprite.sprite = this.sprites.left[this.currentSprite.index]; break;};
            case "right": {this.currentSprite.sprite = this.sprites.right[this.currentSprite.index]; break;};
        }
    }

    draw(context, direction) {
        this.getNextSprite(direction);
        context.drawImage(
            this.image,
            this.currentSprite.sprite.x,
            this.currentSprite.sprite.y,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}