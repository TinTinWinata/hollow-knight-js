import { GAME } from "../game.js";
import { FLIES_CONF, GET_FLIES_SPRITE } from "../facade/file.js";
import {
  checkBlockCollide,
  checkCollide,
  isInTheLeft,
} from "../facade/helper.js";
import { Setting } from "../setting.js";

export class Character {
  static GenerateFlies() {
    const game = GAME.getInstance();
    const totalFlies = Setting.GENERATED_FLIES;
    const w = Setting.FLIES_WIDTH;
    const h = Setting.FLIES_HEIGHT;

    for (let i = 0; i < totalFlies; i++) {
      const x = Math.random() * game.width;
      const y = Math.random() * game.height - 350;
      game.flies.push(
        new this(x, y, w, h, GET_FLIES_SPRITE(), FLIES_CONF, false)
      );
    }
  }

  constructor(x, y, w, h, sprite, config, gravity = true) {
    this.gravity = gravity;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.spriteIdx = 0;
    this.speedX = Setting.CHARACTER_SPEED;
    this.speedY = 1;
    this.vx = 0;
    this.vy = 0;
    this.invert = 0;
    this.maxSpeed = Setting.CHARACTER_MAX_SPEED;
    this.config = config;
    this.game = GAME.getInstance();
    this.jumpForce = Setting.CHARACTER_JUMP_FORCE;
    this.spriteInterval = 0;
    this.backward = false;
    this.state = "";
    this.invicible = false;
    this.invicibleTime = 1;
    this.invicibleInterval = 0;
    this.health = 5;
    this.dead = false;
    this.callbacks = [];
  }

  checkInvicible() {
    // Check if is invicible set 100 / 60 second to set to uninvicible
    if (this.invicible) {
      this.invicibleInterval += 1 * this.game.delta;
      // console.log(this.invicibleInterval);
      if (this.invicibleInterval > this.invicibleTime) {
        this.invicibleInterval = 0;
        this.invicible = false;
      }
    } else {
      this.invicibleInterval = 0;
    }
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
      if (obj.isCollideBlock(this.x, this.y, this.w, this.h + 1)) {
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
    } else {
      x = this.middleXPos() + offsetX;
    }
    return { x, y };
  }

  isCollide(x, y) {
    return checkCollide(this.x, this.y, this.w, this.h, x, y);
  }

  isCollideBlock(x, y, w, h) {
    return checkBlockCollide(this.x, this.y, this.w, this.h, x, y, w, h);
  }

  checkBound() {
    // 50 -> Player Offset X
    if (
      (!this.backward && this.x + this.w + 1 > this.game.width) ||
      (this.backward && this.x - 1 < 0)
    ) {
      // this.backward = true;
      // this.vx = 0;
      return true;
    }
    return false;
  }

  logic() {
    // Incrementing the sprite
    this.spriteInterval += 60 * this.game.delta;
    // console.log("sprite interval :", this.spriteInterval);
    if (this.spriteInterval > this.config.speed) {
      this.spriteIdx += 1;
      this.spriteInterval = 0;
    }

    // If death then sprite index will no go back
    if (this.dead) {
      if (this.spriteIdx >= this.config.max) {
        this.spriteIdx = this.config.max - 1;
      }
    }

    // Call parent method
    this.parentMethod();

    // console.log("vx : ", this.vx);
    // If not grounded then gravity will turn down the player

    if (!this.checkBound()) {
      // console.log("speed : ", this.vx * this.game.delta);
      this.x += this.vx * this.game.delta;
      this.diedStop();
    }

    this.y += this.vy * this.game.delta;

    if (this.isGrounded()) {
      this.vy = 0;
    } else {
      if (this.gravity) {
        this.vy += this.game.gravity;
      }
    }

    // Check velocity at max speed
    this.checkMaxSpeed();
    this.checkBound();

    this.checkInvicible();

    this.callbacks.forEach((cb) => {
      cb();
    });
  }

  lookAtPlayer() {
    const game = GAME.getInstance();
    const obj = game.player;
    if (isInTheLeft(obj, this)) {
      console.log("backward");
      this.backward = true;
    } else {
      console.log("forward");
      this.backward = false;
    }
  }

  lookAt(obj) {
    if (isInTheLeft(obj, this)) {
      console.log("backward");
      this.backward = true;
    } else {
      console.log("forward");
      this.backward = false;
    }
  }

  isDead() {
    return this.dead;
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

  diedStop() {
    if (this.dead && this.vx > 0) {
      this.vx -= 1;
    } else if (this.dead && this.vx < 0) {
      this.vx += 1;
    }
  }

  checkInvert() {
    if (this.invert !== null && this.invert > 0) {
      console.log(this.invert);
      this.game.ctx.filter = `invert(${this.invert})`;
    }
  }

  renderBackward(idx) {
    this.game.ctx.save();
    this.game.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    this.game.ctx.scale(-1, 1);
    this.checkInvert();
    this.game.ctx.drawImage(
      this.sprite[idx],
      -this.w / 2,
      -this.h / 2,
      this.w,
      this.h
    );
    this.game.ctx.restore();
  }

  renderForward(idx) {
    this.game.ctx.save();
    this.checkInvert();
    this.game.ctx.scale(1, 1);
    this.game.ctx.drawImage(this.sprite[idx], this.x, this.y, this.w, this.h);
    this.game.ctx.restore();
  }

  render() {
    this.logic();

    const idx = this.spriteIdx % this.config.max;

    // !Debugging Purpose
    // console.log("idx : ", idx);
    // console.log("max : ", this.config.max);

    if (idx < 0 || idx >= this.config.max) {
      console.log("FAILED! [IDX] : ", idx);
    }

    // !Debugging Purpose
    // console.log("rendering : ", idx, " max : ", this.config.max);

    if (this.invert) {
    }

    if (this.backward) {
      this.renderBackward(idx);
    } else {
      this.renderForward(idx);
    }
  }
}
