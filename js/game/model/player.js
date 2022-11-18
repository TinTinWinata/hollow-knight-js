import { Character } from "../parent/character.js";

export class Player extends Character {
  constructor(x, y, w, h, sprite, maxSprite) {
    super(x, y, w, h, sprite, maxSprite);
  }
}
