const Player = require("./player.js");
const constants = require("./constants.js");

class PinkLady extends Player {
    constructor(options) {
        super(options);
        this.x = 834;
        this.y = 551;
        this.imageId = "pink-lady";
        this.imageStartPoints = {
            right: [193, 225],
            left: [131, 163],
            down: [65, 98],
            up: [0, 33],
        };
        this.base = constants.BASES.PINK_LADY;
    }
}

module.exports = PinkLady;