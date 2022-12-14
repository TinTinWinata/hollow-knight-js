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
import { Rest } from "./model/rest.js";

function start() {
  const game = GAME.getInstance();
  game.canvas.width = game.width;
  game.canvas.height = game.height;

  const player = new Player(
    game.width / 2 - 250,
    -300,
    Setting.CHARACTER_WIDTH * game.scale,
    Setting.CHARACTER_HEIGHT * game.scale,
    GET_PLAYER_IDLE_SPRITE(),
    PLAYER_CONF.idle
  );

  player.jumping = true;
  player.changeSprite("jump");

  const bg = new Background(
    0,
    0,
    game.width + 300,
    game.height,
    GET_BG_FIRST(),
    game.ctx,
    50
  );

  // Generate Foreground
  Background.GenerateForeground();

  // Creating Ground
  Ground.GenerateGround();

  // Creating Platform
  Ground.GeneratePlatform();
  Character.GenerateFlies();

  // Spawn Enemy
  game.spawnEnemy();
  setInterval(() => {
    game.spawnEnemy();
  }, 10000);

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

  // Generate Rest
  Rest.GenerateRest();

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
  game.render();
}

function startGame() {
  $("#start-menu").fadeOut();
  start();
}

// startGame();

$("#start").click(() => {
  startGame();
});
