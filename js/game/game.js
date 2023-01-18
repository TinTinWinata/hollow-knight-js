import { MyAudio } from "./facade/audio.js";
import { Cheat } from "./facade/cheat.js";
import { Credit } from "./facade/credit.js";
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
    this.blasts = [];
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
    this.blackCheat = false;
    this.useCamera = true;

    this.cheat = Cheat.GetInstance();

    this.lastTime = new Date();
    this.timeEllapsed = 0;
    this.tempTimeInterval = 0;
    this.tempFrameCounter = 0;
    this.credit = false;
    this.ui = UI.getInstance();
    this.audio = MyAudio.getInstance();
    this.audio.play(MyAudio.HOME);

    this.mainWidth = 1000;
    this.mainHeight = 600;

    this.rest = null;
    this.fullscreenFlag = false;
    this.canFullscreen = true;
  }

  aliveEnemy() {
    const killed = this.killedCrawlid;
    const allEnemies = this.enemies.length;
    return allEnemies - killed;
  }

  isFullscreen() {
    return this.fullscreenFlag;
  }

  fullscreen() {
    if (!this.canFullscreen) return;

    this.fullscreenFlag = !this.fullscreenFlag;
    if (this.fullscreenFlag) {
      $("#root-nav").hide();
      $(".canvas-container").css({
        width: "100vw",
        height: "100vh",
        border: "none",
      });
    } else {
      $("#root-nav").show();
      $(".canvas-container").css({
        width: this.mainWidth + "px",
        height: this.mainHeight + "px",
        border: "1px solid white",
      });
    }
  }

  backToMenu() {
    window.location.reload();
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

  checkCredit() {
    // Credit
    if (this.credit) {
      const credit = Credit.getInstance();
      credit.showCredit();
    }
  }

  finishGame() {
    this.audio.fadeVideo();

    setTimeout(() => {
      // Hide The UI
      this.ui.hideUi();

      // Set Audio
      this.audio.play(MyAudio.VICTORY, false);

      // Set Black Scren After Boss Has Died
      $("#black-screen").css("opacity", 0.4);
      $("#black-screen").fadeIn(1000);

      setTimeout(() => {
        // Set credit scroll up
        this.credit = true;
      }, 3000);
    }, 3000);
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

  pauseGame(openUi = false, audio = true) {
    if (!this.pause) {
      if (openUi) {
        this.ui.showPause();
      }
      if (audio) this.audio.setVolume(0);
      this.save();
      this.pause = true;
    } else {
      this.resumeGame();
    }
  }
  resumeGame() {
    this.restore();
    this.audio.setVolumeFromRange();
    this.ui.hidePause();
    this.pause = false;
  }

  // Save & Restore Make Bug
  save() {
    // this.player.save();
    // this.enemies.forEach((enemy) => {
    //   enemy.save();
    // });
  }
  restore() {
    // setTimeout(() => {
    //   this.player.restore();
    //   this.enemies.forEach((enemy) => {
    //     enemy.restore();
    //   });
    // }, 1);
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

  renderBlast() {
    for (let i = 0; i < this.blasts.length; i++) {
      const blast = this.blasts[i];
      blast.render();

      // Check Blast Death
      if (blast.checkBound()) {
        this.blasts.splice(i, 1);
      }
    }
  }

  enemyRender() {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.render();
      if (enemy.destroy) {
        this.enemies.splice(i, 1);
      }
    }
  }

  render() {
    this.calculateFps();
    this.getDelta();
    if (!this.pause) {
      this.checkCredit();
      this.camera.moveTo(this.player.x + 100, this.player.y - 50);
      if (this.useCamera) this.camera.begin();
      this.cheat.checkKeys();
      if (this.useCamera && this.shake) {
        this.camera.shake();
      }
      if (this.black) this.black.render();
      this.mainBackground.render();
      this.grounds.forEach((obj) => {
        obj.render();
      });
      this.objects.forEach((object) => {
        object.render();
      });
      if (!this.bossFight) this.bossDoor.render();
      if (this.black && this.blackCheat) this.black.render();

      this.renderBlast();
      this.enemyRender();
      this.characters.forEach((character) => {
        character.render();
      });
      this.flies.forEach((fly) => {
        fly.render();
      });
      this.backgrounds.forEach((obj) => {
        // Fore ground
        obj.render();
      });
      this.renderParticle();
      if (this.useCamera) this.camera.end();
    }
    /* Rendering the particles. */
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
