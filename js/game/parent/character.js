import { GAME } from "../data.js";

export class Character {
  constructor(x, y, w, h, sprite, maxSprite) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.maxSprite = maxSprite;
    this.spriteIdx = 0;
    this.speedX = 1;
    this.speedY = 1;
    this.vx = 0;
    this.vy = 0;
    this.maxVx = 10;
    this.maxVy = 10;
    this.game = GAME.getInstance();
  }

  // this method will called in rendered (for child class)
  parentMethod() {}

  isCollideObject(checkX = this.x + this.vx, checkY = this.y + this.vy) {
    let collideFlag = false;
    this.game.objects.forEach((obj) => {
      // !Debugging Purpose
      // GAME.getInstance().debug(obj, "blue");
      if (obj.isCollideNextMoveChar(this)) {
        collideFlag = true;
      }
    });
    return collideFlag;
  }

  logic() {
    this.parentMethod();
    // !Debugging Purpose
    // GAME.getInstance().debug(this, "red");

    if (this.isCollideObject()) {
      this.vy = 0;
    } else {
      this.vy += this.game.gravity;
    }
    this.y += this.vy;
    this.x += this.vx;
    // if (this.vx < this.maxVx) {
    // }
    // if (this.vy < this.maxVy) {
    // }
  }

  render() {
    this.logic();
    this.spriteIdx++;
    const idx = this.spriteIdx % this.maxSprite;
    this.game.ctx.drawImage(this.sprite[idx], this.x, this.y, this.w, this.h);
  }
}
