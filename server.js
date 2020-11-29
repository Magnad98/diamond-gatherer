//class imports
const Player = require("./public/js/classes/Player.js");
const Validator = require("./public/js/classes/Validator.js");
const Game = require("./public/js/classes/Game.js");

const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 5000;

const PLAYER_DIM = 32;
const PLAYER_STEP = 10;
let validator = new Validator();

let counter = 0;
let usersOnline = 0;

const chatUsers = {};
const games = {};

const gameLoop = (id) => {
    const objectsForDraw = [];
    games[id].players.forEach((player) => {
        objectsForDraw.push(player.forDraw());
    });
    io.to(id).emit("game-loop", objectsForDraw);
}
const startPlayerMovement = (key) => {
    let start = false;
    let bindedKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    bindedKeys.forEach((bindedKey) => {
        console.log(key, key == bindedKey);
        if (key == bindedKey)
            start = true;
    });
    return start;
};

http.listen(port, () => {
    console.log(`[SERVER STARTED AT PORT ${port}]`);
})

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
})

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
    console.log(`[SOCKET CONNECTED WITH ID ${socket.id}]`);

    socket.on("join-chat", (userName) => {
        console.log(`[USER ${userName} JOINED THE CHAT WITH ID ${socket.id}]`);
        chatUsers[socket.id] = userName;
        socket.join("chat");
        socket.emit("joined-chat");
        usersOnline++;
        socket.join("users-online");
        io.to("chat").emit("new-message", userName, "joined chat");
        io.to("users-online").emit("update-users-online", usersOnline);
    });

    socket.on("send-message", (message, color) => {
        let userName = chatUsers[socket.id];
        console.log(`[USER ${userName} SENT THE MESSAGE ${message}]`);
        io.to("chat").emit("new-message", `${chatUsers[socket.id]}: `, message, color);
        io.to("users-online").emit("update-users-online", usersOnline);
    });

    socket.on("leave-chat", () => {
        let userName = chatUsers[socket.id];
        console.log(`[USER ${userName} LEFT THE CHAT WITH ID ${socket.id}]`);
        delete chatUsers[socket.id];
        socket.leave("chat");
        socket.emit("menu");
        usersOnline--;
        socket.leave("users-online");
        io.to("chat").emit("new-message", userName, "left chat");
        io.to("users-online").emit("update-users-online", usersOnline);
    });

    socket.on("create-game", (gameName, canvas) => {
        console.log("[NEW GAME CREATED]");
        const gameId = "game-" + socket.id;
        const players = [new Player({
            name: "Ranger",
            canvas: canvas,
            step: PLAYER_STEP,
            playerDim: PLAYER_DIM,
            x: 80,
            y: 127,
            dx: 0,
            dy: 0,
            imageId: "space-ranger",
            direction: "down",
            imageStartPoints: {
                right: [193, 225],
                left: [131, 161],
                down: [65, 98],
                up: [0, 33],
            }
        })];
        const game = new Game({
            id: gameId,
            players: players,
            gameLoop: gameLoop,
        });
        games[gameId] = game;
        console.log(`[User joined ${gameId}] room`);
        socket.join(gameId);
    });

    socket.on("key-pressed", (key) => {
        if (startPlayerMovement(key)) {
            const gameId = "game-" + socket.id;
            const ranger = games[gameId].players[0];

            switch (key) {
                case "ArrowUp":
                    { validator.validateUp(ranger); break; }
                case "ArrowDown":
                    { validator.validateDown(ranger); break; }
                case "ArrowLeft":
                    { validator.validateLeft(ranger); break; }
                case "ArrowRight":
                    { validator.validateRight(ranger); break; }
            }
        }
    });

    socket.on("get-counter-value", () => {
        socket.emit("counter-value", counter);
    });

    socket.on("increment-counter", (incrementedCounter) => {
        counter = incrementedCounter;
        socket.emit("incremented-counter-value", counter);
    });
});