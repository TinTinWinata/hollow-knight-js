import { checkBlockCollide, checkCollide } from "../facade/helper.js";
import { GAME } from "../game.js";

export class Object {
  setColliderOffset(x, y, w, h) {
    this.offsetX = x;
    this.offsetY = y;
    this.offsetW = w;
    this.offsetH = h;
  }

  constructor(x, y, w, h, sprite, maxSprite, ctx, color) {
    this.color = color;
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
    const game = GAME.getInstance();
    // game.debug(this.x, this.y, this.w, this.h)
    game.debug(x, y, 30, 30)
    // console.log('asd')
    return checkCollide(
      this.x + this.offsetX,
      this.y + this.offsetY,
      this.w + this.offsetW,
      this.h + this.offsetH,
      x,
      y
    );
  }

  isCollideBlock(x, y, w, h) {
    return checkBlockCollide(this.x, this.y, this.w, this.h, x, y, w, h);
  }

  isCollideCharacter(char) {
    return checkBlockCollide(
      this.x + this.offsetX,
      this.y + this.offsetY,
      this.w + this.offsetW,
      this.h + this.offsetH,
      char.x,
      char.y,
      char.w,
      char.h
    );
  }
  isCollideNextMoveChar(char) {
    return checkBlockCollide(
      this.x + this.offsetX,
      this.y + this.offsetY,
      this.w + this.offsetW,
      this.h + this.offsetH,
      char.x + char.vx,
      char.y + char.vy,
      char.w + char.vx,
      char.h + char.vy
    );
  }

  renderWithSprite() {
    this.spriteIdx++;
    const idx = this.spriteIdx % this.maxSprite;
    this.ctx.drawImage(this.sprite[idx], this.x, this.y, this.w, this.h);
  }

  renderWithColor() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  render() {
    if (this.sprite) {
      this.renderWithSprite();
    } else if (this.color) {
      this.renderWithColor();
    }
  }
}
