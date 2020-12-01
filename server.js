const Player = require("./Models/Player.js");
const Game = require("./Models/Game.js");

const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 5000;

const PLAYER_DIM = 32;
const chatUsers = {};
const games = {};

let counter = 0;

const gameLoop = (id) => {
    const objectsForDraw = [];
    games[id].players.forEach((player) => {
        objectsForDraw.push(player.forDraw());
    });
    io.to(id).emit("game-loop", objectsForDraw);
}

http.listen(port, () => {
    console.log(`[SERVER STARTED AT PORT ${port}]`);
})

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.get("/about", (request, response) => {
    response.sendFile(__dirname + "/about.html");
});

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
    console.log(`[SOCKET CONNECTED WITH ID ${socket.id}]`);

    socket.on("join-chat", (userName) => {
        console.log(`[USER ${userName} JOINED THE CHAT WITH ID ${socket.id}]`);
        chatUsers[socket.id] = userName;
        socket.join("chat");
        socket.emit("joined-chat");
        io.to("chat").emit("new-message", userName, "joined chat");
        io.to("chat").emit("update-users-online", Object.keys(chatUsers).length);
    });

    socket.on("send-message", (message, color) => {
        let userName = chatUsers[socket.id];
        console.log(`[USER ${userName} SENT THE MESSAGE ${message}]`);
        io.to("chat").emit("new-message", `${chatUsers[socket.id]}: `, message, color);
        io.to("chat").emit("update-users-online", Object.keys(chatUsers).length);
    });

    socket.on("leave-chat", () => {
        let userName = chatUsers[socket.id];
        console.log(`[USER ${userName} LEFT THE CHAT WITH ID ${socket.id}]`);
        delete chatUsers[socket.id];
        socket.leave("chat");
        socket.emit("menu");
        io.to("chat").emit("new-message", userName, "left chat");
        io.to("chat").emit("update-users-online", Object.keys(chatUsers).length);
    });

    socket.on("create-game", (gameName) => {
        console.log("[NEW GAME CREATED]");
        const gameId = "game-" + socket.id;
        const players = [new Player({
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
            },
            playerDim: PLAYER_DIM,
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

    socket.on("get-counter-value", () => {
        socket.join("counterRoom");
        io.to("counterRoom").emit("counter-value", counter);
    });
    socket.on("increment-counter", () => {
        counter++;
        io.to("counterRoom").emit("counter-value", counter);
    });
});