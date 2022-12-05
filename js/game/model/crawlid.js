import { CRAWLID_CONF, GET_CRAWLID_WALK } from "../facade/file.js";
import { Enemy } from "../parent/enemies.js";

export class Crawlid extends Enemy {
  static GenerateCrawlid(x) {
    return new this(x, 100, 100, 80, GET_CRAWLID_WALK(), CRAWLID_CONF.walk);
  }

  constructor(x, y, w, h, sprite, config) {
    super(x, y, w, h, sprite, config);
    super.speed = 0.4;
    super.maxSpeed = 3;
  }

  die() {
    // this.maxSpeed = 0;
    console.log("im dead!");
  }

  hit() {
    this.die();
  }

  parentMethod() {
    if (this.backward) {
      this.vx += this.speed;
    } else {
      this.vx -= this.speed;
    }
  }
}
