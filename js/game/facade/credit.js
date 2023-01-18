import { GAME } from "../game.js";
import { Setting } from "../setting.js";
import { getWindowSize, isDivColliding } from "./helper.js";

const SETTING_TEXT = [
  {
    fontSize: "",
    lineHeight: "40px",
    marginBottom: "350px",
  },
  {
    fontSize: "40px",
    lineHeight: "85px",
    marginBottom: "650px",
  },
];

const SETTING_HEADER = [
  {
    fontSize: "",
  },
  {
    fontSize: "60px",
  },
];

const SETTING_CONTENT = [
  {
    fontSize: "",
  },
  {
    fontSize: "40px",
  },
];

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
    this.alreadyCollide = false;

    this.root = $("#credit-scene-root");
    this.bottom = 0;
    this.container = $("#credit-scene");
    this.text = $(".credit-text");
    this.endHeader = $(".credit-end-header");
    this.endContent = $(".credit-end-content");
    this.stopDiv = $("#credit-scene .stop");
  }

  setFullScreen() {
    const game = GAME.getInstance();
    if (game.isFullscreen()) {
      this.text.css(SETTING_TEXT[1]);
      this.endHeader.css(SETTING_HEADER[1]);
      this.endContent.css(SETTING_CONTENT[1]);
    } else {
      this.text.css(SETTING_TEXT[0]);
      this.endHeader.css(SETTING_HEADER[0]);
      this.endContent.css(SETTING_CONTENT[0]);
    }
  }

  checkCollide() {
    if (isDivColliding($("#credit-scene .stop"), $(".credit-end-header"))) {
      this.alreadyCollide = true;
      console.log("colliding");
    }
  }

  showCredit() {
    this.container.show();
    this.checkCollide();
    this.root.css("bottom", `${this.bottom}%`);
    const game = GAME.getInstance();
    this.setFullScreen();
    if (this.afterScene && this.alreadyCollide) {
      this.afterScene = false;
      this.root.fadeOut(5000);
      $("#black-screen").animate({ opacity: 1 }, 5000);
      setTimeout(() => {
        $("#after-scene-container").currentTime = 0;
        $("#after-scene-container").fadeIn(2000);
      }, 5000);
    } else if (!this.alreadyCollide) {
      this.bottom += Setting.CREDIT_SCENE_SPEED * game.delta;
    }
  }
}
