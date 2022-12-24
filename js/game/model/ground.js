import { GAME } from "../game.js";
import { GET_FLOOR_SPRITE, GET_PLATFORM_SPRITE } from "../facade/file.js";
import { Object } from "../parent/object.js";
import { Setting } from "../setting.js";

export class Ground extends Object {
  static GeneratePlatform() {
    const sprite = GET_PLATFORM_SPRITE();
    const nodeList = [
      {
        x: 300,
        y: 800,
        w: 400,
      },
      {
        x: 900,
        y: 700,
        w: 300,
      },
      {
        x: 400,
        y: 600,
        w: 300, 
      },
    ];
    const game = GAME.getInstance();
    for (let i = 0; i < nodeList.length; i++) {
      // Create position
      const h = Setting.PLATFORM_HEIGHT;
      const y = nodeList[i].y;
      const x = nodeList[i].x;
      const w = nodeList[i].w;

      const obj = new Object(x, y, w, h, sprite, 1, game.ctx, null);
      game.objects.push(obj);
    }
  }

  static GenerateGround() {
    const game = GAME.getInstance();
    const y = game.height - 200;
    const w = 300;
    const h = 80;
    const totalGround = 20;

    // Offset for making ground makes assembled together
    const offset = 20;

    // Make all ground black below the top ground
    game.grounds.push(
      new Object(
        0,
        y + h / 2,
        totalGround * w,
        game.height,
        null,
        null,
        game.ctx,
        "black"
      )
    );
    // Make top ground with pushing the object
    for (let i = 0; i < w * totalGround; i += w) {
      const ground = new Ground(i - offset, y, w + offset, h, game.ctx);
      ground.setColliderOffset(0, 0, 0, 0);
      game.grounds.push(ground);
    }
  }

  constructor(x, y, w, h, ctx) {
    const sprite = GET_FLOOR_SPRITE();
    super(x, y, w, h, sprite, 1, ctx);
  }
}
