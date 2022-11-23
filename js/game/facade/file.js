import { randomInt } from "./helper.js";

export const PLAYER_CONF = {
  walk: {
    max: 8,
    speed: 4,
  },
  idle: {
    max: 5,
    speed: 4,
  },
  splash: {
    max: 2,
    speed: 2,
  },
};

function GET_PLAYER_ATTACK_SPLASH_SPRITE() {
  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.splash.max; i++) {
    imageList.push(LOAD_IMAGE(`/assets/game/hero/splash/splash_0${i}.png`));
  }
  return imageList;
}

function LOAD_IMAGE(str) {
  const image = new Image();
  image.src = str;
  return image;
}

export function GET_FLOOR_SPRITE() {
  const imageList = [];
  const idx = randomInt(6, 6);
  imageList.push(LOAD_IMAGE(`/assets/game/object/floor_${idx}.png`));
  return imageList;
}

export function GET_PLAYER_IDLE_SPRITE() {
  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.idle.max; i++) {
    imageList.push(LOAD_IMAGE(`/assets/game/hero/idle/idle_0${i}.png`));
  }
  return imageList;
}

export function GET_PLAYER_WALK_SPRITE() {
  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.walk.max; i++) {
    imageList.push(LOAD_IMAGE(`/assets/game/hero/walk/walk_0${i}.png`));
  }
  return imageList;
}

export function GET_BG_FIRST() {
  return LOAD_IMAGE("/assets/game/object/background_3.png");
}
