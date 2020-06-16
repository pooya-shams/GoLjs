const BLACK = "#000000";
const RED = "#FF0000";

const defaultColor = BLACK;
const defaultPosX = 0;
const defaultPosY = 0;

function drawLine(ctx, color, x1, y1, x2, y2) {
  ctx.fillStyle = color;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.moveTo(defaultPosX, defaultPosY);
  return true;
}

function main() {
  const ctx = document.getElementById("main-board").getContext("2d");
}
main();
