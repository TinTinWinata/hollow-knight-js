import { GAME } from "../data.js";
import {
  GET_PLAYER_ATTACK_SPLASH_SPRITE,
  GET_PLAYER_IDLE_SPRITE,
  GET_PLAYER_WALK_SPRITE,
  PLAYER_CONF,
} from "../facade/file.js";
import { Character } from "../parent/character.js";
import { Setting } from "../setting.js";
import { Particle } from "./particle.js";

export class Player extends Character {
  move() {}

  renderLight() {
    const lightRadius = 200;
    const game = GAME.getInstance();
    game.ctx.beginPath();
    // game.ctx.globalAlpha = 0.1;
    game.ctx.fillStyle = "white";
    const midX = this.middleXPos();
    const midY = this.middleYPos();
    var radgrad = game.ctx.createRadialGradient(
      midX,
      midY,
      0,
      midX,
      midY,
      lightRadius
    );
    radgrad.addColorStop(0, "rgba(255,255,255,0.45)");
    radgrad.addColorStop(0.2, "rgba(255,255,255,0.25)");
    radgrad.addColorStop(0.5, "rgba(255,255,255,0.15)");
    radgrad.addColorStop(1, "rgba(160,230,255,0)");

    game.ctx.fillStyle = radgrad;
    game.ctx.fillRect(0, 0, game.width, game.height);
    game.ctx.globalAlpha = 1;
  }

  changeSprite(state) {
    switch (state) {
      case "idle":
        this.config = PLAYER_CONF.idle;
        this.sprite = GET_PLAYER_IDLE_SPRITE();
        break;
      case "walk":
        this.config = PLAYER_CONF.walk;
        this.sprite = GET_PLAYER_WALK_SPRITE();
        break;
    }
  }

  attack() {
    const node = this.inFrontNode(10);
    Particle.emit(
      node.x,
      node.y - this.splashHeight / 2,
      this.splashWidth,
      this.splashHeight,
      GET_PLAYER_ATTACK_SPLASH_SPRITE()
    );
  }

  checkMovement() {
    if (this.game.keys[Setting.PLAYER_MOVEMENT_RIGHT]) {
      this.changeSprite("walk");
      this.backward = false;
      this.vx += this.speedX;
    } else if (this.game.keys[Setting.PLAYER_MOVEMENT_LEFT]) {
      this.vx -= this.speedX;
      this.backward = true;
      this.changeSprite("walk");
    } else {
      this.changeSprite("idle");
      this.vx = 0;
    }
  }

  // Always be called when super class render (object)
  parentMethod() {
    this.checkMovement();
    this.renderLight();
  }

  jump() {
    if (this.isGrounded()) this.vy -= this.jumpForce;
  }

  initPlayer() {
    this.splashWidth = 200;
    this.splashHeight = 200;
    this.attackSprite = GET_PLAYER_ATTACK_SPLASH_SPRITE();
  }

  constructor(x, y, w, h, sprite, maxSprite) {
    super(x, y, w, h, sprite, maxSprite);
    this.initPlayer();
  }
}
