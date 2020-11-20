const canvas = document.getElementById("secondPageCanvas");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

const getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
};

const getRandomValue = (minimumValue, maximumValue) => {
    return Math.floor(Math.random() * maximumValue) + minimumValue;
};

document.getElementById("drawSquareButton").addEventListener("click", () => {
    context.fillStyle = getRandomColor();

    let length = getRandomValue(30, 80);
    let square = {
        x: getRandomValue(0, canvas.width - length),
        y: getRandomValue(0, canvas.height - length),
        length,
    }

    context.fillRect(square.x, square.y, square.length, square.length);
});