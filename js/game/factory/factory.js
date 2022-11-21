import { Background } from "../model/background.js";

export default function createBackground() {
  return (bg = new Background(
    0,
    0,
    game.width + 2000,
    game.height,
    GET_BG_FIRST(),
    game.ctx
  ));
}

export default function createPlayer(){
   return new Player(
    0,
    0,
    300,
    300,
    GET_PLAYER_SPRITE(),
    PLAYER_CONF.maxSprite
  );
}