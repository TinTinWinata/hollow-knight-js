import { checkCollide } from "../facade/helper.js";

export class Object {
  constructor(x, y, w, h, sprite, maxSprite, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.sprite = sprite;
    this.maxSprite = maxSprite;
    this.spriteIdx = 0;
  }

  isCollide(x, y) {
    return checkCollide(this.x, this.y, this.w, this.h, x, y);
  }

  render() {
    this.spriteIdx++;
    const idx = this.spriteIdx % this.maxSprite;
    this.ctx.drawImage(this.sprite[idx], this.x, this.y, this.w, this.h);
  }
}
