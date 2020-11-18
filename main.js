import {Animal} from "./animal.js";

const canvas = document.getElementById("gameArea");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

/*const myPet = new Animal("Rocky");
myPet.canEat();*/

/*context.fillStyle = "red";
context.fillRect(280,20,40,20);*/

const george = new Image();
george.src = "./images/Puppy.jpg";
const GEORGE_WIDTH = 40;
const GEORGE_HEIGHT= 45;
let georgeX = 100;
let georgeY = 100;
george.onload = () => {
    context.drawImage(george, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, 100, 100, GEORGE_WIDTH, GEORGE_HEIGHT)
}

const mario = new Image();
mario.src = "./images/Puppy.jpg";
const MARIO_WIDTH = 32;
const MARIO_HEIGHT= 39;

mario.onload = () => {
    context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 0, 0, MARIO_WIDTH, MARIO_HEIGHT)
}

const button = document.getElementById("myButton");
button.addEventListener("click", function () {
    console.log(this);
    context.fillStyle = "green";
    context.fillRect(280,420,40,20);
})

document.addEventListener("keydown", (event) => {
    context.clearRect(0,0,400,600);
    switch(event.key){
        case "ArrowUp": {
            georgeY-=10;
            break;
        }
        case "ArrowDown": {
            georgeY+=10;
            break;
        }
        case "ArrowLeft": {
            georgeX-=10;
            break;
        }
        case "ArrowRight": {
            georgeX+=10;
            break;
        }
    }
    context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 0, 0, MARIO_WIDTH, MARIO_HEIGHT)

    context.drawImage(george, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT)

})



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

window.onload = () => {
    //console.log(developer);
};