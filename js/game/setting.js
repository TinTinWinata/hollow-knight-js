export class Setting {
  static WIDTH = 2000;
  static HEIGHT = 1200;

  static SCALE = 0.7;

  static PLAYER_MOVEMENT_UP = "ArrowUp";
  static PLAYER_MOVEMENT_LEFT = "ArrowLeft";
  static PLAYER_MOVEMENT_RIGHT = "ArrowRight";
  static PLAYER_MOVEMENT_DOWN = "ArrowDown";
  static PLAYER_JUMP = "z";
  static PLAYER_ATTACK = "x";

  static PLAYER_INTERACT = [" ", "e"];

  static FPS = 60;
  static CHARACTER_SPEED = 30;
  static CHARACTER_MAX_SPEED = 300;
  static CHARACTER_JUMP_FORCE = 720;
  static GRAVITY = 30;

  static CRAWLID_SPEED = 24;
  static CRAWLID_MAX_SPEED = 100;

  static GENERATED_FLIES = 30;
  static FLIES_WIDTH = 100;
  static FLIES_HEIGHT = 100;
  static KNOCKBACK_POWER = 3000;

  static OPEN_DOOR_SPEED_Y = 30;
  static OPEN_DOOR_SPEED_X = 5;
  static DOOR_FADE_LIGHT = 0.5;

  static TOTAL_CRAWLID = 10;

  static BOSS_INITIAL_X = 500;
  static BOSS_INITIAL_Y = Setting.HEIGHT - 350 - 250;
  static BOSS_ATTACK_PREP_TIME = 3;
  static BOSS_WIDTH = 550;
  static BOSS_HEIGHT = 400;
  static BOSS_ATTACK_TIMES = 3;
  static BOSS_INVERT_MULTIPLIES = 10;

  static SHAKE_SIZE = 20;
}
