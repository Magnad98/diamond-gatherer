import { DrawFlag } from "./canvas.js";

const canvas = document.getElementById("gameArea");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

const Prototype1 = () => {
    const FLAG_WIDTH = 200;
    const FLAG_HEIGHT = 100;
    const PRIMARY_COLOR = "#187BCD"; //blue
    const SECONDARY_COLOR = "#C0C0C0"; //white
    const LINES_WIDTH = 10;
    const OFFSET = {
        X: canvas.width / 2 - FLAG_WIDTH / 2,
        Y: canvas.height / 2 - FLAG_HEIGHT / 2,
    }; //place the flag in the center of the canvas

    DrawFlag(context, OFFSET.X, OFFSET.Y, FLAG_WIDTH, FLAG_HEIGHT, PRIMARY_COLOR, SECONDARY_COLOR, LINES_WIDTH);

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp": {
                OFFSET.Y -= 10;
                break;
            }
            case "ArrowDown": {
                OFFSET.Y += 10;
                break;
            }
            case "ArrowLeft": {
                OFFSET.X -= 10;
                break;
            }
            case "ArrowRight": {
                OFFSET.X += 10;
                break;
            }
        }
        context.clearRect(0, 0, 400, 600);
        DrawFlag(context, OFFSET.X, OFFSET.Y, FLAG_WIDTH, FLAG_HEIGHT, PRIMARY_COLOR, SECONDARY_COLOR, LINES_WIDTH);
    })
};
Prototype1();

/*const Course2 = () => {
    const george = new Image();
    george.src = "./images/Puppy.jpg";
    const GEORGE_WIDTH = 40;
    const GEORGE_HEIGHT = 45;
    let georgeX = 100;
    let georgeY = 100;
    george.onload = () => {
        context.drawImage(george, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, 100, 100, GEORGE_WIDTH, GEORGE_HEIGHT)
    }

    const mario = new Image();
    mario.src = "./images/Puppy.jpg";
    const MARIO_WIDTH = 32;
    const MARIO_HEIGHT = 39;
    mario.onload = () => {
        context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 0, 0, MARIO_WIDTH, MARIO_HEIGHT)
    }

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp": {
                georgeY -= 10;
                break;
            }
            case "ArrowDown": {
                georgeY += 10;
                break;
            }
            case "ArrowLeft": {
                georgeX -= 10;
                break;
            }
            case "ArrowRight": {
                georgeX += 10;
                break;
            }
        }
        context.clearRect(0, 0, 400, 600);
        context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 0, 0, MARIO_WIDTH, MARIO_HEIGHT)
        context.drawImage(george, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT)
    })
};
//Course2();*/