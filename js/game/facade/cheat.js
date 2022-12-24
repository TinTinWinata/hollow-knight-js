import { GAME } from "../game.js";
import { BossDoor } from "../model/bossdoor.js";
import { UI } from "../model/ui.js";
import { Setting } from "../setting.js";

export class Cheat {
  static instance;

  static GetInstance() {
    if (this.instance == null) {
      this.instance = new Cheat();
    }
    return this.instance;
  }

  addCheat(str, cb) {
    const obj = {
      key: str,
      callback: cb,
    };
    this.cheatList.push(obj);
  }

  addKeys(c) {
    this.keys += c;
  }

  generateCheat() {
    const game = GAME.getInstance();
    const ui = UI.getInstance();
    this.addCheat("22-1", () => {
      game.player.damage = 100;
    });
    this.addCheat("icanfly", () => {
      Setting.CHARACTER_JUMP_FORCE = 2000;
    });
    this.addCheat("hesoyam", () => {
      game.player.maxHealth();
      ui.changeHealth(game.player.health);
    });
    this.addCheat("candi", () => {
      const totalIncrement = 10;
      ui.incrementMoney(totalIncrement);
      game.killedCrawlid += totalIncrement;
      BossDoor.GetInstance().openDoor();
    });
    this.addCheat("gotoboss", () => {
      game.player.cheat = 0;
    });
    this.addCheat("rataampas", () => {
      game.player.cheat = true;
    });
    this.addCheat("crazy", () => {
      Setting.CHARACTER_DASH_TIME = 3000;
    });
  }

  constructor() {
    this.cheatList = [];
    this.keys = [];
  }

  clearKeys() {
    this.keys = "";
  }

  checkKeys() {
    this.cheatList.forEach((obj) => {
      if (this.keys.includes(obj.key)) {
        // Cheat Open
        const ui = UI.getInstance();
        ui.showTitle(1000, "Cheat Activated");
        obj.callback();
        this.clearKeys();
      }
    });
  }
}
