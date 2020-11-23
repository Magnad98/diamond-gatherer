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
let george = new Player("George", "../../assets/sprites/george.png", 40, 45, 100, 100, canvas, STEP);

const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(backgroundImage,0,0);
}

const redrawPlayers = () => {
    clearCanvas();
    george.draw(context);
    mario.draw(context);
}

window.onload = () => {
    redrawPlayers();
};

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp": { validator.validateUp(george); break; }
        case "ArrowDown": { validator.validateDown(george); break; }
        case "ArrowLeft": { validator.validateLeft(george); break; }
        case "ArrowRight": { validator.validateRight(george); break; }

        case "w": { validator.validateUp(mario); break; }
        case "s": { validator.validateDown(mario); break; }
        case "a": { validator.validateLeft(mario); break; }
        case "d": { validator.validateRight(mario); break; }
    }
    redrawPlayers();
});