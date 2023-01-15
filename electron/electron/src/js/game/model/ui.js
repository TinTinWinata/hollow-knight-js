import { GAME } from "../game.js";
import { GET_UI_HEALTH, GET_UI_LEFT, GET_UI_MONEY } from "../facade/file.js";
import { Setting } from "../setting.js";

export class UI {
  static instance;
  static getInstance = () => {
    if (this.instance == null) {
      this.instance = new UI();
    }
    return this.instance;
  };

  constructor() {
    this.money = 0;
    this.totalHealth = 5;
    $("#ui").show();
    this.skillText = $("#skill-text");
    this.skillContainer = $("#skill-container");
    this.addPauseListener();
  }

  setSkillText(n) {
    this.skillText.html(n);
    if (n == 0) {
      this.skillContainer.hide();
    } else {
      this.skillContainer.show();
    }
  }

  addPauseListener() {
    $("#start-game").click(() => {
      const game = GAME.getInstance();
      game.resumeGame();
    });

    $("#option-fps").click(() => {
      $("#fps").toggle();
    });

    $("#exit-game").click(() => {
      const game = GAME.getInstance();
      game.backToMenu();
    });
  }

  fps(n) {
    $("#fps").html(n);
  }

  deadScreen() {
    const game = GAME.getInstance();
    $("#wck-screen").fadeIn(Setting.DEATH_SCREEN_TIME);
    $("#death-menu").fadeIn(Setting.DEATH_SCREEN_TIME);
    setTimeout(() => {
      game.backToMenu();
    }, 5000);
  }

  whiteScreen(n, opacity = 1) {
    jQuery("#white-screen").css("opacity", opacity);

    $("#white-screen").fadeIn(n);
    setTimeout(() => {
      $("#white-screen").fadeOut(n);
    }, n);
  }

  hideUi() {
    $("#ui").fadeOut(1000);
  }

  reset() {
    $(".health").show();
    $("#money-text").text(0);
  }

  showRest() {
    $("#rest").fadeIn(100);
  }
  hideRest() {
    $("#rest").fadeOut(100);
  }

  changeHealth(n) {
    $(".health").show();
    const nToHide = this.totalHealth - n;
    for (let i = nToHide - 1; i >= 0; i--) {
      $(".health").eq(i).hide();
    }
  }

  showPause() {
    $("#pause-game").show();
  }

  hidePause() {
    $("#pause-game").hide();
  }

  incrementMoney(n = 1) {
    this.money += n;
    this.changeMoney(this.money);
  }

  changeMoney(n) {
    $("#money-text").text(n);
  }

  hideTitle() {
    $("#title").fadeOut(1000);
  }

  changeTitle(str) {
    $("#title").html(str);
  }
  showTitle(n, str = "") {
    if (str != "") {
      this.changeTitle(str);
    }
    $("#title").fadeIn(1000);
    setTimeout(() => {
      $("#title").fadeOut(1000);
    }, n);
  }
}
