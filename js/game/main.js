import {
  GET_BG_FIRST,
  GET_PLAYER_IDLE_SPRITE,
  GET_PLAYER_JUMP_SPRITE,
  PLAYER_CONF,
} from "./facade/file.js";
import { Background } from "./model/background.js";
import { GAME } from "./game.js";
import { Ground } from "./model/ground.js";
import { Player } from "./model/player.js";
import { Crawlid } from "./model/crawlid.js";
import { UI } from "./model/ui.js";
import Camera from "./facade/camera.js";
import { Character } from "./parent/character.js";
import { BossDoor } from "./model/bossdoor.js";
import { Setting } from "./setting.js";

const game = GAME.getInstance();

game.canvas.width = game.width;
game.canvas.height = game.height;

let lagInterval = 0;
let lastTime = new Date();
let frameCounter = 0;
let timeEllapsed = 0;
let tempTimeInterval = 0;
let tempFrameCounter = 0;

const ui = UI.getInstance();

function calculateTimeEllapse(delta) {
  timeEllapsed += delta;
  tempTimeInterval += delta;

  if (tempTimeInterval > 1) {
    ui.fps(tempFrameCounter);
    tempTimeInterval = 0;
    tempFrameCounter = 0;
  }
}

function getDelta() {
  const nowTime = new Date();
  const delta = (nowTime - lastTime) / 1000;
  calculateTimeEllapse(delta);

  game.delta = delta;
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

// Generate Bosss Door
const bossDoor = BossDoor.GetInstance();
bossDoor.generateDoor();
bossDoor.generateBackground();

// Setting Game Object
game.mainBackground = bg;
// game.backgrounds.push(bg);s
game.player = player;
game.characters.push(player);

// Generatet Crawlid
// setInterval(() => {
//   if (!game.bossFight && Setting.TOTAL_CRAWLID >= game.killedCrawlid) {
//     game.enemies.push(Crawlid.GenerateCrawlid(1));
//     game.enemies.push(Crawlid.GenerateCrawlid(game.width - 1));
//   }
// }, 1000);

window.addEventListener("keydown", (e) => {
  if (e.key == Setting.PLAYER_ATTACK) {
    player.attack();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key == Setting.PLAYER_JUMP) {
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
game.camera = camera;

render();

// !Debugging Purpose
game.changeBossScene();

function calculateFps() {
  tempFrameCounter += 1;
}

function render() {
  calculateFps();
  getDelta();
  if (!game.pause) {
    camera.begin();

    if (game.shake) {
      camera.shake();
    }
    camera.moveTo(player.x + 100, player.y - 50);
    game.mainBackground.render();
    game.backgrounds.forEach((obj) => {
      obj.render();
    });
    game.objects.forEach((object) => {
      object.render();
    });
    if (!game.bossFight) bossDoor.render();
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
