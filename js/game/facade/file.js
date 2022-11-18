export const PLAYER_CONF = {
  maxSprite: 8,
};

function LOAD_IMAGE(str) {
  const image = new Image();
  image.src = str;
  return image;
}

export function GET_FLOOR_SPRITE() {
  const imageList = [];
  imageList.push(LOAD_IMAGE("/assets/game/object/floor_1.png"));
  return imageList;
}

export function GET_BG_FIRST() {
  return LOAD_IMAGE("/assets/game/object/background_3.png");
}

export function GET_PLAYER_SPRITE() {
  const imageList = [];
  for (let i = 1; i <= PLAYER_CONF.maxSprite; i++) {
    imageList.push(LOAD_IMAGE(`/assets/game/hero/walk/walk_0${i}.png`));
  }
  return imageList;
}
