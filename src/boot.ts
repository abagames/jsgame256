import { U } from "./lineart";

import * as Tone from "tone";
declare const range;

const w: any = window;
let ticks = 0;
let isEmptySoundPlayed = false;
let canvasBack;
let scoreText;
let sourceText;
let isShowingScore = false;

w.setup = () => {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css?family=Roboto+Mono";
  link.rel = "stylesheet";
  document.body.appendChild(link);
  const colors = {
    background: "#ECEFF1",
    stroke: "#263238"
  };
  document.body.style.background = "#FAFAFA";
  const unselectableStyle = `
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;`;
  const canvasStyle = `
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: 72vmin; height: 72vmin;`;
  canvasBack = document.createElement("div");
  canvasBack.style = canvasStyle + unselectableStyle;
  canvasBack.style.background = colors.background;
  document.body.appendChild(canvasBack);
  const p5Canvas = createCanvas(100, 100);
  p5Canvas.canvas.style = canvasStyle;
  fill(colors.background);
  stroke(colors.stroke);
  const textStyle = `
  position: absolute; left: 50%; transform: translate(-50%, -50%);
  font-family: 'Roboto Mono', monospace; color: ${colors.stroke};`;
  scoreText = document.createElement("div");
  scoreText.style =
    "top: 90%; font-size: 200%; text-align: center;" +
    textStyle +
    unselectableStyle;
  document.body.appendChild(scoreText);
  sourceText = document.createElement("div");
  sourceText.style =
    "top: 10%; width: 512px; text-align: left; word-break: break-all;" +
    textStyle;
  sourceText.innerText = "";
  document.body.appendChild(sourceText);
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
  if (!isShowingScore && w.S !== 0) {
    isShowingScore = true;
  }
  if (isShowingScore) {
    scoreText.innerText = w.S;
  }
};
