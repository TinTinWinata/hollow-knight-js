import {
  BOSS_CONF,
  GET_BOSS_ATTACK_PREP_SPRITE,
  GET_BOSS_ATTACK_SPRITE,
  GET_BOSS_IDLE_SPRITE,
  GET_BOSS_JUMP_SPRITE,
} from "../facade/file.js";
import { isInTheLeft } from "../facade/helper.js";
import { GAME } from "../game.js";
import { Enemy } from "../parent/enemies.js";
import { Setting } from "../setting.js";

export class Boss extends Enemy {
  static IDLE = 1;
  static ATTACK_PREP = 2;
  static ATTACK = 3;
  static JUMP = 4;

  constructor(x, y, w, h) {
    const sprite = GET_BOSS_IDLE_SPRITE();
    const config = BOSS_CONF.idle;
    super(x, y, w, h, sprite, config);

    this.attackTimes = 0;
    this.attacked = false;

    // Debugging Purpose
    window.addEventListener("keypress", (e) => {
      if (e.key == "r") {
        this.attack();
      }
      if (e.key == "e") {
        this.jump();
      }
    });
    this.jumping  = false;
  }


  landing(){
    this.changeState("idle");
  }

  checkLanding(){
    if(this.jumping){
      // Check already landing
      if(this.vy == 0){
        // Already Landing
        this.landing();
      }
    }
  }

  checkOffset() {
    if (!this.backward) {
      super.offsetX = 210;
      super.offsetY = 100;
      super.offsetW = -300;
      super.offsetH = -130;
    } else {
      super.offsetX = 50;
      super.offsetY = 100;
      super.offsetW = -300;
      super.offsetH = -130;
    }
  }

  getTempNode() {
    const temp = this.tempNode;
    this.tempNode = null;
    return temp;
  }

  setTemp(x, y, w, h) {
    this.tempNode = { x, y, w, h };
  }

  setCurrentTemp() {
    this.setTemp(this.x, this.y, this.w, this.h);
  }

  setPosToNode(node) {
    this.x = node.x;
    this.y = node.y;
    this.w = node.w;
    this.h = node.h;
  }

  setDefaultSize() {
    const node = this.getTempNode();
    if (node) {
      this.setPosToNode(node);
    } else {
      this.w = Setting.BOSS_WIDTH;
      this.h = Setting.BOSS_HEIGHT;
      this.y = Setting.BOSS_INITIAL_Y;
    }
  }

  improveSize(offsetX, offsetY) {
    this.setCurrentTemp();
    this.offset = offsetX;
    if (this.backward) {
      this.x += -offsetX - 70;
    } else {
      this.x -= -offsetX - 70;
    }
    this.y -= offsetY;
    this.w = Setting.BOSS_WIDTH + offsetX;
    this.h = Setting.BOSS_HEIGHT + offsetY;
  }

  changeState(state) {
    this.spriteIdx = 0;
    switch (state) {
      case Boss.IDLE:
        this.sprite = GET_BOSS_IDLE_SPRITE();
        this.config = BOSS_CONF.idle;
        this.setDefaultSize();
        break;
      case Boss.ATTACK_PREP:
        this.sprite = GET_BOSS_ATTACK_PREP_SPRITE();
        this.config = BOSS_CONF.attack_prep;
        this.setDefaultSize();
        break;
      case Boss.ATTACK:
        this.sprite = GET_BOSS_ATTACK_SPRITE();
        this.config = BOSS_CONF.attack;
        this.improveSize(50, 100);
        break;
      case Boss.JUMP:
        this.sprite = GET_BOSS_JUMP_SPRITE();
        this.config = BOSS_CONF.jump;
        this.setDefaultSize();
    }
    this.state = state;
  }

  checkAttack() {
    if (this.state == Boss.ATTACK && this.spriteIdx == 2) {
      this.game.shakeScene(1);
    }
    if (this.state == Boss.ATTACK && this.spriteIdx >= this.config.max - 1) {
      this.spriteIdx = 0;
      this.attackTimes += 1;
      if (this.attackTimes >= Setting.BOSS_ATTACK_TIMES) {
        this.attackTimes = 0;
        this.changeState(Boss.IDLE);
      }
    }
  }

  jump() {
    this.lookAtPlayer();
    this.changeState(Boss.JUMP);
    this.vy -= Setting.BOSS_JUMP_FORCE;
    this.jumping = true;
  }

  attack() {
    this.lookAtPlayer();
    this.changeState(Boss.ATTACK_PREP);
    setTimeout(() => {
      this.changeState(Boss.ATTACK);
    }, Setting.BOSS_ATTACK_PREP_TIME * 1000);
  }

  incrementInvert(n) {
    this.invert += n;
    if (this.invert >= 1) {
      this.invert = 1;
    }
  }

  decrementInvert(n) {
    this.invert -= n;
    if (this.invert <= 0) {
      this.invert = 0;
    }
  }
  checkIncrementInvert() {
    if (this.attacked) {
      const inc = Setting.BOSS_INVERT_MULTIPLIES * this.game.delta;
      this.incrementInvert(inc);
    } else {
      const dec = Setting.BOSS_INVERT_MULTIPLIES * this.game.delta;
      this.decrementInvert(dec);
    }
    if (this.invert >= 1) {
      this.attacked = false;
    }
  }

  parentMethod() {
    this.checkOffset();
    this.checkIncrementInvert();
    this.checkAttack();
    this.checkLanding();
  }
  hit() {
    this.attacked = true;
  }
}
