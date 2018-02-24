import { U } from "./lineart";

import * as Tone from "tone";
declare const range;

const w: any = window;
let ticks = 0;

w.setup = () => {
  const p5Canvas = createCanvas(100, 100);
  p5Canvas.canvas.style = `
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: 80vmin; height: 80vmin;`;
  const synth = new Tone.Synth({
    oscillator: {
      type: "square"
    }
  }).chain(new Tone.Volume(-40), Tone.Master);
  w.R = random;
  w.N = synth.triggerAttackRelease.bind(synth);
  w.A = range;
  w.S = 0;
};

w.draw = () => {
  w.M = mouseIsPressed;
  w.X = mouseX;
  w.Y = mouseY;
  U(ticks / 60);
  ticks++;
  text(w.S, 0, 10);
};
