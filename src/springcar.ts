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
declare const N: (
  note: number | string,
  duration: number | string,
  time?: number
) => void;
// _.range()
declare const A: (start: number, end?: number, step?: number) => number[];
// You can use all p5.js functions

// variables
// score
declare let S: number;
// ticks
declare let T: number;

export let s: number[][];
export let y, v, d;

export function U() {
  clear();
  if (!T) {
    s = A(9).map(i => [i * 10]);
    y = v = 0;
  }
  d = 1 + T / 999;
  s.map(u => text("🔩", (u[0] = u[0] < 99 ? u[0] + d : -R(30)), 80));
  y += v += (M ? 0.1 : 0.2) * d;
  if (get(74, y)[3] + get(82, y)[3] > 0) {
    v = -1;
    y = 72;
    S++;
    N(333, 0.1);
  }
  if (y > 70 && v < 1 && M) {
    v = -3;
    N(444, 0.2);
  }
  if (y > 95) {
    S = y = T = 0;
    N(222, 0.5);
  }
  text("🚗", 75, y);
}
