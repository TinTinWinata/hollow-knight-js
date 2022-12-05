import { pad, randomInt } from "./helper.js";

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
    speed: 3,
  },
  splash1: {
    max: 2,
    speed: 2,
  },
  splash2: {
    max: 2,
    speed: 2,
  },
  attack: {
    max: 3,
    speed: 10,
  },
  jump: {
    max: 11,
    speed: 6,
  },
};

export const CRAWLID_CONF = {
  walk: {
    max: 4,
    speed: 10,
  },
};

export function GET_UI_HEALTH() {
  const img = new Image();
  img.src = "/assets/game/ui/health.png";
  return img;
}

export function GET_UI_LEFT() {
  const img = new Image();
  img.src = "/assets/game/ui/left.png";
  return img;
}

export function GET_UI_MONEY() {
  const img = new Image();
  img.src = "/assets/game/ui/money.png";
  return img;
}

export function GET_CRAWLID_WALK() {
  const imageList = [];
  for (let i = 1; i <= CRAWLID_CONF.walk.max; i++) {
    imageList.push(LOAD_IMAGE(`/assets/game/crawlid/crawlid_0${i}.png`));
  }
  return imageList;
}

export function GET_PLAYER_JUMP_SPRITE() {
  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.jump.max; i++) {
    const idx = pad(i);
    imageList.push(LOAD_IMAGE(`/assets/game/hero/jump/jump_${idx}.png`));
  }
  return imageList;
}
export function GET_PLAYER_ATTACK_SPRITE() {
  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.attack.max; i++) {
    imageList.push(LOAD_IMAGE(`/assets/game/hero/attack/attack_0${i}.png`));
  }
  return imageList;
}

export function GET_PLAYER_ATTACK_SPLASH_1_SPRITE() {
  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.splash1.max; i++) {
    imageList.push(LOAD_IMAGE(`/assets/game/hero/splash_1/splash-1_0${i}.png`));
  }
  return imageList;
}

export function GET_PLAYER_ATTACK_SPLASH_2_SPRITE() {
  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.splash2.max; i++) {
    imageList.push(LOAD_IMAGE(`/assets/game/hero/splash_2/splash-2_0${i}.png`));
  }
  return imageList;
}

export function GET_PLAYER_ATTACK_SPLASH_SPRITE(i) {
  return GET_PLAYER_ATTACK_SPLASH_1_SPRITE();
  if (i == 1) {
    return GET_PLAYER_ATTACK_SPLASH_1_SPRITE();
  } else {
    return GET_PLAYER_ATTACK_SPLASH_2_SPRITE();
  }
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
