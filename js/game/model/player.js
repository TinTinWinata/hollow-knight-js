import { GAME } from "../game.js";
import {
  GET_HIT,
  GET_PLAYER_ATTACK_SPLASH_SPRITE,
  GET_PLAYER_ATTACK_SPRITE,
  GET_PLAYER_DASH_SPRITE,
  GET_PLAYER_DEAD,
  GET_PLAYER_IDLE_SPRITE,
  GET_PLAYER_JUMP_SPRITE,
  GET_PLAYER_WALK_SPRITE,
  HIT_CONF,
  PLAYER_CONF,
} from "../facade/file.js";
import { Character } from "../parent/character.js";
import { Setting } from "../setting.js";
import { Particle } from "./particle.js";
import { UI } from "./ui.js";
import { MyAudio } from "../facade/audio.js";

export class Player extends Character {
  move() {}

  // Method for rendering player right circle
  renderLight() {
    const lightRadius = 200;
    const game = GAME.getInstance();
    game.ctx.beginPath();
    // game.ctx.globalAlpha = 0.1;
    game.ctx.fillStyle = "white";
    const midX = Math.round(this.middleXPos());
    const midY = Math.round(this.middleYPos());
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
    const states = ["jump", "attack", "dash"];
    return states.includes(state);
  }

  maxHealth() {
    this.health = Setting.CHARACTER_MAX_HEALTH;
  }

  changeSprite(state) {
    if (state == "dead") {
    } else if (
      this.state == "dead" ||
      this.state == "attack" ||
      (this.state == "jump" && state != "attack" && state != "jump") ||
      this.state == "dash"
    )
      return;

    if (this.state == state) return;
    switch (state) {
      case "dash":
        this.spriteIdx = 0;
        this.config = PLAYER_CONF.dash;
        this.sprite = GET_PLAYER_DASH_SPRITE();
        break;
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
      case "dead":
        this.spriteIdx = 0;
        this.config = PLAYER_CONF.dead;
        this.sprite = GET_PLAYER_DEAD();
        break;
    }
    this.state = state;
  }

  attack() {
    if (!this.canAttack || !this.canMove) return;

    // Get Node (x, y) in front of player position
    const node = this.inFrontNode(-10);

    const idx = this.splashIndex % PLAYER_CONF.splash.max;
    this.splashIndex += 1;

    this.changeSprite("attack");
    const offsetX = 20;
    const offsetTopY = -20;

    const x = this.backward
      ? node.x - this.splashWidth - offsetX
      : node.x + offsetX;
    const y = node.y - this.splashHeight / 2 - offsetTopY;
    const w = this.splashWidth;
    const h = this.splashHeight;

    // Emit The White Particle Effect
    Particle.Emit(
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

  clearKey() {
    this.game.keys = [];
  }

  checkMovement() {
    if (this.state == "dash" && this.spriteIdx == this.config.max - 1) {
      if (this.backward) {
        this.vx += -Setting.CHARACTER_DASH_FORCE * this.game.delta;
      } else {
        this.vx += Setting.CHARACTER_DASH_FORCE * this.game.delta;
      }
    } else if (this.canMove && this.game.keys[Setting.PLAYER_MOVEMENT_RIGHT]) {
      // this.game.moveBackground(false);
      this.changeSprite("walk");
      this.backward = false;
      this.vx += this.speedX;
      this.vx += this.speedX;
    } else if (this.canMove && this.game.keys[Setting.PLAYER_MOVEMENT_LEFT]) {
      // this.game.moveBackground(true);
      this.changeSprite("walk");
      this.vx -= this.speedX;
      this.backward = true;
    } else {
      this.changeSprite("idle");
      this.vx = 0;
    }
  }

  // Always be called when super class render (object)

  checkAttackJumpState() {
    // Check if attacking state
    if (
      (this.state == "attack" || this.state == "jump") &&
      this.spriteIdx == this.config.max - 1
    ) {
      this.state = "";
    }
  }

  playerSplashAttack(x, y, w, h) {
    const game = GAME.getInstance();
    game.enemies.forEach((enemy) => {
      if (enemy.isCollideBlock(x, y, w, h)) {
        if (!enemy.isDead()) {
          Particle.HitParticle(x + w, y + w / 2);
        }
        enemy.hit();
      }
    });
  }

  checkCollideEnemy() {
    const x = this.x + this.offsetX / 2;
    const y = this.y + this.offsetY / 2 + 15;
    const w = this.w - this.offsetX;
    const h = this.h - this.offsetY;

    if (this.invicible || this.dead) return;
    this.game.enemies.forEach((enemy) => {
      if (enemy.isCollideBlock(x, y, w, h) && !enemy.dead) {
        // Collide With Enemy!
        Particle.PlayerHit(this.x, this.y, this.backward);
        this.game.pauseGame();
        this.clearKey();
        this.hit();
        setTimeout(() => {
          this.invicible = true;
          this.game.resumeGame();
        }, 500);
      }
    });
  }

  die() {
    this.dead = true;
    this.canCollide = false;
    this.changeSprite("dead");
    this.clearKey();
    this.canMove = false;
    this.gravity = false;
    this.vx = 0;
    this.vy = 0;
    setTimeout(() => {
      this.fade = true;
    }, Setting.CHARACTER_FADE_TIMEOUT);
    setTimeout(() => {
      this.game.ui.deadScreen();
    }, Setting.CHARACTER_DEATH_BLACK_SCREEN_TIMEOUT);
  }

  checkFade() {
    if (this.fade) {
      this.alpha -= Setting.CHARACTER_FADE_VELOCITY * this.game.delta;
    }
  }

  checkDeadState() {
    if (this.state == "dead") {
      const r = Setting.CHARACTER_RANDOM_DEATH;
      const max = r;
      const min = -r;
      const xR = Math.round(Math.random() * (max - min) + min);
      const yR = Math.round(Math.random() * (max - min) + min);
      this.x += xR * this.game.delta;
      this.y += yR * this.game.delta;

      const multiplier = Setting.CHARACTER_SPEED_UP_DEATH * this.game.delta;

      this.deadMaxY -= multiplier;
      if (this.deadMaxY <= 0) {
        this.vy = 0;
      } else {
        this.vy -= multiplier;
      }

      if (this.config.max - 1 == this.spriteIdx) {
        this.spriteIdx = this.config.max - 1;
      }
    }
  }

  hit() {
    this.health -= 1;
    // Change UI
    const ui = UI.getInstance();
    ui.changeHealth(this.health);

    if (this.health <= 0) {
      this.die();
    }
  }

  checkAttack() {
    if (!this.canAttack) {
      if (this.attackInterval >= this.attackSpeed) {
        this.attackInterval = 0;
        this.canAttack = true;
      } else {
        this.attackInterval += this.game.delta;
      }
    }
  }

  isGrounded() {
    // this.game.debug(
    //   this.x + 40,
    //   this.y + this.h + this.vy * this.game.delta,
    //   30,
    //   1
    // );
    return (
      this.game.isCollideObjectBlock(
        this.x + 40,
        this.y + this.h + this.vy * this.game.delta,
        30,
        1
      ) ||
      this.game.isCollideObjectGrounded(
        this.x + 40,
        this.y + this.h + this.vy * this.game.delta,
        30,
        1
      )
    );
  }

  isCollideObject() {
    let flag = false;

    this.game.objects.forEach((obj) => {
      const offsetX = 35 + this.vx * this.game.delta;
      const offsetBackwardX = -70 + this.vx * this.game.delta;
      const inc = !this.backward ? 1 + offsetBackwardX + this.w : -1 + offsetX;

      // this.game.debug(obj.x, obj.y, obj.w, obj.h, "yellow");

      const x = this.x + inc;
      const y = this.y + 80 + this.vy * this.game.delta;
      const w = this.w / 4 + 10;
      const h = 30;

      // this.game.debug(x, y, w, h, "blue");
      if (obj.isCollideBlock(x, y, w, h)) {
        flag = true;
      }
    });
    return flag;
  }

  checkDashState() {
    if (this.state == "dash") {
      const lastIdx = this.config.max - 1;
      // Keep Getting Last Index
      if (this.spriteIdx > lastIdx) {
        this.spriteIdx = 1;
        this.spriteIdx = lastIdx;
      }
    }
  }

  isBoundMaxCamera() {
    const x = this.x;
    const maxLeft = this.game.maxLeftX;
    const maxRight = this.game.maxRightX - 100;
    if (x < maxLeft || x > maxRight) {
      return true;
    } else {
      return false;
    }
  }

  isNotMovingX() {
    return this.vx == 0;
  }

  checkBackground() {
    // Change Background
    const game = GAME.getInstance();
    if (!this.isBoundMaxCamera() && !this.isNotMovingX()) {
      game.moveBackground(game.player.backward);
    }
  }

  parentMethod() {
    // This method will be called every time (update methods)
    this.checkBackground();
    this.checkJumping();
    this.checkAttack();
    this.checkCollideEnemy();
    this.checkAttackJumpState();
    this.checkMovement();
    this.checkDashState();
    this.renderLight();
    this.checkLand();
    this.checkDeadState();
    this.checkFade();
  }

  jump() {
    if (this.canMove && this.canJump() && this.state != "dash") {
      this.jumping = true;
      this.vy -= this.jumpForce;
      this.changeSprite("jump");
      const audio = MyAudio.getInstance();
      audio.play(MyAudio.HOME);
    }
  }

  initPlayer() {
    this.splashWidth = 150;
    this.splashHeight = 150;
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

  restoreDefaultScale() {
    this.w = Setting.CHARACTER_WIDTH * this.game.scale;
    this.h = Setting.CHARACTER_HEIGHT * this.game.scale;
  }

  dash() {
    console.log(this.canDash, this.canJump(), !this.jumping, !this.postJump);
    if (this.canDash && this.canJump() && !this.jumping && !this.postJump) {
      this.invicible = true;
      this.saveScale();
      console.log("Dashing!");
      this.vx = 1000;
      this.w = 150; // Sprite width of dash
      this.changeSprite("dash");
      this.canDash = false;
      setTimeout(() => {
        this.restoreDefaultScale();
        this.state = "";
        this.changeSprite("idle");
      }, Setting.CHARACTER_DASH_TIME);
      setTimeout(() => {
        this.canDash = true;
      }, Setting.CHARACTER_DASH_TIMEOUT);
    }
  }

  checkLand() {
    if (this.jumping && this.isGrounded()) {
      this.jumping = false;
      this.postJump = true;
    }
  }

  checkJumping() {
    if (this.postJump) {
      this.config = {
        max: this.config.max,
        speed: 4,
      };
      if (this.spriteIdx == this.config.max - 1) {
        this.changeSprite("idle");
        this.postJump = false;
      }
    }
    if (this.jumping && this.state != "attack") {
      const lastIdx = this.config.max - 4;
      if (this.spriteIdx >= lastIdx) {
        this.spriteIdx = lastIdx;
      }
    }
  }

  constructor(x, y, w, h, sprite, maxSprite) {
    super(x, y, w, h, sprite, maxSprite);
    this.fade = false;
    this.deadMaxY = Setting.CHARACTER_MAX_DEAD_HEIGHT;
    this.canMove = true;
    this.initPlayer();
    this.initAllSprite();
    this.canDash = true;
    this.canAttack = true;
    this.attackSpeed = 0.4;
    this.attackInterval = 0;
    this.offsetX = 60;
    this.offsetY = 40;
    this.health = Setting.CHARACTER_MAX_HEALTH;
  }
}
