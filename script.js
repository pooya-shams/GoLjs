const BLACK = "#000000";
const RED = "#FF0000";
const WINW = 600;
const WINH = 600;
const numberOfCellsX = 20;
const numberOfCellsY = 20;

const defaultColor = BLACK;
const defaultPosX = 0;
const defaultPosY = 0;
const lineColor = RED;

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

function drawBoard(ctx, width, height, numberOfCellsX, numberOfCellsY) {
  if (width % numberOfCellsX != 0 || height % numberOfCellsY) {
    throw "cells should fit in the width and height";
  }
  cellW = width / numberOfCellsX;
  cellH = height / numberOfCellsY;
  for (let x = cellW; x < width; x += cellW) {
    drawLine(ctx, lineColor, x, 0, x, height);
  }
  for (let y = cellH; y < height; y += cellH) {
    drawLine(ctx, lineColor, 0, y, width, y);
  }
}

function main() {
  const ctx = document.getElementById("main-board").getContext("2d");
  drawBoard(ctx, WINW, WINH, numberOfCellsX, numberOfCellsY);
}
main();
