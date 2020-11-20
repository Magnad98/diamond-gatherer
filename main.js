import { DrawFlag } from "./canvas.js";

const canvas = document.getElementById("gameArea");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

const Prototype1 = () => {
    const FLAG_WIDTH = 200;
    const FLAG_HEIGHT = 100;
    const PRIMARY_COLOR = "#187BCD"; //blue
    const SECONDARY_COLOR = "#FFFFFF"; //white
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