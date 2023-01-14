import { GAME } from "../game.js";
import { GET_BOSS_DOOR, GET_FG_FIRST } from "../facade/file.js";
import { Object } from "../parent/object.js";
import { Setting } from "../setting.js";

export class Background {
  // Static method for generating background
  // static generateBackground() {
  //   const game = GAME.getInstance();
  // }

  static GenerateForeground() {
    const sprite = GET_FG_FIRST();
    const game = GAME.getInstance();
    const offset = 300;
    const w = 2000 + offset;
    const h = 600;
    const offsetY = 0;
    game.backgrounds.push(
      new this(
        0 - offset,
        game.height - h - offsetY,
        w + offset,
        h,
        sprite,
        game.ctx,
        15
      )
    );
  }


  debug() {
    const game = GAME.getInstance();
    game.debug(this.x, this.y, this.w, this.h, "red");
  }
  reset() {
    this.x = this.initX;
    this.y = this.initY;
  }

  constructor(x, y, w, h, sprite, ctx, vx = 0) {
    this.initX = x;
    this.initY = y;
    this.vx = vx;
    this.sprite = sprite;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.callbacks = [];
  }

  pushCallback(cb) {
    this.callbacks.push(cb);
  }

  logic() {}

  render() {
    this.logic();
    this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    this.callbacks.forEach((callback) => {
      callback();
    });
  }
}
