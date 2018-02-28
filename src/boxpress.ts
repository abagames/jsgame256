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

export let v, t;

export function U() {
  clear();
  fill(1);
  t = translate;
  if (!T) {
    v = A(4).map(_ => 49);
  }
  push();
  t(v[0], v[1]);
  rotate(v[3]);
  A(2).map(i => {
    t(i ? -v[2] * 2 - 99 : v[2], 0);
    rect(0, -99, 99, 199);
  });
  pop();
  A(3).map(i => (v[i] = min(80, max(9, v[i] + R(-T / 99, T / 99)))));
  v[3] += R(-0.1, 0.1);
  S++;
  if (get(X, Y)[3] > 0 || X < 0 || Y < 0) {
    S = T = 0;
  }
}
