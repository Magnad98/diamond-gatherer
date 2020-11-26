const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 5000;

const PLAYER_DIM = 32;

let counter = 0;

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

    socket.on("send-message", (message, color) => {
        console.log("[USER SENT MESSAGE]", message, color);
        io.to("chat").emit("new-message", `${chatUsers[socket.id]}: `, message, color);
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
        const players = [new Player()];
        const game = new Game({
            id: gameId,
            players: players,
        });
        games[gameId] = game;
        console.log(`[User joined ${gameId}] room`);
        socket.join(gameId);
    });

    socket.on("get-counter-value", () => {
        socket.emit("counter-value", counter);
    });

    socket.on("increment-counter", (incrementedCounter) => {
        counter = incrementedCounter;
        socket.emit("incremented-counter-value", counter);
    });
});

class Player {
    constructor(options) {
        this.x = 80;
        this.y = 127;
        this.dx = 0;
        this.dy = 0;
        this.imageId = "space-ranger";
        this.direction = "down";
        this.imageStartPoints = {
            right: [193, 225],
            left: [131, 161],
            down: [65, 98],
            up: [0, 33],
        };
    }
    forDraw() {
        return {
            imageId: this.imageId,
            drawImageParameters: [
                this.imageStartPoints[this.direction][0],
                0,
                PLAYER_DIM,
                PLAYER_DIM,
                this.x,
                this.y,
                PLAYER_DIM,
                PLAYER_DIM,
            ],
        };
    }
}
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