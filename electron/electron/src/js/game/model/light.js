import { GAME } from "../game";

export class Light {
  constructor(x, y, radius, color = "white") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  render() {
    const lightRadius = this.radius; // 200
    const game = GAME.getInstance();
    game.ctx.beginPath();
    game.ctx.fillStyle = this.color;
    var radgrad = game.ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      lightRadius
    );
    radgrad.addColorStop(0, "rgba(255,255,255,0.45)");
    radgrad.addColorStop(0.2, "rgba(255,255,255,0.25)");
    radgrad.addColorStop(0.5, "rgba(255,255,255,0.15)");
    radgrad.addColorStop(1, "rgba(160,230,255,0)");

    game.ctx.fillStyle = radgrad;
    game.ctx.fillRect(0, 0, game.width, game.height);
    game.ctx.globalAlpha = 1;
  }
}
