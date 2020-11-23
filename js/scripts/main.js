import { Player } from "../classes/Player.js";
import { Validator } from "../classes/Validator.js";
import { executeExercises } from "./exercises.js";

const canvas = document.getElementById("gameArea");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

executeExercises();

const STEP = 10;
let validator = new Validator();
let backgroundImage = new Image();
backgroundImage.src = "../../assets/sprites/desert.png";

let mario = new Player("Mario", "../../assets/sprites/mario.png", 32, 39, 0, 0, canvas, STEP);
let george = new Player("George", "../../assets/sprites/george.png", 29, 32, 100, 100, canvas, STEP);

const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(backgroundImage,0,0);
}

const redrawPlayers = (direction) => {
    clearCanvas();
    george.draw(context, direction);
    mario.draw(context, direction);
}

window.onload = () => {
    redrawPlayers("down");
};

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp": { validator.validateUp(george); redrawPlayers("up"); break; }
        case "ArrowDown": { validator.validateDown(george); redrawPlayers("down");  break; }
        case "ArrowLeft": { validator.validateLeft(george); redrawPlayers("left");  break; }
        case "ArrowRight": { validator.validateRight(george); redrawPlayers("right");  break; }

        case "w": { validator.validateUp(mario); redrawPlayers("up");  break; }
        case "s": { validator.validateDown(mario); redrawPlayers("down");  break; }
        case "a": { validator.validateLeft(mario); redrawPlayers("left");  break; }
        case "d": { validator.validateRight(mario); redrawPlayers("right");  break; }
    }
});