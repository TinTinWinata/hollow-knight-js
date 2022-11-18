import { GAME } from "../setting.js";

export class Character {
  constructor(x, y, w, h, sprite, maxSprite) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.maxSprite = maxSprite;
    this.spriteIdx = 0;
  }
  render() {
    const game = GAME.getInstance();
    this.spriteIdx++;
    const idx = this.spriteIdx % this.maxSprite;
    game.ctx.drawImage(this.sprite[idx], this.x, this.y, this.w, this.h);
  }
}
