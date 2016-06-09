function createNoise() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // set up the different audio nodes we will use for the app
  const gainNode = audioCtx.createGain();
  const biquadFilter = audioCtx.createBiquadFilter();
  const source = audioCtx.createOscillator();

  source.connect(biquadFilter);
  biquadFilter.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.value = 0.0025;

  biquadFilter.type = 'peaking';
  biquadFilter.frequency.value = 250; // between 250 and 1000
  biquadFilter.gain.value = 35; // between 10 and 45 or 250

  source.type = 'square';
  source.detune.value = 100;
  source.frequency.value = 25; // between 15 and 30
  source.start(0);

  let i = 0;
  let direction = 10;

  return setInterval(() => {
    biquadFilter.frequency.value += direction;
    if (
      biquadFilter.frequency.value >= 1000 ||
      biquadFilter.frequency.value <= 250
    ) direction *= -1;

    biquadFilter.frequency.value += direction;
    i++;
  }, 100);
}

export default createNoise;
