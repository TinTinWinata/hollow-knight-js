export class GAME {
  static gameInstance;

  static getInstance = () => {
    if (this.gameInstance == null) {
      this.gameInstance = new GAME();
    }
    return this.gameInstance;
  };

  constructor() {
    this.maxLeftX = 595;
    this.maxRightX = 1400;
    this.scale = 0.7;
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
    this.gravity = 60;
    this.canvas = document.getElementById("myCanvas");
    this.ctx = document.getElementById("myCanvas").getContext("2d");
    this.width = 2000;
    this.height = 1200;
    this.fps = 60;
    this.delta = 0;
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
