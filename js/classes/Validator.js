export class Validator {
    validateUp(player) {
        player.y >= player.topLimit ? player.y -= player.step : console.log(`${player.name}: Top limit reached`);
    }
    validateDown(player){
        player.y <= player.botLimit ? player.y += player.step : console.log(`${player.name}: Bot limit reached`);
    }
    validateLeft(player){
        player.x >= player.leftLimit ? player.x -= player.step : console.log(`${player.name}: Left limit reached`);
    }
    validateRight(player){
        player.x <= player.rightLimit ? player.x += player.step : console.log(`${player.name}: Right limit reached`);
    }
}