const BLACK = "#000000";
const RED = "#FF0000";
const WINW = 600;
const WINH = 600;
const numberOfCellsX = 20;
const numberOfCellsY = 20;
const cellW = WINW / numberOfCellsX;
const cellH = WINH / numberOfCellsY;

const defaultColor = BLACK;
const defaultPosX = 0;
const defaultPosY = 0;
const lineColor = BLACK;
const filledCellColor = BLACK;

function drawLine(
  ctx,
  color = defaultColor,
  x1 = 0,
  y1 = 0,
  x2 = 0,
  y2 = 0,
  width = 1
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.strokeStyle = defaultColor;
  ctx.lineWidth = 1;
  ctx.moveTo(defaultPosX, defaultPosY);
  return true;
}

function drawBoard(ctx) {
  if (WINW % numberOfCellsX != 0 || WINH % numberOfCellsY) {
    throw "cells should fit in the width and height";
  }
  // drawing vertical lines
  for (let x = cellW; x < WINW; x += cellW) {
    drawLine(ctx, lineColor, x, 0, x, WINH);
  }
  // drawing horizontal lines
  for (let y = cellH; y < WINH; y += cellH) {
    drawLine(ctx, lineColor, 0, y, WINW, y);
  }
  // the last two lines are slightly paler than other lines
  // but if i draw another line after them, they will be colored
  // to what they should have been at the first place.
  // I don't know why this happens and for know I don't care
  // however if anyone knows how to stop it please tell me.
}

function drawRect(ctx, color = defaultColor, x = 0, y = 0, w = 0, h = 0) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = defaultColor;
}

function fillCell(ctx, x, y) {
  const x0 = x * cellW;
  const y0 = y * cellH;
  drawRect(ctx, filledCellColor, x0, y0, cellW, cellH);
}

function main() {
  const ctx = document.getElementById("main-board").getContext("2d");
  drawBoard(ctx);
}
main();
