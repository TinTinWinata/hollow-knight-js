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
    speed: 3,
  },
  splash2: {
    max: 2,
    speed: 3,
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

export const FLIES_CONF = {
  max: 8,
  speed: 6,
};

export const HIT_CONF = {
  enemy: {
    max: 3,
    speed: 10,
  },
};
export const CRAWLID_CONF = {
  walk: {
    max: 4,
    speed: 10,
  },
  die: {
    max: 5,
    speed: 3,
  },
};

const CACHE = new Map();

export function GET_UI_HEALTH() {
  const img = new Image();
  img.src = "/assets/game/ui/health.png";
  return img;
}

export function GET_BOSS_DOOR(n) {
  // 1 -> Door Background
  // 2 -> Door
  // 3 -> White portal
  const image = new Image();
  image.src = `/assets/game/boss_door/boss_door_${n}.png`;
  return image;
}

export function GET_CRAWLID_DIE() {
  const imageList = [];
  for (let i = 1; i <= CRAWLID_CONF.die.max; i++) {
    imageList.push(LOAD_IMAGE(`/assets/game/crawlid/die/die_0${i}.png`));
  }
  return imageList;
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

export function GET_HIT() {
  const cacheName = "hit";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= HIT_CONF.enemy.max; i++) {
    const idx = pad(i);
    imageList.push(LOAD_IMAGE(`/assets/game/particle/hit/hit_${idx}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_PLAYER_JUMP_SPRITE() {
  const cacheName = "player_jump";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.jump.max; i++) {
    const idx = pad(i);
    imageList.push(LOAD_IMAGE(`/assets/game/hero/jump/jump_${idx}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_FLIES_SPRITE() {
  const cacheName = "flies";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= FLIES_CONF.max; i++) {
    imageList.push(LOAD_IMAGE(`/assets/game/flies/flies_0${i}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_PLAYER_ATTACK_SPRITE() {
  const cacheName = "player_attack";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.attack.max; i++) {
    imageList.push(LOAD_IMAGE(`/assets/game/hero/attack/attack_0${i}.png`));
  }

  CACHE.set(cacheName, imageList);

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
  const cacheName = "player_idle";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.idle.max; i++) {
    imageList.push(LOAD_IMAGE(`/assets/game/hero/idle/idle_0${i}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_PLAYER_WALK_SPRITE() {
  const cacheName = "player_walk";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.walk.max; i++) {
    imageList.push(LOAD_IMAGE(`/assets/game/hero/walk/walk_0${i}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_BG_FIRST() {
  return LOAD_IMAGE("/assets/game/object/background_2.png");
}
export function GET_BOSS_BG() {
  return LOAD_IMAGE("/assets/game/object/background_1.png");
}
