export function betweenLinear(n, max, min) {
  return min + ((max - min) * n);
}

export function portion(max, center) {
  return (max - center) / (max+1);
}

export function times(t, fn) {
  for (let i = 0; i < t; i++) fn(i);
}

export function between(n, max, min) {
  return Math.max(
    Math.min(n, max), min
  );
}
