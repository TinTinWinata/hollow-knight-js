import { MyAudio } from "../facade/audio.js";
import { GET_PLAYER_BLAST, PLAYER_CONF } from "../facade/file.js";
import { GAME } from "../game.js";
import { Character } from "../parent/character.js";
import { Object } from "../parent/object.js";
import { Setting } from "../setting.js";
import { Particle } from "./particle.js";

export class Blast extends Character {
  constructor(x, y, backward) {
    const w = 200;
    const h = 80;

    // const game = GAME.getInstance();
    const audio = MyAudio.getInstance();
    audio.play(MyAudio.PLAYER_BLAST, false);
    super(x, y - 20, w, h, GET_PLAYER_BLAST(), PLAYER_CONF.blast, false, false);
    super.backward = backward;
    super.maxSpeed = Setting.CHARACTER_BLAST_MAX_SPEED;
  }
  move() {
    const game = GAME.getInstance();
    if (this.backward) {
      this.vx -= Setting.CHARACTER_BLAST_SPEED * game.delta;
    } else {
      this.vx += Setting.CHARACTER_BLAST_SPEED * game.delta;
    }
  }
  checkCollideEnemy(x, y, w, h) {
    const game = GAME.getInstance();
    game.enemies.forEach((enemy) => {
      if (enemy.isCollideBlock(x, y, w, h)) {
        if (!enemy.isDead()) {
          game.audio.play(MyAudio.HIT, false);
          Particle.HitParticle(x + w, y + w / 2);
        }
        enemy.hit();
      }
    });
  }

  parentMethod() {
    this.move();
    this.checkCollideEnemy(this.x, this.y, this.w, this.h);
  }
}
