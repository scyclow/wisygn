import { between } from './misc';

function defaultSetup({ gain, biquad, source }) {
  gain.gain.value = 0.01;

  // ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass']
  biquad.type = 'peaking';
  biquad.frequency.value = 300; // between 250 and 1000
  biquad.gain.value = 45; // between 10 and 45 or 250

  source.type = 'sawtooth';
  source.detune.value = 100;
  source.frequency.value = 25; // between 15 and 30
}

class Noise {
  constructor(setup = defaultSetup) {
    const ctx = this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    const nodes = this.nodes = {
      gain: ctx.createGain(),
      biquad: ctx.createBiquadFilter(),
      source: ctx.createOscillator()
    };

    nodes.source.connect(nodes.biquad);
    nodes.biquad.connect(nodes.gain);
    nodes.gain.connect(ctx.destination);

    setup(nodes);
  }

  get freq() {
    return this.nodes.source.frequency.value;
  }

  set freq(val) {
    return this.nodes.source.frequency.value = val;
  }

  get volume() {
    return this.nodes.gain.gain.value;
  }

  set volume(val) {
    return this.nodes.gain.gain.value = between(val, 0.05, 0);
  }

  get type() {
    return this.nodes.source.type;
  }

  set type(type) {
    return this.nodes.source.type = type;
  }

  start() {
    this.nodes.source.start(0);
  }

  kill() {
    this.nodes.source.stop();
  }

  upNote(step = 8) {
    return this.freq += this.freq / step;
  }

  downNote(step = 8) {
    return this.freq -= (this.freq * 0.5) / step;
  }
}

export default Noise;
