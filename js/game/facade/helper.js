import { GAME } from "../data.js";

export function checkCollide(x, y, w, h, x1, y1) {
  console.log(x1 > x, x1 < x + w, y1 > y, y1 < y + h);
  if (x1 > x && x1 < x + w && y1 > y && y1 < y + h) {
    return true;
  } else {
    return false;
  }
}

export function checkBlockCollide(x1, y1, w1, h1, x2, y2, w2, h2) {
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
