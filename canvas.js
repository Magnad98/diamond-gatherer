export const DrawFlag = (context, startX, startY, width, height, mainColor, secondColor, lineWidth) => {
    let endX = startX + width;
    let endY = startY + height;

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