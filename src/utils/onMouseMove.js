let mouseMoveFns = [];

document.onmousemove = (e) => {
  const x = e.clientX + window.pageXOffset;
  const y = e.clientY + window.pageYOffset;
  mouseMoveFns.forEach(fn => fn(x, y));
};

export function onMouseMove(...fns) {
  return mouseMoveFns = mouseMoveFns.concat(fns);
}

export function distance([x1, y1], [x2, y2]) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
