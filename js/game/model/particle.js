import { GAME } from "../data.js";
import { GET_HIT, HIT_CONF } from "../facade/file.js";

export class Particle {
  static HitParticle(x, y, backward = false) {
    const w = 500;
    const h = 100;
    const game = GAME.getInstance();
    // game.addDebugs(x - w / 2, y + h / 2, w, h);
    Particle.Emit(
      x - w / 2,
      y + h / 2,
      w,
      h,
      GET_HIT(),
      HIT_CONF.enemy,
      backward,
      null,
      30
    );
  }

  static Emit(
    x,
    y,
    w,
    h,
    sprite,
    config,
    backward,
    callback = null,
    degree = 0
  ) {
    const game = GAME.getInstance();
    const particle = new this(x, y, w, h, sprite, config, backward, degree);
    game.particles.push(particle);
    if (callback) {
      callback();
    }
  }

  constructor(x, y, w, h, sprite, config, backward, degree = 0) {
    this.degree = degree;
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

      // Render If there's any degree then rotate correspond with the degree
      // if (this.degree > 0) {
      //   game.ctx.save();
      //   game.ctx.translate(game.canvas.width / 2, game.canvas.height / 2);
      //   game.ctx.rotate((this.degree * Math.PI) / 180);
      //   game.ctx.drawImage(
      //     this.sprite[this.spriteIdx],
      //     -this.w / 2,
      //     -this.h / 2
      //   );
      //   game.ctx.restore();
      // } else {
      // Render if backward ( rotate 180 )
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
        // Normal Rendering
        game.ctx.drawImage(
          this.sprite[this.spriteIdx],
          this.x,
          this.y,
          this.w,
          this.h
        );
      }
      // }
      this.checkDeath();
      this.incrementIdx();
    }
  }
}
