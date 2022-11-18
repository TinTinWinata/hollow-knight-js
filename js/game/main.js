export const canvas = document.getElementById("myCanvas");
export const ctx = canvas.getContext("2d");

function render() {
  requestAnimationFrame(render);
}
