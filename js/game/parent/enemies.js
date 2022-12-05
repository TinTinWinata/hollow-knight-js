import { Character } from "./character.js";

export class Enemy extends Character {
  constructor(x, y, w, h, sprite, config) {
    super(x, y, w, h, sprite, config);
  }
  checkBound() {
    if (this.x + this.vx < 0 || this.x + this.w + this.vx > this.game.width) {
      this.vx = 0;
      this.backward = !this.backward;
      /* Logging a message to the console. */
      console.log("checking enemy bound : ", this.backward);
      return true;
    }
    return false;
  }
}
