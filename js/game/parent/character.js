import { GAME } from "../data.js";

export class Character {
  constructor(x, y, w, h, sprite, config) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.spriteIdx = 0;
    this.speedX = 1;
    this.speedY = 1;
    this.vx = 0;
    this.vy = 0;
    this.maxSpeed = 7;
    this.config = config;
    this.game = GAME.getInstance();
    this.jumpForce = 25;
    this.spriteInterval = 0;
    this.backward = false;
    this.state = "";
  }

  middleXPos() {
    return this.x + this.w / 2;
  }
  middleYPos() {
    return this.y + this.h / 2;
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

  isGrounded() {
    let collideFlag = false;
    this.game.objects.forEach((obj) => {
      // !Debugging Purpose
      if (
        obj.isCollideBlock(this.x, this.y, this.w, this.h + this.game.gravity)
      ) {
        collideFlag = true;
      }
    });
    return collideFlag;
  }

  inFrontNode(offsetX) {
    const y = this.middleYPos();
    let x = 0;
    if (this.backward) {
      x = this.middleXPos() - offsetX;
      console.log("backward! :D ", x);
    } else {
      x = this.middleXPos() + offsetX;
      console.log("no backward! :D", x);
    }
    return { x, y };
  }

  logic() {
    this.spriteInterval += 1;
    if (this.spriteInterval > this.config.speed) {
      this.spriteIdx += 1;
      this.spriteInterval = 0;
    }

    // Call parent method
    this.parentMethod();

    // If not grounded then gravity will turn down the player
    if (this.isCollideObject()) {
      this.vy = 0;
    } else {
      this.vy += this.game.gravity;
    }

    // Check velocity at max speed
    this.checkMaxSpeed();

    this.y += this.vy;
    this.x += this.vx;
  }

  checkMaxSpeed() {
    if (this.vx > this.maxSpeed) {
      this.vx = this.maxSpeed;
    } else if (this.vx < -this.maxSpeed) {
      this.vx = -this.maxSpeed;
    }
    // if (this.vy < -this.maxSpeed) {
    //   this.vy = -this.maxSpeed;
    // }
  }

  render() {
    // console.log(this.sprite);
    this.logic();
    const idx = this.spriteIdx % this.config.max;
    if (this.backward) {
      this.game.ctx.save();
      this.game.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
      this.game.ctx.scale(-1, 1);
      this.game.ctx.drawImage(
        this.sprite[idx],
        -this.w / 2,
        -this.h / 2,
        this.w,
        this.h
      );
      this.game.ctx.restore();
    } else {
      this.game.ctx.scale(1, 1);
      this.game.ctx.drawImage(this.sprite[idx], this.x, this.y, this.w, this.h);
    }
  }
}
