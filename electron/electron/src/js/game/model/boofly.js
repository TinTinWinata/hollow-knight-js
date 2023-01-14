import { GAME } from "../game.js";
import {
  BOOFLY_CONF,
  CRAWLID_CONF,
  GET_BOOFLY_DIE,
  GET_BOOFLY_FLY,
  GET_CRAWLID_DIE,
  GET_CRAWLID_WALK,
} from "../facade/file.js";
import {
  checkBlockCollide,
  getDistance,
  isInTheLeft,
} from "../facade/helper.js";
import { Enemy } from "../parent/enemies.js";
import { Setting } from "../setting.js";
import { UI } from "./ui.js";
import { MyAudio } from "../facade/audio.js";

export class Boofly extends Enemy {
  static Generate(backward = false) {
    const game = GAME.getInstance();

    let getRightPos = true;

    let left = Math.random() < 0.5;

    let x;

    let y;

    if (left) {
      x = 0;
    } else {
      x = Setting.WIDTH - Setting.BOOFLY_WIDTH * game.scale;
    }
    y = Math.random() * (Setting.HEIGHT - 500 - 500) + 500;

    // while (getRightPos) {
    //   y = Math.random() * (Setting.HEIGHT - 500 - 500) + 500;

    //   game.objects.forEach((obj) => {
    //     if (y > obj.y && y < obj.y + obj.h) {
    //       getRightPos = false;
    //     }
    //   });
    // }
    const obj = new this(
      x,
      y,
      Setting.BOOFLY_WIDTH * game.scale,
      Setting.BOOFLY_HEIGHT * game.scale,
      GET_BOOFLY_FLY(),
      BOOFLY_CONF.fly,
      backward
    );

    game.enemies.push(obj);
    return obj;
  }

  constructor(x, y, w, h, sprite, config, backward) {
    super(x, y, w, h, sprite, config, false);
    super.speed = Setting.BOOFLY_SPEED;
    super.backward = backward;
    // super.canCollide = false;
    super.maxSpeed = Setting.BOOFLY_MAX_SPEED;
    this.chasing = false;
  }

  checkBackward() {
    const player = GAME.getInstance().player;
    if (isInTheLeft(player, this)) {
      this.backward = false;
    } else {
      this.backward = true;
    }
  }

  die() {
    this.game.audio.play(MyAudio.VENGE_DIED, false);

    this.checkBackward();
    const knockback = this.backward
      ? -Setting.KNOCKBACK_POWER
      : Setting.KNOCKBACK_POWER;
    this.vx += knockback;
    this.spriteIdx = 0;
    this.sprite = GET_BOOFLY_DIE();
    this.config = BOOFLY_CONF.die;
    this.canCollide = true;
    this.gravity = true;
    this.dead = true;
    UI.getInstance().incrementMoney();

    // Checking killed enemy already max
    const game = GAME.getInstance();
    game.killedCrawlid += 1;
    game.checkCrawlidKilled();
  }

  hit() {
    if (!this.dead) this.die();
  }

  moveTo(player) {
    if (isInTheLeft(player, this)) {
      this.backward = false;
    } else {
      this.backward = true;
    }
    const vectorx = player.x - this.x;
    const vectory = player.y - this.y;
    const distance = getDistance(player.x, player.y, this.x, this.y);
    const speedx = this.x / distance;
    const speedy = this.y / distance;

    this.vx += vectorx * speedx * this.game.delta;
    this.vy += vectory * speedy * this.game.delta;
  }

  checkChase() {
    const rad = Setting.BOOFLY_CHECK_RADIUS;
    const x = this.x - rad;
    const y = this.y - rad;
    const w = 2 * rad;
    const h = 2 * rad;
    // this.game.debug(x, y, w, h, "yellow");
    if (this.game.player.isCollideBlock(x, y, w, h)) {
      this.moveTo(this.game.player);

      this.maxSpeed = Setting.BOOFLY_MAX_CHASE_SPEED;
      this.chasing = true;
    } else {
      this.maxSpeed = Setting.BOOFLY_MAX_SPEED;
      this.chasing = false;
    }
  }

  parentMethod() {
    if (this.dead) return;

    this.checkChase();

    if (!this.chasing) {
      if (this.backward) {
        // Crawlid Movement
        this.vy = 0;
        this.vx += this.speed;
      } else {
        this.vy = 0;
        this.vx -= this.speed;
      }
    }
  }
}
