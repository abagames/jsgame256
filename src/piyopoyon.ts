// aliases
// p5.mouseIsPressed
declare const M: boolean;
// p5.mouseX
declare const X: number;
// p5.mouseY
declare const Y: number;
// p5.random()
declare const R: (min: number | any[], max?: number) => any;
// Tone.synth.triggerAttackRelease()
declare const N: (note: number | string, duration: number | string) => void;
// _.range()
declare const A: (start: number, end?: number, step?: number) => number[];
// You can use all p5.js functions

// variables
// score
declare let S: number;
// ticks
declare let T: number;

export let y, v, a, b, q;

export function U() {
  clear();
  if (!T) {
    y = v = 0;
    q = a = b = 99;
  }
  fill(1);
  if ((a += 1 + T / 999) > q) {
    a = -R(9);
    b = R(60);
    S++;
    N(550, 0.2);
  }
  rect(a, b - q, 5, 85);
  rect(a, b + 15, 5, q);
  fill(q);
  rect(0, max(10, min(90, Y)), q, q);
  if (get(84, (y += v += 0.2))[0] == q) {
    v = -4;
  }
  if (y < 0) {
    v = 4;
  }
  if (get(84, y - 3)[0] == 1) {
    S = T = 0;
    N(220, 1);
  }
  text("🐤", 80, y);
}
