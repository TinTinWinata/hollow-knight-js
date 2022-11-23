import { GAME } from "../data.js";

export class Background {
  // Static method for generating background
  // static generateBackground() {
  //   const game = GAME.getInstance();
  // }

  constructor(x, y, w, h, sprite, ctx) {
    this.sprite = sprite;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  render() {
    this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
  }
}
