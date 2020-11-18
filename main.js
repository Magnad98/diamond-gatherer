import { DrawScottishFlag, DrawFlag } from "./canvas.js";

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
    console.log(developer);
    DrawScottishFlag(200, 100, "#187BCD", "#FFFFFF", 10);
    /*gameArea = document.getElementById("gameArea");
    gameArea.addEventListener("keydown", (event)=>{
        console.log(event.key);
        Move(event.key);
    });*/
};

//DrawFlag(document.getElementById("gameArea").getContext("2d"), 200, 100, "#187BCD", "#FFFFFF", 10);

/*document.addEventListener("keydown", (event)=>{
    console.log(event.key);
    Move(event.key);
});

const Move = (key) => {
    console.log(key);
    let canvas = document.getElementById("gameArea");
    let context = canvas.getContext("2d");

    let offsetToImageCenter = {
        width: 400,//canvas.width / 2 - width / 2,
        height: 600,//canvas.height / 2 - height / 2,
    };

    let distance = 10;
    let axis = GetAxis(key);

    offsetToImageCenter.width += axis.x * distance;
    offsetToImageCenter.height += axis.y * distance

    RedrawCanvas(context);
    DrawScottishFlag(context, offsetToImageCenter, width, height, mainColor, secondColor, lineWidth);
};

const GetAxis = (key) => {
    switch(key){
        case "ArrowUp": return {
            x:0,
            y:-1,
        };
        case "ArrowDown": return {
            x:0,
            y:1,
        };
        case "ArrowLeft": return {
            x:-1,
            y:0,
        };
        case "ArrowRight": return {
            x:1,
            y:0,
        };
        default:return {
            x:0,
            y:0,
        };
    }
};

const RedrawCanvas = (canvas) => {
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
};*/
