const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 5000;

const PLAYER_DIM = 32;
http.listen(port, () => {
    console.log(`[SERVER STARTED AT PORT ${port}]`);
})

app.get('/', (request, response) => {
    //console.log(__dirname);
    response.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
    console.log("[SOCKET CONNECTED" + socket.id);

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
        delete chatusers[socket.id];
        socket.leave("chat");
        socket.emit("menu");
    });

    socket.on("create-game", (gameName) => {
        console.log("[NEW GAME CREATED]");
        const gameId = "game-" + socket.id;
        const players = [new players()]
        const game = new Game({
            id: gameId,
        });
        games[gameId] = game;
        console.log("[USer joined " + gameId)
        socket.join(gameId);
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
            ]
        }
    }
}
class Game {
    constructor(options) {
        this.id = options.id;
        this.players = options.players;
        this.start();
    }
    start() {
        const that = this;
        setInterval(function() { gameLoop(that.id) }, 1000 / 60);
    }
}

const gameLoop = (id) => {
    const objectsForDraw = [];
    games[id].player.forEach(() => {
        objectsForDraw.push(player.forDraw())
    });
    io.to(id).emit("game-loop", objectsForDraw);
}
const chatUsers = {};
const games = {};