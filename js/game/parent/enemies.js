import { isInTheLeft } from "../facade/helper.js";
import { GAME } from "../game.js";
import { Character } from "./character.js";

export class Enemy extends Character {
  constructor(x, y, w, h, sprite, config, gravity = true) {
    super(x, y, w, h, sprite, config, gravity);
  }

  checkBound() {
    if (
      (this.backward && this.x + this.w + 1 > this.game.width) ||
      (!this.backward && this.x - 1 < 0)
    ) {
      this.vx = 0;
      this.backward = !this.backward;
      return true;
    }
    return false;
  }
}
