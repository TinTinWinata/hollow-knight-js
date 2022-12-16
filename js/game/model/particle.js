import { GAME } from "../game.js";
import {
  GET_HIT,
  GET_PLAYER_HITTED,
  HIT_CONF,
  PLAYER_CONF,
} from "../facade/file.js";
import { getRandomFromArray } from "../facade/helper.js";

export class Particle {
  static PlayerHit(x, y) {
    const w = 500;
    const h = 500;
    const offsetX = 100;
    const offsetY = 400;
    Particle.Emit(
      x - offsetX,
      y - offsetY,
      w,
      h,
      GET_PLAYER_HITTED(),
      PLAYER_CONF.hitted,
      false,
      0
    );
  }
  static HitParticle(x, y, backward = false) {
    const w = 500;
    const h = 100;
    const offsetX = -60;
    const offsetY = -30;
    const degree = getRandomFromArray([60, 30, 90, 120, 150]);
    Particle.Emit(
      x + offsetX,
      y + offsetY,
      w,
      h,
      GET_HIT(),
      HIT_CONF.enemy,
      backward,
      null,
      degree
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

  renderWithDegree(degree, game) {
    game.ctx.save();
    game.ctx.translate(this.x, this.y);
    game.ctx.rotate((degree * Math.PI) / 360);
    game.ctx.drawImage(this.sprite[this.spriteIdx], -this.w / 2, -this.h / 2);
    game.ctx.restore();
  }

  render() {
    if (!this.dead) {
      const game = GAME.getInstance();
      // Render If there's any degree then rotate correspond with the degree
      if (this.degree > 0) {
        this.renderWithDegree(this.degree, game);
      } else {
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
      }
      this.checkDeath();
      this.incrementIdx();
    }
  }
}
