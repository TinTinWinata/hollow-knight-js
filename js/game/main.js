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
import { Object } from "./parent/object.js";
import { Boofly } from "./model/boofly.js";

const game = GAME.getInstance();

game.canvas.width = game.width;
game.canvas.height = game.height;

const player = new Player(
  game.width / 2,
  game.height - 350,
  Setting.CHARACTER_WIDTH * game.scale,
  Setting.CHARACTER_HEIGHT * game.scale,
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

// Creating Ground
Ground.GenerateGround();

// Creating Platform
Ground.GeneratePlatform();
Character.GenerateFlies();

// Generate Bosss Door
const bossDoor = BossDoor.GetInstance();
bossDoor.generateDoor();
bossDoor.generateBackground();
game.bossDoor = bossDoor;

// Setting Game Object
game.mainBackground = bg;
// game.backgrounds.push(bg);s
game.player = player;
game.characters.push(player);

// Generate Enemies
Boofly.Generate();
Crawlid.GenerateCrawlid(1);
Crawlid.GenerateCrawlid(game.width - 1);
setInterval(() => {
  if (!game.bossFight && game.enemyAlive() <= 10) {
    Boofly.Generate();
    Crawlid.GenerateCrawlid(1);
    Crawlid.GenerateCrawlid(game.width - 1);
  }
}, Setting.ENEMY_SPAWN_TIME);

window.addEventListener("keydown", (e) => {
  if (game.canMove) {
    if (e.key == Setting.PLAYER_ATTACK) {
      player.attack();
    } else if (e.key == Setting.PLAYER_DASH) {
      player.dash();
    }
  }
});

window.addEventListener("keydown", (e) => {
  if (game.canMove) {
    if (e.key == Setting.PLAYER_JUMP) {
      player.jump();
    }
    game.keys[e.key] = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (game.canMove) {
    game.keys[e.key] = false;
  }
});

// Camera Initialization
const setting = {
  distance: game.width,
};
const camera = new Camera(game.ctx, setting);
game.camera = camera;

// !Debugging Purpose
// game.changeBossScene();
console.log(game.pause);
game.render();
