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

export let m: number[];
export let x, b, c, p, q;

export function U() {
  clear();
  if (!T) {
    x = X;
    m = A((p = 9)).map(_ => R((c = q = 99)));
  }
  c += 1 + T / q;
  textSize(9 + T / q);
  if (c > q) {
    c = 0;
    b = R(-9, q);
    S += p;
    N(200 + p * 9, 0.1);
  }
  text("👢", b, c);
  textSize((p = 9));
  m.map((n, i) => {
    const o = n + X - x;
    if (get(o + 2, 85)[3] > 0 || o < 0) {
      m[i] = 999;
      p--;
    }
    text("🕺", o, 90);
  });
  if (p < 1) {
    S = 0;
    T = -1;
    N(180, 0.5);
  }
}
