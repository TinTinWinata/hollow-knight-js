import { BossDoor } from "./model/bossdoor.js";
import { UI } from "./model/ui.js";
import { Setting } from "./setting.js";

export class GAME {
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
    this.scale = Setting.SCALE;
    this.pause = false;
    this.objects = [];
    this.characters = [];
    this.keys = [];
    this.particles = [];
    this.backgrounds = [];
    this.foregrounds = [];
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
  }

  checkCrawlidKilled() {
    const ui = UI.getInstance();
    if (ui.money > Setting.TOTAL_CRAWLID) {
      const door = BossDoor.GetInstance();
      door.openDoor();
    }
  }

  debug(x, y, w, h, color = "red") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
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

  // debug(render, color = "blue") {
  //   this.ctx.fillStyle = color;
  //   this.ctx.fillRect(render.x, render.y, render.w, render.h);
  // }
}
