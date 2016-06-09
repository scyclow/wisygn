export default function random(i, j) {
  if (!isNaN(j)) {
    return i + random(j - i);
  } else {
    return Math.floor(Math.random() * i);
  }
}
