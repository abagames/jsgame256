import { U } from "./lineart";

import * as Tone from "tone";
declare const range;

const w: any = window;
let ticks = 0;
let isEmptySoundPlayed = false;

w.setup = () => {
  const p5Canvas = createCanvas(100, 100);
  p5Canvas.canvas.style = `
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: 80vmin; height: 80vmin;`;
  const synth = new Tone.PolySynth(4, Tone.Synth, {
    oscillator: {
      type: "square",
      partials: [0, 2, 3, 4]
    }
  }).chain(new Tone.Volume(-16), Tone.Master);
  w.R = random;
  w.N = synth.triggerAttackRelease.bind(synth);
  w.A = range;
  w.S = 0;
  document.addEventListener("touchstart", e => {
    e.preventDefault();
    if (isEmptySoundPlayed) {
      return;
    }
    const context = Tone.context;
    const buffer = context.createBuffer(1, 1, context.sampleRate);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
    if (context.resume) {
      context.resume();
    }
    isEmptySoundPlayed = true;
  });
};

w.draw = () => {
  w.M = mouseIsPressed;
  w.X = mouseX;
  w.Y = mouseY;
  U(ticks / 60);
  ticks++;
  text(w.S, 0, 10);
};
