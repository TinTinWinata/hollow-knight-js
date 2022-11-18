import { GET_FLOOR_SPRITE } from "../facade/file.js";
import { Object } from "../parent/object.js";

export class Ground extends Object {
  constructor(x, y, w, h, ctx) {
    const sprite = GET_FLOOR_SPRITE();
    super(x, y, w, h, sprite, 1, ctx);
  }
}
