import { GAME } from "../game.js";
import {
  CRAWLID_CONF,
  GET_CRAWLID_DIE,
  GET_CRAWLID_WALK,
} from "../facade/file.js";
import { checkBlockCollide, isInTheLeft } from "../facade/helper.js";
import { Enemy } from "../parent/enemies.js";
import { Setting } from "../setting.js";
import { UI } from "./ui.js";
import { MyAudio } from "../facade/audio.js";

export class Crawlid extends Enemy {
  static GenerateCrawlid(x, backward = false) {
    const game = GAME.getInstance();
    const obj = new this(
      x,
      game.height - 250,
      110 * game.scale,
      90 * game.scale,
      GET_CRAWLID_WALK(),
      CRAWLID_CONF.walk,
      backward
    );
    game.enemies.push(obj);
    return obj;
  }

  constructor(x, y, w, h, sprite, config, backward) {
    super(x, y, w, h, sprite, config);
    super.speed = Setting.CRAWLID_SPEED;
    super.backward = backward;
    super.maxSpeed = Setting.CRAWLID_MAX_SPEED;
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
    this.game.audio.play(MyAudio.CRAWLID_DIED, false);
    this.checkBackward();
    const knockback = this.backward
      ? -Setting.KNOCKBACK_POWER
      : Setting.KNOCKBACK_POWER;
    this.vx = knockback;
    this.spriteIdx = 0;
    this.sprite = GET_CRAWLID_DIE();
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

  parentMethod() {
    if (this.dead) return;

    if (this.backward) {
      // Crawlid Movement
      this.vx += this.speed * this.game.delta;
    } else {
      this.vx -= this.speed * this.game.delta;
    }
  }
}
