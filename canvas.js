
export const DrawScottishFlag = (width, height, mainColor, secondColor, lineWidth) => {
    let canvas = document.getElementById("gameArea");
    let context = canvas.getContext("2d");

    let offsetToImageCenter = {
        width: canvas.width / 2 - width / 2,
        height: canvas.height / 2 - height / 2,
    };

    DrawFlag(context, offsetToImageCenter, width, height, mainColor, secondColor, lineWidth);
}

const DrawFlag = (context, offset, width, height, mainColor, secondColor, lineWidth) => {
    let startX = offset.width;
    let startY = offset.height;
    let endX = offset.width + width;
    let endY = offset.height + height;

    DrawRect(context, startX, startY, endX, endY, mainColor);
    DrawLine(context, startX, startY, endX, endY, secondColor, lineWidth);
    DrawLine(context, endX, startY, startX, endY, secondColor, lineWidth);
};

const DrawRect = (context, startX, startY, endX, endY, color) => {
    context.fillStyle = color;

    context.fillRect(startX, startY, endX - startX, endY - startY);
};

const DrawLine = (context, startX, startY, endX, endY, color, lineWidth) => {
    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
};