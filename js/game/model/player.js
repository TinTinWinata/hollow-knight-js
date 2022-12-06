import { GAME } from "../data.js";
import {
  GET_PLAYER_ATTACK_SPLASH_SPRITE,
  GET_PLAYER_ATTACK_SPRITE,
  GET_PLAYER_IDLE_SPRITE,
  GET_PLAYER_JUMP_SPRITE,
  GET_PLAYER_WALK_SPRITE,
  PLAYER_CONF,
} from "../facade/file.js";
import { Character } from "../parent/character.js";
import { Setting } from "../setting.js";
import { Particle } from "./particle.js";
import { UI } from "./ui.js";

export class Player extends Character {
  move() {}

  // Method for rendering player right circle
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

  importantState(state) {
    const states = ["jump", "attack"];
    return states.includes(state);
  }

  changeSprite(state) {
    // console.log("now : ", this.state, " want to : ", state);
    if (
      this.state == "attack" ||
      (this.state == "jump" && state != "attack" && state != "jump")
    )
      return;

    // this.spriteIdx = 0;
    switch (state) {
      case "idle":
        this.config = PLAYER_CONF.idle;
        this.sprite = GET_PLAYER_IDLE_SPRITE();
        break;
      case "walk":
        if (this.state == state) {
          return;
        }
        this.config = PLAYER_CONF.walk;
        this.sprite = GET_PLAYER_WALK_SPRITE();
        break;
      case "attack":
        this.spriteIdx = 0;
        this.config = PLAYER_CONF.attack;
        this.sprite = GET_PLAYER_ATTACK_SPRITE();
        break;
      case "jump":
        this.spriteIdx = 0;
        this.config = PLAYER_CONF.jump;
        this.sprite = GET_PLAYER_JUMP_SPRITE();
        break;
    }
    this.state = state;
  }

  attack() {
    if (!this.canAttack) return;

    // Get Node (x, y) in front of player position
    const node = this.inFrontNode(-10);

    const idx = this.splashIndex % PLAYER_CONF.splash.max;
    this.splashIndex += 1;

    this.changeSprite("attack");

    const x = this.backward ? node.x - this.splashWidth : node.x;
    const y = node.y - this.splashHeight / 2;
    const w = this.splashWidth;
    const h = this.splashHeight;

    // Emit The White Particle Effect
    Particle.emit(
      x,
      y,
      w,
      h,
      GET_PLAYER_ATTACK_SPLASH_SPRITE(idx),
      PLAYER_CONF.splash,
      this.backward,
      this.playerSplashAttack(x, y, w, h)
    );

    this.canAttack = false;
  }

  checkMovement() {
    const { game } = this;

    if (this.game.keys[Setting.PLAYER_MOVEMENT_RIGHT]) {
      this.changeSprite("walk");
      this.backward = false;
      this.vx += this.speedX;
      // if (this.x < game.width / 2 - this.w / 2) {
      //   this.vx += this.speedX;
      // } else {
      //   game.objects.map((obj) => {
      //     obj.x -= this.speedX * 4;
      //   });
      //   game.enemies.map((enemy) => {
      //     enemy.x -= this.speedX * 4;
      //   });
      //   this.vx = 0;
      // }
    } else if (this.game.keys[Setting.PLAYER_MOVEMENT_LEFT]) {
      this.changeSprite("walk");
      this.vx -= this.speedX;
      this.backward = true;
    } else {
      this.changeSprite("idle");
      this.vx = 0;
    }
  }

  // Always be called when super class render (object)

  checkState() {
    // Check if attacking state
    if (this.spriteIdx == this.config.max - 1) {
      this.state = "";
    }
  }

  playerSplashAttack(x, y, w, h) {
    const game = GAME.getInstance();
    // console.log("checking splash!");
    // game.debug(x, y, w, h, "red");
    game.enemies.forEach((enemy) => {
      if (enemy.isCollideBlock(x, y, w, h)) {
        enemy.hit();
      }
    });
  }

  checkCollideEnemy() {
    const x = this.x + this.offsetX / 2;
    const y = this.y + this.offsetY / 2;
    const w = this.w - this.offsetX;
    const h = this.h - this.offsetY;

    if (this.invicible) return;
    this.game.enemies.forEach((enemy) => {
      if (enemy.isCollideBlock(x, y, w, h) && !enemy.dead) {
        // Collide With Enemy!
        this.game.pause = true;
        this.invicible = true;
        this.hit();
        setTimeout(() => {
          this.game.pause = false;
        }, 500);
      }
    });
  }

  hit() {
    this.health -= 1;

    // Change UI
    const ui = UI.getInstance();
    ui.changeHealth(this.health);
  }

  checkAttack() {
    if (!this.canAttack) {
      if (this.attackInterval >= this.attackSpeed) {
        this.attackInterval = 0;
        this.canAttack = true;
      } else {
        this.attackInterval += 1;
      }
    }
  }

  parentMethod() {
    this.checkAttack();
    this.checkCollideEnemy();
    this.checkState();
    this.checkMovement();
    this.renderLight();
  }

  jump() {
    if (this.isGrounded()) {
      this.vy -= this.jumpForce;
      this.changeSprite("jump");
    }
  }

  initPlayer() {
    this.splashWidth = 250;
    this.splashHeight = 250;
    this.attackSprite = GET_PLAYER_ATTACK_SPLASH_SPRITE();
    this.splashIndex = 0;
  }

  initAllSprite() {
    // Initial all sprite first (because there's some bug if init later)

    GET_PLAYER_WALK_SPRITE();
    GET_PLAYER_ATTACK_SPLASH_SPRITE();
    GET_PLAYER_ATTACK_SPRITE();
    GET_PLAYER_WALK_SPRITE();
    GET_PLAYER_IDLE_SPRITE();
  }

  constructor(x, y, w, h, sprite, maxSprite) {
    super(x, y, w, h, sprite, maxSprite);
    this.initPlayer();
    this.initAllSprite();
    this.canAttack = true;
    this.attackSpeed = 30;
    this.attackInterval = 0;
    this.offsetX = 100;
    this.offsetY = 100;
    this.health = 5;
  }
}
