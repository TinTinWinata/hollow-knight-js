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
    speed: 3,
  },
  attack: {
    max: 2,
    speed: 10,
  },
  attack2: {
    max: 2,
    speed: 7,
  },
  jump: {
    max: 11,
    speed: 3,
  },
  dash: {
    max: 2,
    speed: 6,
  },
  hitted: {
    max: 3,
    speed: 13,
  },
  dead: {
    max: 4,
    speed: 30,
  },
};

export const BOSS_CONF = {
  idle: {
    max: 5,
    speed: 7,
  },
  attack_prep: {
    max: 6,
    speed: 5,
  },
  attack: {
    max: 8,
    speed: 4,
  },
  jump: {
    max: 7,
    speed: 6,
  },
  land: {
    max: 3,
    speed: 5,
  },
  die: {
    max: 1,
    speed: 5,
  },
  stun: {
    max: 12,
    speed: 5,
  },
  ghost_die: {
    max: 4,
    speed: 10,
  },
};

export const BOOFLY_CONF = {
  fly: {
    max: 5,
    speed: 3,
  },
  die: {
    max: 3,
    speed: 10,
  },
};

export const FLIES_CONF = {
  max: 8,
  speed: 6,
};

export const HIT_CONF = {
  enemy: {
    max: 3,
    speed: 1,
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

export function GET_REST_SPRITE() {
  const cacheName = "bench";
  const cache = CACHE.get(cacheName);

  if (cache != null) {
    return cache;
  } else {
    const img = new Image();
    img.src = "assets/game/object/bench.png";
    CACHE.set(cacheName, [img]);
    return [img];
  }
}

export function GET_UI_HEALTH() {
  const img = new Image();
  img.src = "assets/game/ui/health.png";
  return img;
}

export function GET_PLATFORM_SPRITE() {
  const cacheName = "platform";
  const cache = CACHE.get(cacheName);

  if (cache != null) {
    return cache;
  } else {
    const img = new Image();
    img.src = "assets/game/platform/platform.png";
    CACHE.set(cacheName, [img]);
    return [img];
  }
}

export function GET_BOSS_DOOR(n) {
  // 1 -> Door Background
  // 2 -> Door
  // 3 -> White portal
  const cacheName = "boss_door_" + n;
  const cache = CACHE.get(cacheName);

  if (cache != null) {
    return cache;
  }
  const image = new Image();
  image.src = `assets/game/boss_door/boss_door_${n}.png`;
  CACHE.set(cacheName, image);

  return image;
}

export function GET_BOOFLY_DIE() {
  const cacheName = "boofly_die";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= BOOFLY_CONF.die.max; i++) {
    imageList.push(LOAD_IMAGE(`assets/game/boofly/die/die_0${i}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_BOOFLY_FLY() {
  const cacheName = "boofly_fly";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= BOOFLY_CONF.fly.max; i++) {
    imageList.push(LOAD_IMAGE(`assets/game/boofly/fly/fly_0${i}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_BOSS_DIE_SPRITE() {
  const cacheName = "boss_die";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }
  const imageList = [];
  for (let i = 1; i <= BOSS_CONF.die.max; i++) {
    imageList.push(LOAD_IMAGE(`assets/game/boss/die/die_0${i}.png`));
  }
  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_BOSS_LAND_SPRITE() {
  const cacheName = "boss_land";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }
  const imageList = [];
  for (let i = 1; i <= BOSS_CONF.land.max; i++) {
    imageList.push(LOAD_IMAGE(`assets/game/boss/land/land_0${i}.png`));
  }
  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_CRAWLID_DIE() {
  const cacheName = "crawlid_die";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= CRAWLID_CONF.die.max; i++) {
    imageList.push(LOAD_IMAGE(`assets/game/crawlid/die/die_0${i}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_UI_LEFT() {
  const img = new Image();
  img.src = "assets/game/ui/left.png";
  return img;
}

export function GET_UI_MONEY() {
  const img = new Image();
  img.src = "assets/game/ui/money.png";
  return img;
}

export function GET_CRAWLID_WALK() {
  const imageList = [];
  for (let i = 1; i <= CRAWLID_CONF.walk.max; i++) {
    imageList.push(LOAD_IMAGE(`assets/game/crawlid/walk/crawlid_0${i}.png`));
  }
  return imageList;
}

export function GET_BOSS_JUMP_SPRITE() {
  const cacheName = "boss_jump_sprite";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= BOSS_CONF.jump.max; i++) {
    const idx = pad(i);
    imageList.push(LOAD_IMAGE(`assets/game/boss/jump/jump_${idx}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_BOSS_ATTACK_PREP_SPRITE() {
  const cacheName = "boss_attack_prep";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= BOSS_CONF.attack_prep.max; i++) {
    const idx = pad(i);
    imageList.push(
      LOAD_IMAGE(`assets/game/boss/attack_prep/attack_prep_${idx}.png`)
    );
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}
export function GET_BOSS_ATTACK_SPRITE() {
  const cacheName = "boss_attack";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= BOSS_CONF.attack.max; i++) {
    const idx = pad(i);
    imageList.push(LOAD_IMAGE(`assets/game/boss/attack/attack_${idx}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_BOSS_IDLE_SPRITE() {
  const cacheName = "boss_idle";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= BOSS_CONF.idle.max; i++) {
    const idx = pad(i);
    imageList.push(LOAD_IMAGE(`assets/game/boss/idle/idle_${idx}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}
export function GET_BOSS_GHOST_SPRITE() {
  const cacheName = "ghost_die";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= BOSS_CONF.ghost_die.max; i++) {
    const idx = pad(i);
    imageList.push(
      LOAD_IMAGE(`assets/game/boss/ghost_die/ghost_die_${idx}.png`)
    );
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}
export function GET_BOSS_STUN_SPRITE() {
  const cacheName = "boss_stun";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= BOSS_CONF.stun.max; i++) {
    const idx = pad(i);
    imageList.push(LOAD_IMAGE(`assets/game/boss/stun/stun_${idx}.png`));
  }

  CACHE.set(cacheName, imageList);
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
    imageList.push(LOAD_IMAGE(`assets/game/particle/hit/hit_${idx}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_PLAYER_DEAD() {
  const cacheName = "player_dead";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.dead.max; i++) {
    const idx = pad(i);
    imageList.push(LOAD_IMAGE(`assets/game/hero/dead/dead_${idx}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_PLAYER_HITTED() {
  const cacheName = "player_hit";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.hitted.max; i++) {
    const idx = pad(i);
    imageList.push(LOAD_IMAGE(`assets/game/hero/hit/hit_${idx}.png`));
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
    imageList.push(LOAD_IMAGE(`assets/game/hero/jump/jump_${idx}.png`));
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
    imageList.push(LOAD_IMAGE(`assets/game/flies/flies_0${i}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_PLAYER_DASH_SPRITE() {
  const cacheName = "player_dash";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.dash.max; i++) {
    imageList.push(LOAD_IMAGE(`assets/game/hero/dash/dash_0${i}.png`));
  }

  CACHE.set(cacheName, imageList);

  return imageList;
}

export function GET_PLAYER_ATTACK2_SPRITE() {
  const cacheName = "player_attack_2";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.attack.max; i++) {
    imageList.push(LOAD_IMAGE(`assets/game/hero/attack2/attack2_0${i}.png`));
  }

  CACHE.set(cacheName, imageList);

  return imageList;
}

export function GET_PLAYER_ATTACK1_SPRITE() {
  const cacheName = "player_attack_1";
  const cache = CACHE.get(cacheName);
  if (cache != null) {
    return cache;
  }

  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.attack.max; i++) {
    imageList.push(LOAD_IMAGE(`assets/game/hero/attack/attack_0${i}.png`));
  }

  CACHE.set(cacheName, imageList);

  return imageList;
}

export function GET_PLAYER_ATTACK_SPRITE(n) {
  switch (n) {
    case 1:
      return GET_PLAYER_ATTACK1_SPRITE();
    case 2:
      return GET_PLAYER_ATTACK2_SPRITE();
  }
}

export function GET_PLAYER_ATTACK_SPLASH_1_SPRITE() {
  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.splash1.max; i++) {
    imageList.push(LOAD_IMAGE(`assets/game/hero/splash_1/splash-1_0${i}.png`));
  }
  return imageList;
}

export function GET_PLAYER_ATTACK_SPLASH_2_SPRITE() {
  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.splash2.max; i++) {
    imageList.push(LOAD_IMAGE(`assets/game/hero/splash_2/splash-2_0${i}.png`));
  }
  return imageList;
}

export function GET_PLAYER_ATTACK_SPLASH_SPRITE(i) {
  if (i == 1) {
    return GET_PLAYER_ATTACK_SPLASH_1_SPRITE();
  } else if (i == 2) {
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
  imageList.push(LOAD_IMAGE(`assets/game/object/floor_${idx}.png`));
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
    imageList.push(LOAD_IMAGE(`assets/game/hero/idle/idle_0${i}.png`));
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
    imageList.push(LOAD_IMAGE(`assets/game/hero/walk/walk_0${i}.png`));
  }

  CACHE.set(cacheName, imageList);
  return imageList;
}

export function GET_BG_FIRST() {
  return LOAD_IMAGE("assets/game/object/background_2.png");
}

export function GET_FG_FIRST() {
  return LOAD_IMAGE("assets/game/foreground/foreground.png");
}

export function GET_BOSS_BG() {
  return LOAD_IMAGE("assets/game/object/background_1.png");
}

export function GenerateAllFirst() {
  GET_PLAYER_HITTED();
  GET_BOSS_STUN_SPRITE();
  GET_BOSS_DIE_SPRITE();
  GET_BOSS_LAND_SPRITE();
  GET_REST_SPRITE();
  GET_BOOFLY_FLY();
  GET_PLAYER_DASH_SPRITE();
  GET_PLATFORM_SPRITE();
  GET_UI_HEALTH();
  GET_BOSS_DOOR(1);
  GET_BOSS_DOOR(2);
  GET_BOSS_DOOR(3);
  GET_CRAWLID_DIE();
  GET_UI_LEFT();
  GET_UI_MONEY();
  GET_CRAWLID_WALK();
  GET_BOSS_ATTACK_PREP_SPRITE();
  GET_BOSS_ATTACK_SPRITE();
  GET_BOSS_IDLE_SPRITE();
  GET_HIT();
  GET_PLAYER_JUMP_SPRITE();
  GET_FLIES_SPRITE();
  GET_PLAYER_ATTACK_SPRITE();
  GET_PLAYER_ATTACK_SPLASH_1_SPRITE();
  GET_PLAYER_ATTACK_SPLASH_2_SPRITE();
  GET_FLOOR_SPRITE();
  GET_PLAYER_IDLE_SPRITE();
  GET_PLAYER_WALK_SPRITE();
  GET_BG_FIRST();
  GET_BOSS_BG();
}
