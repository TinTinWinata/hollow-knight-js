import { Background } from "../model/background.js";

export function createBackground() {
  return (bg = new Background(
    0,
    0,
    game.width + 2000,
    game.height,
    GET_BG_FIRST(),
    game.ctx
  ));
}

export function createPlayer() {
  return new Player(0, 0, 300, 300, GET_PLAYER_SPRITE(), PLAYER_CONF.maxSprite);
}
