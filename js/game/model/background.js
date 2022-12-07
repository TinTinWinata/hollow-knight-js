import { GAME } from "../game.js";
import { GET_BOSS_DOOR } from "../facade/file.js";
import { Object } from "../parent/object.js";
import { Setting } from "../setting.js";

export class Background {
  // Static method for generating background
  // static generateBackground() {
  //   const game = GAME.getInstance();
  // }

  static GenerateForeground() {}

  constructor(x, y, w, h, sprite, ctx) {
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
