export class GAME {
  static gameInstance;

  static getInstance = () => {
    if (this.gameInstance == null) {
      this.gameInstance = new GAME();
    }
    return this.gameInstance;
  };

  constructor() {
    this.scale = 1;
    this.pause = false;
    this.objects = [];
    this.characters = [];
    this.keys = [];
    this.particles = [];
    this.backgrounds = [];
    this.foregrounds = [];
    this.enemies = [];
    this.gravity = 1;
    this.canvas = document.getElementById("myCanvas");
    this.ctx = document.getElementById("myCanvas").getContext("2d");
    this.width = 2000;
    this.height = 1200;
    this.fps = 60;
  }

  debug(x, y, w, h, color = "red") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  // debug(render, color = "blue") {
  //   this.ctx.fillStyle = color;
  //   this.ctx.fillRect(render.x, render.y, render.w, render.h);
  // }
}
