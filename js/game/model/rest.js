import { GET_REST_SPRITE } from "../facade/file.js";
import { checkBlockCollide } from "../facade/helper.js";
import { GAME } from "../game.js";
import { Object } from "../parent/object.js";
import { UI } from "./ui.js";

export class Rest extends Object {
  static GenerateRest() {
    const game = GAME.getInstance();
    const sprite = GET_REST_SPRITE();

    const x = 100;
    const y = game.height - 270;
    const w = 150;
    const h = 70;
    const obj = new this(x, y, w, h, GET_REST_SPRITE(), 1, game.ctx, false);
    game.objects.push(obj);

    return obj;
  }

  listener(e) {
    const ui = UI.getInstance();
    const game = GAME.getInstance();
    if (e.key == "ArrowUp") {
      /* Getting the instance of the UI class. */
      ui.whiteScreen(300);
      game.player.maxHealth();
      console.log(game.player.health);
      ui.changeHealth(game.player.health);
    }
  }

  logic() {
    const game = GAME.getInstance();
    if (
      checkBlockCollide(
        this.x,
        this.y,
        this.w,
        this.h,
        game.player.x,
        game.player.y,
        game.player.w,
        game.player.h
      )
    ) {
      window.addEventListener("keydown", this.listener);
      game.ui.showRest();
    } else {
      window.removeEventListener("keydown", this.listener);
      game.ui.hideRest();
    }
  }

  constructor(x, y, w, h, sprite, maxSprite, ctx, color) {
    super(x, y, w, h, sprite, maxSprite, ctx, color, false);
  }
}
