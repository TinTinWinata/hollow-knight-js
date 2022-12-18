import { MyAudio } from "./facade/audio.js";
import { GET_BOSS_BG } from "./facade/file.js";
import { Boofly } from "./model/boofly.js";
import { Boss } from "./model/boss.js";
import { BossDoor } from "./model/bossdoor.js";
import { Crawlid } from "./model/crawlid.js";
import { Particle } from "./model/particle.js";
import { UI } from "./model/ui.js";
import { Setting } from "./setting.js";

export class GAME {
  static START = false;
  static gameInstance;

  static getInstance = () => {
    if (this.gameInstance == null) {
      this.gameInstance = new GAME();
    }
    return this.gameInstance;
  };

  constructor() {
    this.player;
    this.maxLeftX = 595;
    this.maxRightX = 1400;
    this.maxTop = 350;
    this.scale = Setting.SCALE;
    this.pause = false;
    this.objects = [];
    this.grounds = [];
    this.characters = [];
    this.keys = [];
    this.particles = [];
    this.camera = null;
    this.shake = false;
    this.backgrounds = [];
    this.foregrounds = [];
    this.mainBackground;
    this.boss = null;
    this.enemies = [];
    this.debugs = [];
    this.flies = [];
    this.gravity = Setting.GRAVITY;
    this.canvas = document.getElementById("myCanvas");
    this.ctx = document.getElementById("myCanvas").getContext("2d");
    this.width = Setting.WIDTH;
    this.height = Setting.HEIGHT;
    this.fps = Setting.FPS;
    this.delta = 0;
    this.bossFight = false;
    this.killedCrawlid = 0;
    this.canMove = true;
    this.bossDoor = null;

    this.lastTime = new Date();
    this.timeEllapsed = 0;
    this.tempTimeInterval = 0;
    this.tempFrameCounter = 0;

    this.ui = UI.getInstance();
    this.audio = MyAudio.getInstance();
    this.audio.play(MyAudio.HOME);
  }

  spawnEnemy() {
    Crawlid.GenerateCrawlid(this.width, true);
    Boofly.Generate();
    Crawlid.GenerateCrawlid(0, false);
  }

  checkCrawlidKilled() {
    const ui = UI.getInstance();
    if (ui.money > Setting.TOTAL_CRAWLID) {
      const door = BossDoor.GetInstance();
      door.openDoor();
    }
  }

  debug(x, y, w, h, color = "red") {
    this.ctx.save();
    this.ctx.globalAlpha = 0.3;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
    this.ctx.restore();
  }
  addDebugs(x, y, w, h, color = "red") {
    this.debugs.push({ x: x, y: y, w: w, h: h, color: color });
  }
  renderDebugs() {
    this.debugs.forEach((obj) => {
      this.ctx.fillStyle = obj.color;
      this.ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    });
  }

  changeBossScene() {
    // Settup Background
    this.mainBackground.sprite = GET_BOSS_BG();
    this.mainBackground.reset();
    this.backgrounds.forEach((bg) => {
      bg.reset();
    });

    // Clear Enemy
    this.bossFight = true;
    this.enemies.length = 0;

    // Clear Object
    this.objects.length = 0;

    // Teleport Player
    const offsetX = 30;
    this.player.x = offsetX + 0 + this.player.w;

    // Playing Audio
    this.audio.stopAllAudio();
    this.audio.play(MyAudio.BOSS);

    // Create Boss
    const boss = new Boss(
      Setting.BOSS_INITIAL_X,
      Setting.BOSS_INITIAL_Y,
      Setting.BOSS_WIDTH,
      Setting.BOSS_HEIGHT
    );
    this.enemies.push(boss);
    this.boss = boss;
  }

  shakeScene(t) {
    this.shake = true;
    setTimeout(() => {
      this.shake = false;
    }, t * 1000);
  }

  isCollideObjectGrounded(x, y) {
    let flag = false;
    this.grounds.forEach((obj) => {
      if (obj.isCollide(x, y)) {
        flag = true;
      }
    });
    return flag;
  }

  isCollideObject(x, y) {
    let flag = false;
    this.objects.forEach((obj) => {
      if (obj.isCollide(x, y)) {
        flag = true;
      }
    });
    return flag;
  }

  isCollideObjectBlock(x, y, w, h) {
    let flag = false;
    this.objects.forEach((obj) => {
      if (obj.isCollideBlock(x, y, w, h)) {
        flag = true;
      }
    });
    return flag;
  }

  calculateFps() {
    this.tempFrameCounter += 1;
  }

  calculateTimeEllapse(delta) {
    this.timeEllapsed += delta;
    this.tempTimeInterval += delta;

    if (this.tempTimeInterval > 1) {
      this.ui.fps(this.tempFrameCounter);
      this.tempTimeInterval = 0;
      this.tempFrameCounter = 0;
    }
  }

  getDelta() {
    const nowTime = new Date();
    const delta = (nowTime - this.lastTime) / 1000;
    this.calculateTimeEllapse(delta);

    this.delta = delta;
    this.lastTime = nowTime;
    return delta;
  }

  renderParticle() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].render();
      if (this.particles[i].dead) {
        this.particles.splice(i, 1);
      }
    }
  }

  pauseGame() {
    this.save();
    this.pause = true;
  }
  resumeGame() {
    this.restore();
    this.pause = false;
    // this.render();
  }

  save() {
    this.player.save();
    this.enemies.forEach((enemy) => {
      enemy.save();
    });
  }
  restore() {
    setTimeout(() => {
      this.player.restore();
      this.player.vx = 0;
      this.player.vx = 0;
      this.enemies.forEach((enemy) => {
        enemy.restore();
        enemy.vy = 0;
        enemy.vx = 0;
      });
    }, 1);
  }

  enemyAlive() {
    let flag = 0;
    this.enemies.forEach((enemy) => {
      if (!enemy.death) {
        flag += 1;
      }
    });
    return flag;
  }

  render() {
    this.calculateFps();
    this.getDelta();
    if (!this.pause) {
      this.camera.begin();
      if (this.shake) {
        this.camera.shake();
      }

      this.camera.moveTo(this.player.x + 100, this.player.y - 50);
      this.mainBackground.render();

      this.grounds.forEach((obj) => {
        obj.render();
      });
      this.objects.forEach((object) => {
        object.render();
      });

      if (!this.bossFight) this.bossDoor.render();

      this.enemies.forEach((enemy) => {
        enemy.render();
      });
      this.characters.forEach((character) => {
        character.render();
      });
      this.backgrounds.forEach((obj) => {
        obj.render();
      });
      this.flies.forEach((fly) => {
        fly.render();
      });
      this.renderParticle();
      this.camera.end();
    }
    /* Rendering the particles. */
    // this.renderDebugs();
    requestAnimationFrame(this.render.bind(this));
  }

  moveBackground(backward) {
    if (backward) {
      this.mainBackground.x -= this.mainBackground.vx * this.delta;
    } else {
      this.mainBackground.x += this.mainBackground.vx * this.delta;
    }
    this.backgrounds.forEach((bg) => {
      if (backward) {
        bg.x -= bg.vx * this.delta;
      } else {
        bg.x += bg.vx * this.delta;
      }
    });
  }
}
