//class imports
const Player = require("./public/js/classes/Player.js");

const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 5000;

const PLAYER_DIM = 32;

http.listen(5000, () => {
    console.log('[SERVER STARTED AT PORT 5000]');
})

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

app.use(express.static(__dirname + '/public'));

io.on("connection", (socket) => {
    console.log("[SOCKET CONNECTED]" + socket.id);

    socket.on("join-chat", (userName) => {
        console.log("[USER JOINED CHAT]", socket.id, userName);
        chatUsers[socket.id] = userName;
        socket.join("chat");
        socket.emit("joined-chat");
    });

    socket.on("send-message", (message) => {
        console.log("[USER SENT MESSAGE]", message);
        io.to("chat").emit("new-message", `${chatUsers[socket.id]}: ${message}`);
    });

    socket.on("leave-chat", () => {
        console.log("[USER LEFT CHAT]", socket.id);
        delete chatUsers[socket.id];
        socket.leave("chat");
        socket.emit("menu");
    });

    socket.on("create-game", (gameName) => {
        console.log("[NEW GAME CREATED]");
        const gameId = "game-" + socket.id;
        const players = [new Player({
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
        });
        games[gameId] = game;
        console.log(`[User joined ${gameId}] room`);
        socket.join(gameId);
    });

    socket.on("key-pressed", (key) => {
        const gameId = "game-" + socket.id;
        const player = games[gameId].players[0];
        switch (key) {
            case "ArrowUp":
                {
                    player.y -= 10;
                    break;
                }
            case "ArrowDown":
                {
                    player.y += 10;
                    break;
                }
            case "ArrowLeft":
                {
                    player.x -= 10;
                    break;
                }
            case "ArrowRight":
                {
                    player.x += 10;
                    break;
                }
        }
    });
});

class Game {
    constructor(options) {
        this.id = options.id;
        this.players = options.players;
        this.start();
    }
    start() {
        setInterval(
            () => {
                gameLoop(this.id)
            },
            1000 / 60
        );
    }
}

const gameLoop = (id) => {
    const objectsForDraw = [];
    games[id].players.forEach((player) => {
        objectsForDraw.push(player.forDraw());
    });
    io.to(id).emit("game-loop", objectsForDraw);
}

const chatUsers = {};
const games = {};