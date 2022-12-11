import { GAME } from "../game.js";

export function checkCollide(x, y, w, h, x1, y1) {
  if (x1 > x && x1 < x + w && y1 > y && y1 < y + h) {
    return true;
  } else {
    return false;
  }
}

export function isInTheLeft(obj, obj2) {
  const x1 = obj.x + obj.w / 2;
  const x2 = obj2.x + obj2.w / 2;
  if (x1 < x2) {
    return true;
  } else {
    return false;
  }
}
export function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

export function getRandomFromArray(arr) {
  const len = arr.length;
  const idx = Math.floor(Math.random() * len);
  return arr[idx];
}

export function checkBlockCollide(x1, y1, w1, h1, x2, y2, w2, h2) {
  // !Debugging Purpose
  // console.log(x2 + w2 >= x1, x2 <= x1 + w1, y2 + h2 >= y1, y2 <= y1 + h1);

  if (x2 + w2 >= x1 && x2 <= x1 + w1 && y2 + h2 >= y1 && y2 <= y1 + h1) {
    return true;
  } else {
    return false;
  }
}

export function randomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function pad(d) {
  return d < 10 ? "0" + d.toString() : d.toString();
}
