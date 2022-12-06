import { GAME } from "../data.js";
import {
  CRAWLID_CONF,
  GET_CRAWLID_DIE,
  GET_CRAWLID_WALK,
} from "../facade/file.js";
import { Enemy } from "../parent/enemies.js";

export class Crawlid extends Enemy {
  static GenerateCrawlid(x) {
    const game = GAME.getInstance();
    return new this(
      x,
      100,
      110 * game.scale,
      90 * game.scale,
      GET_CRAWLID_WALK(),
      CRAWLID_CONF.walk
    );
  }

  constructor(x, y, w, h, sprite, config) {
    super(x, y, w, h, sprite, config);
    super.speed = 0.4;
    super.maxSpeed = 3;
  }

  die() {
    this.maxSpeed = 0;
    this.spriteIdx = 0;
    this.sprite = GET_CRAWLID_DIE();
    this.dead = true;
  }

  hit() {
    if (!this.dead) this.die();
  }

  parentMethod() {
    if (this.backward) {
      this.vx += this.speed;
    } else {
      this.vx -= this.speed;
    }
  }
}
