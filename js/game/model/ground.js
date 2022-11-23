import { GAME } from "../data.js";
import { GET_FLOOR_SPRITE } from "../facade/file.js";
import { Object } from "../parent/object.js";

export class Ground extends Object {
  static generateBackground() {
    const game = GAME.getInstance();
    const y = game.height - 200;
    const w = 300;
    const h = 80;
    const totalGround = 20;

    // Offset for making ground makes assembled together
    const offset = 20;

    // Make top ground with pushing the object
    for (let i = 0; i < w * totalGround; i += w) {
      console.log("looping");
      game.objects.push(new Ground(i - offset, y, w + offset, h, game.ctx));
    }

    // Make all ground black below the top ground
    game.objects.push(
      new Object(
        0,
        y + h / 2,
        game.width,
        game.height,
        null,
        null,
        game.ctx,
        "black"
      )
    );
  }

  constructor(x, y, w, h, ctx) {
    const sprite = GET_FLOOR_SPRITE();
    super(x, y, w, h, sprite, 1, ctx);
  }
}
