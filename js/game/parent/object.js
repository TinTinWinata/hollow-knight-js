import { checkCollide } from "../helper";

export class Object {
  constructor(x, y, w, h, sprite, maxSprite) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.maxSprite = maxSprite;
    this.spriteIdx = 0;
  }

  isCollide(x, y) {
    return checkCollide(this.x, this.y, this.w, this.h, x, y);
  }

  render() {
    const idx = this.spriteIdx % this.maxSprite;
    ctx.drawImage(this.sprite[idx], this.x, this.y, this.w, this.h);
  }
}
