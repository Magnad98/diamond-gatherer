import { Player } from "../classes/Player.js";
import { executeExercises } from "./exercises.js";

const canvas = document.getElementById("gameArea");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

executeExercises();

const STEP = 10;

let mario = new Player("Mario", "../../assets/sprites/mario.png", 32, 39, 0, 0, canvas, STEP);
let george = new Player("George", "../../assets/sprites/george.png", 40, 45, 100, 100, canvas, STEP);

const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
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
        case "ArrowUp": { george.y >= george.topLimit ? george.y -= STEP : console.log(`${george.name}: Top limit reached`); break; }
        case "ArrowDown": { george.y <= george.botLimit ? george.y += STEP : console.log(`${george.name}: Bot limit reached`); break; }
        case "ArrowLeft": { george.x >= george.leftLimit ? george.x -= STEP : console.log(`${george.name}: Left limit reached`); break; }
        case "ArrowRight": { george.x <= george.rightLimit ? george.x += STEP : console.log(`${george.name}: Right limit reached`); break; }

        case "w": { mario.y >= mario.topLimit ? mario.y -= STEP : console.log(`${mario.name}: Top limit reached`); break; }
        case "s": { mario.y <= mario.botLimit ? mario.y += STEP : console.log(`${mario.name}: Bot limit reached`); break; }
        case "a": { mario.x >= mario.leftLimit ? mario.x -= STEP : console.log(`${mario.name}: Left limit reached`); break; }
        case "d": { mario.x <= mario.rightLimit ? mario.x += STEP : console.log(`${mario.name}: Right limit reached`); break; }
    }
    redrawPlayers();
});