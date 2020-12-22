/*APP*/
const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

/*HTTP SERVER*/
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 5000;

http.listen(port, () => {
    console.log(`[SERVER STARTED AT PORT ${port}]`);
});

/*IMPORTS*/
const SpaceRanger = require("./models/space_ranger.js");
const PinkLady = require("./models/pink_lady.js");
const Game = require("./models/game.js");
const Bullet = require("./models/bullet.js");

/*GLOBALS*/
const chatUsers = {};
const games = {};
const players = {};
const bullets = {};

/*FUNCTIONS*/
const gameLoop = (roomId) => {
    const game = games[roomId];
    if (game) {
        game.update();

        if (game.over) {
            const playersToRemoveIds = game.players.map((player) => {
                return player.socketId;
            })
            clearInterval(game.gameInterval);
            delete games[roomId];
            playersToRemoveIds.forEach((playerToRemoveId) => {
                delete players[playerToRemoveId];
                delete bullets[playerToRemoveId];
            })
            io.to(roomId).emit('game-over', game.winner + '-won', roomId);
        } else {
            const objectsForDraw = [];
            game.players.forEach((player) => {
                objectsForDraw.push(player.forDraw());
                objectsForDraw.push(player.hpForDraw());
            });
            game.diamonds.forEach((diamond) => {
                objectsForDraw.push(diamond.forDraw());
            });
            game.bullets.forEach((bullet) => {
                objectsForDraw.push(bullet.forDraw());
            });
            const data = {
                objectsForDraw: objectsForDraw,
                gameInProgress: game.players.length == 2,
            }
            if (data.gameInProgress) {
                data.score = {
                    "space-ranger": game.players[0].score,
                    "pink-lady": game.players[1].score,
                }
            }
            io.to(roomId).emit("game-loop", data);
        }
    }
}

/*SOCKET IO CONNECTION (SERVER SIDE)*/
io.on("connection", (socket) => {
    console.log(`[NEW SOCKET HAS CONNECTED WITH ID ${socket.id}]`);
    socket.join("menu");
    Object.keys(games).forEach((gameId) => {
        if (games[gameId].players.length == 1) {
            socket.emit("add-game-to-list", { gameName: games[gameId].name, gameId: gameId });
        }
    });

    socket.on("join-chat", (userName) => {
        console.log(`[USER HAS JOINED CHAT WITH ID ${socket.id} AND NAME ${userName}]`);
        chatUsers[socket.id] = userName;
        socket.join("chat");
        socket.emit("joined-chat");
    });

    socket.on("send-message", (message) => {
        console.log(`[USER WITH ID ${socket.id} SENT THE MESSAGE ${message}]`);
        io.to("chat").emit("new-message", `${chatUsers[socket.id]}: ${message}`);
    });

    socket.on("leave-chat", () => {
        console.log(`[USER HAS LEFT CHAT WITH ID ${socket.id}]`);
        delete chatUsers[socket.id];
        socket.leave("chat");
        socket.emit("menu");
    });

    socket.on("create-game", (gameName) => {
        console.log(`[NEW GAME CREATED WITH NAME ${gameName}]`);
        const gameId = "game-" + socket.id;
        players[socket.id] = new SpaceRanger({ gameId: gameId, socketId: socket.id });
        const game = new Game({
            id: gameId,
            players: [players[socket.id]],
            name: gameName,
        });
        games[gameId] = game;
        console.log(`[USER JINED THE ROOM WITH GAME ID ${gameId}]`);
        socket.join(gameId);
        io.to("menu").emit("add-game-to-list", {
            gameName: gameName,
            gameId: gameId,
        });
    });

    socket.on("start-moving-player", (direction) => {
        if (players[socket.id]) {
            if (games[players[socket.id].gameId].players.length != 2) {
                return;
            }
            players[socket.id].startMoving(direction);
            //console.log("[MOVE PLAYER] ", direction);
        }
    });
    socket.on("stop-moving-player", (axis) => {
        if (players[socket.id]) {
            if (games[players[socket.id].gameId].players.length != 2) {
                return;
            }
            players[socket.id].stopMoving(axis);
            //console.log("[STOP PLAYER] ", axis);
        }
    });
    socket.on("join-game", (gameId) => {
        console.log(`[SOCKET ${socket.id} JOINED GAME ${gameId}]`);
        players[socket.id] = new PinkLady({ gameId: gameId, socketId: socket.id });
        games[gameId].players.push(players[socket.id]);
        games[gameId].generateDiamonds();
        socket.join(gameId);
        io.to("menu").emit("remove-game-from-list", gameId);
    });

    socket.on("disconnect", () => {
        console.log(`[SOCKET HAS DISCONNECTED WITH ID ${socket.id}]`);
        if (players[socket.id]) {
            const gameId = players[socket.id].gameId;
            const game = games[gameId];
            const playersToRemoveIds = game.players.map((player) => {
                return player.socketId;
            });
            clearInterval(game.gameInterval);
            delete games[gameId];
            playersToRemoveIds.forEach((playerToRemoveId) => {
                delete players[playerToRemoveId];
                delete bullets[playerToRemoveId];
            });
            io.to(gameId).emit("game-over", "A player disconnected", gameId);
        }
    });
    socket.on("back-to-menu", (gameId) => {
        socket.leave(gameId);
        socket.emit("menu");
    });
    socket.on("attack", () => {
        if (players[socket.id]) {
            if (games[players[socket.id].gameId].players.length != 2) {
                return;
            }
            if (bullets[socket.id])
                return;
            bullets[socket.id] = new Bullet(players[socket.id])
            const game = games[players[socket.id].gameId];
            game.bullets.push(new Bullet(players[socket.id]));
        }
    })
});

/*EXPORTS*/
module.exports.gameLoop = gameLoop;
module.exports.games = games;
module.exports.bullets = bullets;