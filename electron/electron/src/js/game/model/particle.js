import { GAME } from "../game.js";
import {
  BARREL_PARTICLE_CONF,
  GET_BARREL_PARTICLE_SPRITE,
  GET_HIT,
  GET_PLAYER_BLAST_PARTICLE,
  GET_PLAYER_DASH_EFFECT,
  GET_PLAYER_HITTED,
  HIT_CONF,
  PLAYER_CONF,
} from "../facade/file.js";
import { getRandomFromArray } from "../facade/helper.js";
import { Setting } from "../setting.js";

export class Particle {
  static EmitAllParticle(x, y) {
    Particle.PlayerHit(x, y);
    Particle.HitParticle(x, y);
  }

  static BarrelParticle(x, y) {
    const w = 250;
    const h = 150;

    Particle.Emit(
      x - w / 2,
      y - h / 2,
      w,
      h,
      GET_BARREL_PARTICLE_SPRITE(),
      BARREL_PARTICLE_CONF,
      false,
      null,
      0
    );
  }

  static BlastParticle(x, y, backward) {
    const w = 300;
    const h = 300;
    const offsetX = backward ? 30 : -100;
    const offsetY = -70;
    Particle.Emit(
      x + offsetX,
      y + offsetY,
      w,
      h,
      GET_PLAYER_BLAST_PARTICLE(),
      PLAYER_CONF.blast_particle,
      !backward,
      null,
      0
    );
  }
  static PlayerHit(x, y) {
    const w = 500;
    const h = 500;
    const offsetX = w / 2 - 40;
    const offsetY = h / 2 - 40;
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
  static DashParticle(x, y, backward) {
    const w = 200;
    const h = 150;
    const offsetX = backward ? 150 : -200;
    const offsetY = 0;
    Particle.Emit(
      x + offsetX,
      y + offsetY,
      w,
      h,
      GET_PLAYER_DASH_EFFECT(),
      PLAYER_CONF.dash_effect,
      !backward,
      null,
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

  constructor(x, y, w, h, sprite, config, backward, degree = 0, callback) {
    this.degree = degree;
    this.callback = callback;
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
    const game = GAME.getInstance();
    this.interval += Setting.PARTICLE_SPEED * game.delta;
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

  renderDefault() {
    const game = GAME.getInstance();
    game.ctx.drawImage(
      this.sprite[this.spriteIdx],
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  renderBackward() {
    const game = GAME.getInstance();
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
  }

  checkCanBeRender() {
    if (this.sprite[this.spriteIdx] === undefined) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    if (!this.dead) {
      const game = GAME.getInstance();

      // Render If there's any degree then rotate correspond with the degree
      if (this.degree > 0) {
        this.renderWithDegree(this.degree, game);
      } else {
        if (!this.checkCanBeRender()) {
          return;
        }
        // Render if backward ( rotate 180 )
        if (this.backward) {
          this.renderBackward();
        } else {
          // Normal Rendering
          this.renderDefault();
        }
      }
      if (this.callback) {
        this.callback();
      }
      this.checkDeath();
      this.incrementIdx();
    }
  }
}
