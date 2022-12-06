import { GAME } from "../data.js";

export class Particle {
  static emit(x, y, w, h, sprite, config, backward, callback = null) {
    const game = GAME.getInstance();
    const particle = new this(x, y, w, h, sprite, config, backward);
    game.particles.push(particle);
    if (callback) {
      callback();
    }
  }

  constructor(x, y, w, h, sprite, config, backward) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.config = config;
    this.dead = false;
    this.spriteIdx = 0;
    this.interval = 0;
    this.backward = backward;
  }

  checkDeath() {
    if (this.spriteIdx >= this.config.max - 1) {
      this.dead = true;
    }
  }

  incrementIdx() {
    this.interval += 1;
    if (this.interval >= this.config.speed) {
      this.interval = 0;
      this.spriteIdx += 1;
    }
  }
  render() {
    if (!this.dead) {
      const game = GAME.getInstance();
      if (this.backward) {
        game.ctx.save();
        game.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        game.ctx.scale(-1, 1);
        game.ctx.drawImage(
          this.sprite[this.spriteIdx],
          -this.w / 2,
          -this.h / 2,
          this.w,
          this.h
        );
        game.ctx.restore();
      } else {
        game.ctx.drawImage(
          this.sprite[this.spriteIdx],
          this.x,
          this.y,
          this.w,
          this.h
        );
      }
      this.checkDeath();
      this.incrementIdx();
    }
  }
}
