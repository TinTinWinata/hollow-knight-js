import { BOSS_CONF, GET_BOSS_GHOST_SPRITE } from "../facade/file.js";
import { GAME } from "../game.js";
import { Character } from "../parent/character.js";

export class Ghost extends Character {
  static Generate(backward, x, y, w) {
    const sprite = GET_BOSS_GHOST_SPRITE();

    const inc = backward ? 0 : w - 30;

    const ghost = new Ghost(
      x + inc,
      y + 365,
      150,
      150,
      sprite,
      BOSS_CONF.ghost_die,
      true,
      true
    );
    ghost.backward = !backward;
    const game = GAME.getInstance();
    game.characters.push(ghost);
  }
  checkState() {
    if (this.spriteIdx >= this.config.max - 1) {
      this.vx = 0;
      this.vy = 0;
    }
  }

  checkMovement() {
    // this.vy += 50;
    if (this.backward) {
      this.vx += 100;
    } else {
      this.vx += -100;
    }
  }

  parentMethod() {
    this.checkMovement();
    this.checkState();
  }
}
