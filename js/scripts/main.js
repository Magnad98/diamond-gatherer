import { Player } from "../classes/Player.js";
import { executeExercises } from "./exercises.js";

const canvas = document.getElementById("gameArea");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

executeExercises();

const STEP = 10;

let Mario = new Player("Mario", "../../assets/sprites/mario.png", 32, 39, 0, 0, canvas, STEP);
let George = new Player("George", "../../assets/sprites/george.png", 40, 45, 100, 100, canvas, STEP);

const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

const redrawPlayers = () => {
    clearCanvas();
    George.Draw(context);
    Mario.Draw(context);
}

window.onload = () => {
    redrawPlayers();
};

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp": { George.y >= George.topLimit ? George.y -= STEP : console.log(`${George.name}: Top limit reached`); break; }
        case "ArrowDown": { George.y <= George.botLimit ? George.y += STEP : console.log(`${George.name}: Bot limit reached`); break; }
        case "ArrowLeft": { George.x >= George.leftLimit ? George.x -= STEP : console.log(`${George.name}: Left limit reached`); break; }
        case "ArrowRight": { George.x <= George.rightLimit ? George.x += STEP : console.log(`${George.name}: Right limit reached`); break; }
    
        case "w": { Mario.y >= Mario.topLimit ? Mario.y -= STEP : console.log(`${Mario.name}: Top limit reached`); break; }
        case "s": { Mario.y <= Mario.botLimit ? Mario.y += STEP : console.log(`${Mario.name}: Bot limit reached`); break; }
        case "a": { Mario.x >= Mario.leftLimit ? Mario.x -= STEP : console.log(`${Mario.name}: Left limit reached`); break; }
        case "d": { Mario.x <= Mario.rightLimit ? Mario.x += STEP : console.log(`${Mario.name}: Right limit reached`); break; }
    }
    redrawPlayers();
});



let developer = {
    firstName:"Alex",
    lastName: "Pop",
    age:21,
    occupation:"student",
    height:181,
    knowsJavascript: true,
    Walk: () => {
        console.log("Walking...");
    },
    SayHello: () => {
        console.log(`Hello! My name is ${this.firstName} ${this.lastName}!`);
    }
}

let Greet = (name) => {
    return `Buna, numele meu este ${name}`;
}

/* window.onload = () => {
    //console.log(developer);
}; */