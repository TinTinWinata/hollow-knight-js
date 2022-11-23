import {
  GET_BG_FIRST,
  GET_PLAYER_IDLE_SPRITE,
  PLAYER_CONF,
} from "./facade/file.js";
import { Background } from "./model/background.js";
import { GAME } from "./data.js";
import { Ground } from "./model/ground.js";
import { Player } from "./model/player.js";

const game = GAME.getInstance();

game.canvas.width = game.width;
game.canvas.height = game.height;

let lagInterval = 0;
let lastTime = new Date();

function getDelta() {
  const nowTime = new Date();
  const delta = (nowTime - lastTime) / 1000;
  lastTime = nowTime;
  return delta;
}

function isRun() {
  lagInterval += getDelta();
  if (lagInterval > 1 / game.fps) {
    lagInterval = 0;
    return true;
  } else {
    return false;
  }
}

const player = new Player(
  0,
  0,
  200,
  220,
  GET_PLAYER_IDLE_SPRITE(),
  PLAYER_CONF.idle
);

const bg = new Background(
  0,
  0,
  game.width + 2000,
  game.height,
  GET_BG_FIRST(),
  game.ctx
);

Ground.generateBackground();

game.characters.push(player);

window.addEventListener("keydown", (e) => {
  if (e.key == "z") {
    player.attack();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key == "w") {
    player.jump();
  }

  game.keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  game.keys[e.key] = false;
});

render();

function renderParticle() {
  for (let i = 0; i < game.particles.length; i++) {
    game.particles[i].render();
    if (game.particles[i].dead) {
      game.particles.splice(i, 1);
    }
  }
}

function render() {
  if (isRun()) {
    bg.render();
    // game.debug(player);
    game.objects.forEach((object) => {
      object.render();
    });
    game.characters.forEach((character) => {
      character.render();
    });
    renderParticle();
  }
  requestAnimationFrame(render);
}
