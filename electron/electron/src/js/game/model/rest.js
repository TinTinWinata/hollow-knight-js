import { MyAudio } from "../facade/audio.js";
import { GET_REST_SPRITE } from "../facade/file.js";
import { checkBlockCollide } from "../facade/helper.js";
import { GAME } from "../game.js";
import { Object } from "../parent/object.js";
import { Setting } from "../setting.js";
import { UI } from "./ui.js";

export class Rest extends Object {
  static GenerateRest() {
    const game = GAME.getInstance();

    const x = game.width - 900;
    const y = game.height - 270;
    const w = 150;
    const h = 70;
    const obj = new this(x, y, w, h, GET_REST_SPRITE(), 1, game.ctx, false);
    game.objects.push(obj);
    game.rest = obj;
    return obj;
  }

  listener(e) {
    const ui = UI.getInstance();
    const game = GAME.getInstance();
    if (Setting.PLAYER_INTERACT.includes(e.key)) {
      /* Getting the instance of the UI class. */
      ui.whiteScreen(200, 0.5);
      game.audio.play(MyAudio.BENCH_REST, false);
      game.player.maxHealth();
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
    super(x, y, w, h, sprite, maxSprite, ctx, color, false, null, true);
  }
}
