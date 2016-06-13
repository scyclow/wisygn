import { onResize, setHeight } from './resizeWindow';

function withFrameRate(fps, fn) {
  setInterval(fn, 1000 / fps);
}

function withCanvas(canv, fn) {
  if (canv.getContext) {
    const ctx = canv.getContext('2d');
    fn(ctx);
  }
}

export default function canvasRunner(canvas, init, frame, frameRate = 60) {
  let { innerWidth, innerHeight } = window;

  if (!frame) {
    frame = init;
    init = () => {};
  }

  onResize(
    setHeight(canvas),
    (w, h) => [innerWidth, innerHeight] = [w, h]
  );

  function draw(ctx) {
    init(ctx);
    withFrameRate(frameRate, () => {
      // clear the frame
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      // set the frame
      frame(ctx);
    });
  }

  withCanvas(canvas, draw);
}
