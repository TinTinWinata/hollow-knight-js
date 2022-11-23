import { GAME } from "../data";

export class Particle {
  static emit(x, y, w, h, sprite, config) {
    const game = GAME.getInstance();
    const particle = new this(x, y, w, h, sprite, config);
    game.particles.push(particle);
  }

  constructor(x, y, w, h, sprite, config) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.config = config;
    this.dead = false;
    this.idx = 0;
    this.interval = 0;
  }

  checkDeath() {
    if (this.idx == this.config.max - 1) {
      this.dead = true;
    }
  }

  incrementIdx() {
    this.interval += 1;
    if (this.interval >= this.config.speed) {
      this.interval = 0;
      this.idx += 1;
    }
  }
  render() {
    this.checkDeath();
    const game = GAME.getInstance();
    if (!this.dead) {
      game.ctx.drawImage(this.sprite[this.idx], this.x, this.y, this.w, this.h);
    }
    this.incrementIdx();
  }
}
