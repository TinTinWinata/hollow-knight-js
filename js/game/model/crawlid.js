import { GAME } from "../data.js";
import {
  CRAWLID_CONF,
  GET_CRAWLID_DIE,
  GET_CRAWLID_WALK,
} from "../facade/file.js";
import { Enemy } from "../parent/enemies.js";

export class Crawlid extends Enemy {
  static GenerateCrawlid(x, backward = false) {
    const game = GAME.getInstance();
    return new this(
      x,
      game.height - 250,
      110 * game.scale,
      90 * game.scale,
      GET_CRAWLID_WALK(),
      CRAWLID_CONF.walk,
      backward
    );
  }

  constructor(x, y, w, h, sprite, config, backward) {
    super(x, y, w, h, sprite, config);
    super.speed = 24;
    super.backward = backward;
    super.maxSpeed = 180;
  }

  die() {
    this.vx = 0;
    this.maxSpeed = 0;
    this.spriteIdx = 0;
    this.sprite = GET_CRAWLID_DIE();
    this.dead = true;
  }

  hit() {
    if (!this.dead) this.die();
  }

  parentMethod() {
    // console.log("x : ", this.x);
    if (this.backward) {
      this.vx += this.speed;
    } else {
      this.vx -= this.speed;
    }
  }
}
