export function dynamicInterval(fn, startTime) {
  const set = (time) => setInterval(fn, time);

  let interval = set(startTime);

  return (time) => {
    clearInterval(interval);
    return interval = set(time);
  };
}
