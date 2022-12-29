import { GAME } from "../game.js";
import { BossDoor } from "../model/bossdoor.js";
import { UI } from "../model/ui.js";
import { Setting } from "../setting.js";
import { GET_MIXUE_SPRITE } from "./file.js";

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
      game.player.blastPower += totalIncrement;
      ui.setSkillText(game.player.blastPower);
      BossDoor.GetInstance().openDoor();
    });
    this.addCheat("gotoboss", () => {
      game.changeBossScene();
    });
    this.addCheat("rataampas", () => {
      game.player.cheat = true;
    });
    this.addCheat("crazy", () => {
      Setting.CHARACTER_DASH_TIME = 3000;
    });
    this.addCheat("jokes", () => {
      game.blackCheat = !game.blackCheat;
    });
    this.addCheat("mixue", () => {
      const h = 200;
      const w = 200;
      const x = game.width - 900;
      const y = game.height - 200 - h;
      game.rest.x = x;
      game.rest.y = y;
      game.rest.w = w;
      game.rest.h = h;
      game.rest.backward = false;
      game.rest.sprite = GET_MIXUE_SPRITE();
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
