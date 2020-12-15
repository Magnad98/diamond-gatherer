const constants = require("./constants.js");

const THRESHOLD = 50;
const RIGHT_EDGE = constants.MAP.width - 2 * THRESHOLD;
const DOWN_EDGE = constants.MAP.height - 2 * THRESHOLD;

const SPACE_RANGER_BASE_LIMIT = {
    xLeft: constants.BASES.SPACE_RANGER.y,
    xRight: constants.BASES.SPACE_RANGER.x + constants.BASES.SPACE_RANGER.width,
    yLeft: constants.BASES.SPACE_RANGER.y,
    yRight: constants.BASES.SPACE_RANGER.y + constants.BASES.SPACE_RANGER.height,
}
const PINK_LADY_BASE_LIMIT = {
    xLeft: constants.BASES.PINK_LADY.y,
    xRight: constants.BASES.PINK_LADY.x + constants.BASES.PINK_LADY.width,
    yLeft: constants.BASES.PINK_LADY.y,
    yRight: constants.BASES.PINK_LADY.y + constants.BASES.PINK_LADY.height,
}

const getRandomCoordinates = () => {
    return {
        x: Math.floor(Math.random() * RIGHT_EDGE + THRESHOLD),
        y: Math.floor(Math.random() * DOWN_EDGE + THRESHOLD),
    }
}

const inBase = (base, coordinates) => {
    switch (base) {
        case "space-ranger":
            {
                if (
                    SPACE_RANGER_BASE_LIMIT.xLeft <= coordinates.x && coordinates.x <= SPACE_RANGER_BASE_LIMIT.xRight &&
                    SPACE_RANGER_BASE_LIMIT.yLeft <= coordinates.y && coordinates.y <= SPACE_RANGER_BASE_LIMIT.yRight
                )
                    return true;
                return false;
            }
        case "pink-lady":
            {
                if (PINK_LADY_BASE_LIMIT.xLeft <= coordinates.x && coordinates.x <= PINK_LADY_BASE_LIMIT.xRight &&
                    PINK_LADY_BASE_LIMIT.yLeft <= coordinates.y && coordinates.y <= PINK_LADY_BASE_LIMIT.yRight
                )
                    return true;
                return false;
            }
    }
}
const getCoordinates = () => {
    let coordinates = getRandomCoordinates();

    while (inBase("space-ranger", coordinates) || inBase("pink-lady", coordinates))
        coordinates = getRandomCoordinates();

    return coordinates;
}

class Diamond {
    constructor() {
        let coordinates = getCoordinates();
        this.x = coordinates.x;
        this.y = coordinates.y;
        this.imageId = "diamond";
        this.width = 26;
        this.height = 21;
    }
    forDraw() {
        return {
            imageId: this.imageId,
            drawImageParameters: [
                this.x,
                this.y,
            ],
        };
    }
}

module.exports = Diamond;