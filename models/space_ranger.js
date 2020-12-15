const Player = require("./player");
const constants = require("./constants.js");

class SpaceRanger extends Player {
    constructor(options) {
        super(options);
        this.x = 80;
        this.y = 127;
        this.imageId = "space-ranger";
        this.imageStartPoints = {
            right: [193, 225],
            left: [131, 161],
            down: [65, 98],
            up: [0, 33],
        };
        this.base = constants.BASES.SPACE_RANGER;
    }
}

module.exports = SpaceRanger;