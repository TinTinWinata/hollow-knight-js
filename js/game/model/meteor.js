import { MyAudio } from "../facade/audio.js";
import { BARREL_CONF, GET_BARREL_SPRITE } from "../facade/file.js";
import { GAME } from "../game.js";
import { Enemy } from "../parent/enemies.js";
import { Setting } from "../setting.js";
import { Particle } from "./particle.js";

export class Meteor extends Enemy {
  constructor(x, y, w, h) {
    const sprite = GET_BARREL_SPRITE();
    const config = BARREL_CONF;
    super(x, y, w, h, sprite, config);
    super.speed = 30;
    super.maxSpeed = 1;
    super.canCollide = true;
  }

  checkOutsideMap() {
    const game = GAME.getInstance();
    if (this.y > game.width) {
      this.dead = true;
    }
  }

  hit() {}

  static GenerateMeteor() {
    const game = GAME.getInstance();
    const x = Math.random() * game.width;
    const w = Setting.METEOR_WIDTH;
    const h = Setting.METEOR_HEIGHT;
    const meteor = new Meteor(x, 0 - h, w, h);
    game.enemies.push(meteor);
  }

  parentMethod() {
    if (this.dead) return;

    if (this.isGrounded()) {
      const audio = MyAudio.getInstance();
      this.dead = true;
      this.destroy = true;
      Particle.BarrelParticle(this.x, this.y + 30);
      audio.play(MyAudio.BARREL_DEATH, false);
    }

    // this.checkOutsideMap();
    // this.vy += this.speed * this.game.delta;
  }
}
