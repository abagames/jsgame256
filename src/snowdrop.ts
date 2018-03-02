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

export let r: number[][];
export let v, q;

export function U() {
  clear();
  q = 99;
  if (!T) {
    r = A(q).map(_ => [(S = 0), q]);
  }
  if (!(T % q)) {
    v = R(-1, 1);
  }
  rect(X - 4, Y - 15, 9, 5);
  r.map(s => {
    if (s[1] > q) {
      s[0] = R(0, q);
      s[1] = R(-q, 0);
      s[2] = R(-1, 1);
    }
    if (abs(s[0] - X) + abs(s[1] - Y + 12) < 9) {
      S++;
      s[1] = q;
    }
    rect((s[0] += s[2] += v * 0.05), (s[1] += 0.5 + T / 999), 1, 1);
  });
  if (get(X, Y)[3] > 0 || X < 0 || Y < 0) {
    T = -1;
  }
}
