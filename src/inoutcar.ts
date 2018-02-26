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

let b: number[][];
let d, x, y, r;

export function U() {
  clear();
  if (!T) {
    b = A(5).map(() => [0, (d = r = 1)]);
  }
  for (const c of b) {
    if (c[0] <= 0) {
      c[1] = R((c[0] = 99));
      c[2] = R(0.5, 1 + T / 999);
      S++;
      N(400, 0.01);
    }
    text("🐢", (c[0] -= c[2]), c[1]);
  }
  r = max(10, min(40, r + (M ? 1 : -1)));
  if (get((x = sin((d += 0.05)) * r + 39), (y = cos(d) * r + 49))[3]) {
    S = 0;
    T = -1;
    N(300, 0.1);
  }
  text("🚗", x - 4, y + 2);
}
