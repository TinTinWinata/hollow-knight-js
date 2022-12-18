import { GAME } from "../game.js";
import { GET_UI_HEALTH, GET_UI_LEFT, GET_UI_MONEY } from "../facade/file.js";

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
    this.addPauseListener();
  }

  addPauseListener() {
    $("#start-game").click(() => {
      const game = GAME.getInstance();
      game.resumeGame();
    });

    $("#option-fps").click(() => {
      $("#fps").toggle();
    });
  }

  fps(n) {
    $("#fps").html(n);
  }

  deadScreen() {
    $("#black-screen").fadeIn(2000);
  }

  whiteScreen(n) {
    $("#white-screen").fadeIn(n);
    setTimeout(() => {
      $("#white-screen").fadeOut(n);
    }, n);
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

  incrementMoney() {
    this.money += 1;
    this.changeMoney(this.money);
  }

  changeMoney(n) {
    $("#money-text").text(n);
  }
}
