import { onResize, setHeight } from './utils/resizeWindow';
import createNoise from './utils/createNoise';
import { onMouseMove, distance } from './utils/onMouseMove';
import random from './utils/random';
import { dynamicInterval } from './utils/dynamicInterval';
const btwnLinear = (max, min, n) => min + ((max - min) * n); //todo, make utility
import colors from './utils/colors';
const { setHsvOnHex, applyToHex } = colors; // ytf do i need to do this?

const canvas = document.getElementById('canvas');

let { innerWidth, innerHeight } = window;

let centerX = innerWidth / 2;
let centerY = innerHeight / 2;

const baseSize = 1200 * 800;
const baseMinLines = 250;
const baseMaxLines = 1500;
let minLines = baseMinLines;
let maxLines = baseMaxLines;

let centerDist = 1;
let maxDist = Math.round(distance(
  [centerX, centerY],
  [innerWidth, innerHeight]
));

let distancePortion = (maxDist - centerDist) / (maxDist+1);

const baseColor = applyToHex('#ff0000', {v: -0.2});
let currentColor = baseColor;
setInterval(() =>
  currentColor = applyToHex(currentColor, {h: 1})
, 100)

onResize(
  setHeight(canvas),
  (w, h) => ([innerWidth, innerHeight] = [w, h]),
  (w, h) => ([centerX, centerY] = [w / 2, h / 2]),
  (w, h) => maxDist = Math.round(distance(
    [centerX, centerY],
    [w, h]
  )),
  (w, h) => {
    const totalSize = w * h;
    const adjustment = totalSize / baseSize;

    maxLines = baseMaxLines * adjustment;
    minLines = baseMinLines * adjustment;
  }
);

let cursorVisable;
onMouseMove(
  (x, y) => {
    centerDist = Math.round(
      distance([centerX, centerY], [x, y])
    ) + 1;
    distancePortion = (maxDist - centerDist) / (maxDist+1);
  },
  () => {
    const hueChange = 10;
    // const h = random(-hueChange, hueChange);
    const s = btwnLinear(1, 0.2, distancePortion);
    currentColor = setHsvOnHex(currentColor, { s });
  },
  // hide mouse if it's not moving
  () => {
    if (cursorVisable) clearTimeout(cursorVisable);
    document.body.style.cursor = '';
    cursorVisable = setTimeout(() => {
      document.body.style.cursor = 'none';
    }, 100);
  }
);

function drawLines(ctx) {
  const numOfLines = btwnLinear(maxLines, minLines, distancePortion);

  for (let i = 0; i <= numOfLines; i++) {
    ctx.bezierCurveTo(
      random(innerWidth),
      random(innerHeight),
      random(innerWidth),
      random(innerHeight),
      random(innerWidth),
      random(innerHeight)
    );
  }
}

function frame(ctx) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = currentColor;

  ctx.beginPath();
  ctx.moveTo(random(innerWidth), random(innerHeight));

  drawLines(ctx);

  ctx.stroke();
}

function withFrame(fn) {
  const fastFR = 10;
  const slowFR = 20;
  setInterval(fn, 1000/60)

  // let currentFR = slowFR;
  // const changeFR = dynamicInterval(fn, currentFR);

  // setInterval(() => {
  //   currentFR = currentFR === slowFR ? fastFR : slowFR;
  //   changeFR(currentFR);
  // }, 300)
}

function draw(ctx) {
  withFrame(() => {
    // clear the frame
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // set the frame
    frame(ctx);
  });

  // createNoise();
}

function withCanvas(can, fn) {
  if (can.getContext) {
    let ctx = can.getContext('2d');
    fn(ctx);
  }
}

withCanvas(canvas, draw);
console.log('Source: https://github.com/scyclow'); // eslint-disable-line
