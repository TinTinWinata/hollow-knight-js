import { GAME } from "../data.js";
import { Character } from "../parent/character.js";
import { Setting } from "../setting.js";

export class Player extends Character {
  move() {}

  parentMethod() {
    if (this.game.keys[Setting.PLAYER_MOVEMENT_RIGHT]) {
      this.vx += this.speedX;
    } else if (this.game.keys[Setting.PLAYER_MOVEMENT_LEFT]) {
      this.vx -= this.speedX;
    } else {
      this.vx = 0;
    }
  }

  jump() {
    this.vy -= this.jumpForce;
  }

  constructor(x, y, w, h, sprite, maxSprite) {
    super(x, y, w, h, sprite, maxSprite);
  }
}
