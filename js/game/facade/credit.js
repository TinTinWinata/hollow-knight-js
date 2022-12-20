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
    this.afterScene = true;

    this.root = $("#credit-scene-root");
    this.total = 0;
    // this.addAllTemplate();
    this.bottom = 0;
    this.container = $("#credit-scene");
  }

  addAllTemplate() {
    this.addTemplate("Created By TinTin Winata", "h2");
    this.addTemplate("Web Design NAR 23-1", "h2");
    this.addTemplate(
      "Alongside Courage And Perseverance We Shape and Define Our Future",
      "h3"
    );
    this.addTemplate("- JT 22-1", "h2");
    this.addTemplate("Hollow Knight", "h1");
  }

  addTemplate(name, el) {
    this.root.append(this.createTemplate(name, el));
  }

  createTemplate(name, el = "h1") {
    const template = `
      <${el} class="credit-text" id="credit-${this.total}">${name}</${el}>
    `;
    return template;
  }

  showCredit() {
    this.container.show();
    const h = this.root.position();
    this.root.css("bottom", `${this.bottom}%`);
    const game = GAME.getInstance();
    if (this.bottom < 345) {
      this.bottom += Setting.CREDIT_SCENE_SPEED * game.delta;
    } else {
      if (this.afterScene) {
        this.afterScene = false;
        this.root.fadeOut(5000);
        $("#black-screen").animate({ opacity: 1 }, 5000);
        setTimeout(() => {
          $("#after-scene").currentTime = 0;
          $("#after-scene").fadeIn(2000);
        }, 5000);
      }
    }
  }
}
