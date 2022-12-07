import {
  GET_BG_FIRST,
  GET_PLAYER_IDLE_SPRITE,
  GET_PLAYER_JUMP_SPRITE,
  PLAYER_CONF,
} from "./facade/file.js";
import { Background } from "./model/background.js";
import { GAME } from "./data.js";
import { Ground } from "./model/ground.js";
import { Player } from "./model/player.js";
import { Crawlid } from "./model/crawlid.js";
import { UI } from "./model/ui.js";
import Camera from "./facade/camera.js";
import { Character } from "./parent/character.js";

const game = GAME.getInstance();

game.canvas.width = game.width;
game.canvas.height = game.height;

let lagInterval = 0;
let lastTime = new Date();

function getDelta() {
  const nowTime = new Date();
  const delta = (nowTime - lastTime) / 1000;
  game.delta = delta;
  // !Debugging Purpose
  // console.log("delta : ", delta);
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
  game.width / 2,
  game.height - 350,
  150 * game.scale,
  170 * game.scale,
  GET_PLAYER_IDLE_SPRITE(),
  PLAYER_CONF.idle
);

const bg = new Background(
  0,
  0,
  game.width + 300,
  game.height,
  GET_BG_FIRST(),
  game.ctx
);

Ground.generateBackground();
Character.GenerateFlies();

game.backgrounds.push(bg);
game.characters.push(player);
game.enemies.push(Crawlid.GenerateCrawlid(1));
game.enemies.push(Crawlid.GenerateCrawlid(game.width - 1));

// Get Instance UI
const ui = UI.getInstance();

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

function renderParticle() {
  for (let i = 0; i < game.particles.length; i++) {
    game.particles[i].render();
    if (game.particles[i].dead) {
      game.particles.splice(i, 1);
    }
  }
}

// Camera Initialization
const setting = {
  distance: game.width,
};
const camera = new Camera(game.ctx, setting);
render();

let i = 1;

function render() {
  /* Zooming the camera to 10. */
  if (isRun() && !game.pause) {
    camera.begin();
    camera.moveTo(player.x + 100, player.y - 50);
    game.backgrounds.forEach((obj) => {
      obj.render();
    });
    // game.debug(player);
    game.objects.forEach((object) => {
      object.render();
    });
    game.enemies.forEach((enemy) => {
      enemy.render();
    });
    game.characters.forEach((character) => {
      character.render();
    });
    game.flies.forEach((fly) => {
      fly.render();
    });

    game.renderDebugs();
    renderParticle();

    camera.end();
  }
  requestAnimationFrame(render);
}
