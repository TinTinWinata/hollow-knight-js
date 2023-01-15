import { GAME } from "../game.js";
import { Setting } from "../setting.js";

export class Credit {
  static instance;

  static getInstance() {
    if (this.instance == null) {
      this.instance = new Credit();
    }
    return this.instance;
  }

  constructor() {
    this.totalText = 5;
    this.stop = 345;
    this.afterScene = true;

    this.root = $("#credit-scene-root");
    this.bottom = 0;
    this.container = $("#credit-scene");
  }

  showCredit() {
    this.container.show();
    this.root.css("bottom", `${this.bottom}%`);
    // console.log("botom : ", this.bottom);
    const game = GAME.getInstance();
    if (this.bottom < this.stop) {
      this.bottom += Setting.CREDIT_SCENE_SPEED * game.delta;
    } else {
      if (this.afterScene) {
        this.afterScene = false;
        this.root.fadeOut(5000);
        $("#black-screen").animate({ opacity: 1 }, 5000);
        setTimeout(() => {
          $("#after-scene-container").currentTime = 0;
          $("#after-scene-container").fadeIn(2000);
        }, 5000);
      }
    }
  }
}
