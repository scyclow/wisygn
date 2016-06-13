import canvasRunner from './utils/canvasRunner';
import Noise from './utils/Noise';
import { onResize } from './utils/resizeWindow';
import { onMouseMove, distance, hideMouse } from './utils/onMouseMove';
import random from './utils/random';
// import { dynamicInterval } from './utils/dynamicInterval';
import { betweenLinear, portion, times } from './utils/misc';
import colors from './utils/colors';
const { setHsvOnHex, applyToHex } = colors; // ytf do i need to do this?


const canvas = document.getElementById('canvas');
const BASE_SIZE = 1200 * 800;
const BASE_MIN_LINES = 250;
const BASE_MAX_LINES = 1500;
const BASE_COLOR = applyToHex('#FF0000', {v: -0.2});
const COLOR_SPEED = 150;


let { innerWidth, innerHeight } = window;

const $ = {
  innerWidth,
  innerHeight,
  centerX: innerWidth / 2,
  centerY: innerHeight / 2,
  minLines: BASE_MIN_LINES,
  maxLines: BASE_MAX_LINES,
  centerDist: 1,
  currentColor: BASE_COLOR,

  noise: new Noise(),
  noise2: new Noise(),
};
const distFromCenter = (w, h) => distance(
  [$.centerX, $.centerY], [w, h], true
);
$.maxDist = distFromCenter($.innerWidth, $.innerHeight);
$.distancePortion = portion($.maxDist, $.centerDist);

function setColor() {
  $.currentColor = applyToHex($.currentColor, {h: 1});
}
setInterval(setColor, COLOR_SPEED);

window.$ = $;

onResize(
  (w, h) => ([$.innerWidth, $.innerHeight] = [w, h]),
  (w, h) => ([$.centerX, $.centerY] = [w / 2, h / 2]),
  (w, h) => $.maxDist = distFromCenter(w, h),
  (w, h) => {
    const totalSize = w * h;
    const adjustment = totalSize / BASE_SIZE;

    $.maxLines = BASE_MAX_LINES * adjustment;
    $.minLines = BASE_MIN_LINES * adjustment;
  }
);

onMouseMove(
  hideMouse,

  (x, y) => {
    $.centerDist = distFromCenter(x, y) + 1;
    $.distancePortion = portion($.maxDist, $.centerDist);
  },

  () => {
    const s = betweenLinear($.distancePortion, 1, 0.2);
    $.currentColor = setHsvOnHex($.currentColor, { s });
  }
);

function drawLines(ctx) {
  const numOfLines = betweenLinear(
    $.distancePortion, $.maxLines, $.minLines
  );

  // ctx.strokeStyle = random(0,2) ? $.currentColor : applyToHex($.currentColor, {h: 10})

  const drawLine = () => {
    ctx.bezierCurveTo(
      random($.innerWidth),
      random($.innerHeight),
      random($.innerWidth),
      random($.innerHeight),
      random($.innerWidth),
      random($.innerHeight)
    );
  };

  times(numOfLines, drawLine);
}

function init(ctx) {
  ctx.lineWidth = 1;
  $.noise.start();
  $.noise2.start().upNote(1000);
  $.noise.nodes.source.type = 'square';
  $.noise2.nodes.source.type = 'square';
}

function frame(ctx) {
  ctx.strokeStyle = $.currentColor;

  ctx.beginPath();
  ctx.moveTo(random($.innerWidth), random($.innerHeight));

  drawLines(ctx);

  ctx.stroke();
}

canvasRunner(
  canvas,
  init,
  frame,
  60
);

console.log('Source: https://github.com/scyclow'); // eslint-disable-line
