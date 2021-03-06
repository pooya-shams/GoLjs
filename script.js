"use strict";

const BLACK = "#000000";
const RED = "#FF0000";
const WHITE = "#FFFFFF";
const WINW = 600;
const WINH = 600;
const numberOfCellsX = 20;
const numberOfCellsY = 20;
const cellW = WINW / numberOfCellsX;
const cellH = WINH / numberOfCellsY;

function make_board(x = numberOfCellsX, y = numberOfCellsY) {
  return Array(y)
    .fill()
    .map(() => Array(x).fill(false));
}

function getCursorPos(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return [x, y];
}

function onClick(canvas, event) {
  const pos = getCursorPos(canvas, event);
  const x = pos[0];
  const y = pos[1];
  findAndToggleCell(x, y);
}

const defaultColor = BLACK;
const BGCOLOR = WHITE;
const defaultPosX = 0;
const defaultPosY = 0;
const lineColor = BLACK;
const filledCellColor = BLACK;
const canvas = document.getElementById("main-board");
const ctx = canvas.getContext("2d");

canvas.addEventListener("mousedown", function (e) {
  onClick(canvas, e);
});

var intervalID;
let running = false;
let speed = 300;
const deltaSpeed = 100;
const maxSpeed = 1000;
const minSpeed = 100;

let board = make_board();

function drawLine(
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

function emptyBoard() {
  ctx.clearRect(0, 0, WINW, WINH);
}

function drawEmptyBoard() {
  // drawing vertical lines
  for (let x = cellW; x < WINW; x += cellW) {
    drawLine(lineColor, x, 0, x, WINH);
  }
  // drawing horizontal lines
  for (let y = cellH; y < WINH; y += cellH) {
    drawLine(lineColor, 0, y, WINW, y);
  }
  // the last two lines are slightly paler than other lines
  // but if i draw another line after them, they will be colored
  // to what they should have been at the first place.
  // I don't know why this happens and for know I don't care
  // however if anyone knows how to stop it please tell me.
}

function drawRect(color = defaultColor, x = 0, y = 0, w = 0, h = 0) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = defaultColor;
}

function fillCell(x, y) {
  const x0 = x * cellW;
  const y0 = y * cellH;
  drawRect(filledCellColor, x0, y0, cellW, cellH);
}

function toggleCell(x, y) {
  // just normallly toggling a cell
  board[y][x] = !board[y][x];
}

function findAndToggleCell(x, y) {
  // getting actual x, y (clicked point),
  // finding the clicked cell and toggling it
  const Xidx = Math.floor(x / cellW);
  const Yidx = Math.floor(y / cellH);
  toggleCell(Xidx, Yidx);
  drawBoard();
}

function fillBoard() {
  for (let x = 0; x < numberOfCellsX; x++)
    for (let y = 0; y < numberOfCellsY; y++) {
      if (board[y][x]) {
        fillCell(x, y);
      }
    }
}

function drawBoard() {
  emptyBoard();
  drawEmptyBoard();
  fillBoard();
}

function getState(curState, n) {
  if (curState && (n == 2 || n == 3)) return true;
  if (!curState && n == 3) return true;
  return false;
}

function updateBoard() {
  let newBoard = make_board();
  for (let x = 0; x < numberOfCellsX; x++)
    for (let y = 0; y < numberOfCellsY; y++) {
      let n = -board[y][x]; // number of on neighbours
      for (let i = -1; i <= 1; i++)
        for (let j = -1; j <= 1; j++) {
          const a = x + i;
          const b = y + j;
          if (a >= 0 && a < numberOfCellsX && b >= 0 && b < numberOfCellsY)
            n += board[b][a];
        }
      newBoard[y][x] = getState(board[y][x], n);
    }
  for (let x = 0; x < numberOfCellsX; x++)
    for (let y = 0; y < numberOfCellsY; y++) board[y][x] = newBoard[y][x];
}

function mainloop() {
  drawBoard();
  updateBoard();
}

function main() {
  intervalID = setInterval(mainloop, speed);
}

function pause() {
  if (running) {
    window.clearInterval(intervalID);
    running = false;
  }
}

function play() {
  if (!running) {
    main();
    running = true;
  }
}

function reset() {
  pause();
  play();
}

function speedUp() {
  speed = speed > minSpeed ? speed - deltaSpeed : speed;
  reset();
}
function speedDown() {
  speed = speed < maxSpeed ? speed + deltaSpeed : speed;
  reset();
}

drawBoard();
