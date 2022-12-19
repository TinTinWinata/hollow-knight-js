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
    this.root = $("#credit-scene-root");
    this.total = 0;
    this.addAllTemplate();
    this.bottom = 0;
    this.container = $("#credit-scene");
  }

  addAllTemplate() {
    this.addTemplate("Created By TinTin Winata", "h4");
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
    console.log("bottom : ", this.bottom);
    this.container.show();
    this.root.css("bottom", `${this.bottom}%`);
    const game = GAME.getInstance();
    this.bottom += Setting.CREDIT_SCENE_SPEED * game.delta;
  }
}
