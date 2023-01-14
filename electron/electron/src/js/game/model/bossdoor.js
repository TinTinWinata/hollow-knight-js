import { GAME } from "../game.js";
import { GET_BOSS_DOOR } from "../facade/file.js";
import { Object } from "../parent/object.js";
import { Setting } from "../setting.js";
import { Background } from "./background.js";
import { UI } from "./ui.js";

export class BossDoor {
  // Decide Render First
  static BOSS_BACKGROUND = 1;
  static BOSS_DOOR = 2;
  static BOSS_PORTAL = 3;
  static FREE_OBJECT = 4;

  static instance = null;

  static GetInstance() {
    if (this.instance == null) {
      this.instance = new BossDoor();
    }
    return this.instance;
  }

  generateBackground() {
    const img = GET_BOSS_DOOR(BossDoor.BOSS_BACKGROUND);
    const game = GAME.getInstance();
    const scale = 1.3;
    const w = 591 * scale; // 591 -> IMAGE.png WIDTH
    const h = 801 * scale; // 801 -> IMAGE.png HEIGHT
    const offsetY = 160;
    const x = Setting.WIDTH - w;
    const y = Setting.HEIGHT - h - offsetY;

    const door = new Background(x, y, w, h, img, game.ctx);
    this.bossDoors[BossDoor.BOSS_BACKGROUND] = door;

    // Make all ground black below the top ground
    this.bossDoors[BossDoor.FREE_OBJECT] = new Object(
      x,
      Setting.HEIGHT - 170,
      w,
      game.height,
      null,
      null,
      game.ctx,
      "black"
    );
  }

  constructor() {
    this.fade = 0;
    this.open = false;
    this.bossDoors = [];
    this.showLight = false;
  }

  openDoor() {
    this.open = true;
    this.generatePortal();
  }

  generateDoor() {
    const img = GET_BOSS_DOOR(BossDoor.BOSS_DOOR);
    const game = GAME.getInstance();
    const scale = 1.3;
    const w = 574 * scale; // PNG WIDTH
    const h = 497 * scale; // PNG HEIGHT
    const offsetY = 160;
    const x = Setting.WIDTH - w;
    const y = Setting.HEIGHT - h - offsetY;

    const door = new Background(x, y, w, h, img, game.ctx);
    this.bossDoors[BossDoor.BOSS_DOOR] = door;
  }

  checkOpen() {
    if (this.open) {
      const game = GAME.getInstance();
      const bg = this.bossDoors[BossDoor.BOSS_DOOR];
      if (bg) {
        bg.x += Setting.OPEN_DOOR_SPEED_X * game.delta;
        bg.y += Setting.OPEN_DOOR_SPEED_Y * game.delta;
      }
    }
  }

  addListener(key) {
    const k = key.key;
    if (Setting.PLAYER_INTERACT.includes(k)) {
      const game = GAME.getInstance();
      if (!game.bossFight) {
        game.changeBossScene();
      }
      const ui = UI.getInstance();
      ui.hideTitle();
    }
  }

  checkInside() {
    const game = GAME.getInstance();
    // Check if player inside the
    if (
      !game.bossFight &&
      this.showLight &&
      game.player.x >= 1720 &&
      game.player.x <= 1800
    ) {
      this.changeTitle();
      $("#title").fadeIn(300);
      window.addEventListener("keypress", this.addListener);
    } else {
      $("#title").fadeOut(2000);
      window.removeEventListener("keypress", this.addListener);
    }
  }

  changeTitle() {
    $("#title").html("'Space to interact");
  }

  logic() {
    this.checkInside();
    this.checkOpen();
  }

  render() {
    this.logic();
    if (!this.open) {
      this.bossDoors[BossDoor.BOSS_DOOR].render();
      this.bossDoors[BossDoor.BOSS_BACKGROUND].render();
    }
    if (this.open) {
      this.bossDoors[BossDoor.BOSS_PORTAL].render();
      this.bossDoors[BossDoor.BOSS_DOOR].render();
      if (this.bossDoors[BossDoor.BOSS_DOOR].x > 1300) {
        this.showLight = true;
      }
      this.bossDoors[BossDoor.BOSS_BACKGROUND].render();
      if (this.showLight) {
        const game = GAME.getInstance();
        game.ctx.save();
        game.ctx.globalAlpha = this.fade;
        this.bossDoors[BossDoor.BOSS_PORTAL].render();
        this.fade += Setting.DOOR_FADE_LIGHT * game.delta;
        game.ctx.restore();
      }
    }
    this.bossDoors[BossDoor.FREE_OBJECT].render();
  }

  generatePortal() {
    const img = GET_BOSS_DOOR(BossDoor.BOSS_PORTAL);
    const game = GAME.getInstance();
    const scale = 1.3;
    const w = 574 * scale;
    const h = 497 * scale;
    const offsetY = 140;
    const offsetX = 0;
    const x = Setting.WIDTH - w - offsetX;
    const y = Setting.HEIGHT - h - offsetY;

    const door = new Background(x, y, w, h, img, game.ctx);
    this.bossDoors[BossDoor.BOSS_PORTAL] = door;
  }
}
