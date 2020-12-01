class Validator {
    validateUp(player) {
        player.y >= player.topLimit ? player.move("up") : console.log(`${player.name}: Top limit reached`);
    }
    validateDown(player) {
        player.y <= player.botLimit ? player.move("down") : console.log(`${player.name}: Bot limit reached`);
    }
    validateLeft(player) {
        player.x >= player.leftLimit ? player.move("left") : console.log(`${player.name}: Left limit reached`);
    }
    validateRight(player) {
        player.x <= player.rightLimit ? player.move("right") : console.log(`${player.name}: Right limit reached`);
    }
}
module.exports = Validator;