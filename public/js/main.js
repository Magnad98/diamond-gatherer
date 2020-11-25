const { isContext } = require("vm");

const socket = io();
//addCOntext
document.getElementById("join-chat-button").addEventListener("click", () => {
    const input = document.getElementById("user-name-input");
    const userName = input.value;
    if (userName.length > 0) {
        document.getElementById("user-name-missing").classList.add("display-none");
        socket.emit("join-chat", userName);
    } else {
        document.getElementById("user-name-missing").classList.remove("display-none");
    }
});

socket.on("joined-chat", () => {
    console.log("you joined chat!");
    document.getElementById("joined-chat").classList.add("display-none");
    document.getElementById("chat-container").classList.remove("display-none");
});

document.getElementById("send-message-button").addEventListener("click", () => {
    const message = input.value;
    socket.emit('send-message', message);
});

socket.on("new-message", (message) => {
    const mesageContainer = document.getElementById("chat-messages");
    const messageElement = document.getElementById("p");
    messageElement.innerHTML = message;
    messageContainer.appendChild(messageElement);
});

document.getElementById("leave-chat-button").addEventListener("click", () => {
    //socket.
});

socket.on("menu", () => {
    console.log("you left chat!");
    document.getElementById("join-chat").classList.remove("display-none");
    document.getElementById("chat-container").classList.add("display-none");
});


document.getElementById("create-game-button").addEventListener("click", () => {
    const input = document.getElementById("game-name-input");
    const gameName = input.value;
    if (gameName.length > 0) {
        document.getElementById("game-name-missing").classList.add("display-none");
        socket.emit("create-game", gameName);
    } else {
        document.getElementById("game-name-missing").classList.remove("display-none");
    }
});

socket.on("game-loop", (objectsForDraw) => {
    document.getElementById("join-chat").classList.add("display-none");
    document.getElementById("create-game-container").classList.add("display-none");
    document.getElementById("game-container").classList.remove("display-none");
    context.drawImage(document.getElementById("map-image"), 0, 0);

    objectsForDraw.forEach((objectsForDraw) => {
        console.log(objectsForDraw);
        context.drawImage(
            document.getElementById(objectsForDraw.imageId),
            ...objectsForDraw.drawImageParameters
        );
    });
});