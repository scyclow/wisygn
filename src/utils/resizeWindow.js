let resizeFns = [];

window.onresize = () => {
  let { innerWidth, innerHeight } = window;
  resizeFns.forEach(fn => fn(innerWidth, innerHeight));
};

export function onResize(...fns) {
  let { innerWidth, innerHeight } = window;
  fns.forEach(fn => fn(innerWidth, innerHeight));

  resizeFns = resizeFns.concat(fns);
  return resizeFns;
}

export function setHeight(canvas) {
  return (width, height) => {
    canvas.width = width;
    canvas.height = height;
  };
}
