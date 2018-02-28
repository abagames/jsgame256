import * as g from "./springcar";

function evalInContext(scr, context) {
  return new Function("with(this) { return " + scr + "}").call(context);
}

function captureCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 200;
  const context = canvas.getContext("2d");
  context.fillStyle = colors.background;
  context.fillRect(0, 0, 200, 200);
  context.scale(2, 2);
  context.drawImage(p5Canvas.canvas, 0, 0);
  return canvas.toDataURL("image/png");
}

function initRepl() {
  console.log("set REPL settings");
  const ws = new WebSocket("ws://localhost:8887");
  ws.onopen = () => {
    ws.send("REPL connecting to browser");
  };
  ws.onmessage = m => {
    const data = m.data;
    if (data === "//b") {
      ws.send(captureCanvas());
    } else if (data === "//p") {
      pause();
      ws.send("//PAUSE");
    } else if (data === "//r") {
      resume();
      ws.send("//RESUME");
    } else if (data === "//s") {
      pause();
      g.U();
      ws.send("//STEP");
    } else {
      console.log(`[REPL] ${data}`);
      let result;
      try {
        const evalResult = evalInContext(data, g);
        try {
          result = JSON.stringify(evalResult);
        } catch (e) {}
      } catch (e) {
        result = e;
      }
      console.log(result);
      ws.send(result);
    }
  };
  ws.onerror = e => {
    console.log(e);
  };
  window.addEventListener("beforeunload", () => {
    ws.close();
  });
}

initRepl();

function pause() {
  isUpdating = false;
}

function resume() {
  isUpdating = true;
}

import * as Tone from "tone";
declare const range;

const w: any = window;
let isEmptySoundPlayed = false;
let p5Canvas;
let canvasBack;
let scoreText;
let sourceText;
let isShowingScore = false;
let highScore = 0;
let highScoreText;
let isUpdating = true;
const colors = {
  background: "#ECEFF1",
  stroke: "#263238"
};

w.setup = () => {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css?family=Roboto+Mono";
  link.rel = "stylesheet";
  document.head.appendChild(link);
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
  p5Canvas = createCanvas(100, 100);
  p5Canvas.canvas.style = canvasStyle;
  fill(colors.background);
  stroke(colors.stroke);
  textSize(7);
  const textStyle = `
  position: absolute; transform: translate(-50%, -50%);
  font-family: 'Roboto Mono', monospace; color: ${colors.stroke};
  ${unselectableStyle}`;
  scoreText = document.createElement("div");
  scoreText.style = `top: 7%; left: 50%; font-size: 200%; text-align: center; ${textStyle}`;
  document.body.appendChild(scoreText);
  highScoreText = document.createElement("div");
  highScoreText.style = `top: 7%; left: 70%; text-align: center; ${textStyle}`;
  document.body.appendChild(highScoreText);
  sourceText = document.createElement("div");
  sourceText.style = `top: 93%; left: 50%; width: 512px; 
  text-align: left; word-break: break-all; ${textStyle}`;
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
  w.T = 0;
  document.addEventListener(
    "touchstart",
    e => {
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
    },
    { passive: false }
  );
  document.addEventListener(
    "touchmove",
    e => {
      e.preventDefault();
    },
    { passive: false }
  );
  document.addEventListener(
    "touchend",
    e => {
      e.preventDefault();
    },
    { passive: false }
  );
};

w.draw = () => {
  if (!isUpdating) {
    return;
  }
  w.M = mouseIsPressed;
  w.X = mouseX;
  w.Y = mouseY;
  g.U();
  w.T++;
  if (!isShowingScore && w.S !== 0) {
    isShowingScore = true;
  }
  if (isShowingScore) {
    scoreText.innerText = w.S;
    if (w.S > highScore) {
      highScore = w.S;
      highScoreText.innerText = highScore;
    }
  }
};
