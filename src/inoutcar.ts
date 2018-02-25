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

// score
declare let S: number;

let b: number[][];
let d;

export function U(t) {
  clear();
  if (!t) {
    b = A(5).map(() => [0, (d = 1)]);
  }
  for (const c of b) {
    if (c[0] <= 0) {
      c[1] = R((c[0] = 99));
      c[2] = R(0.5, 2);
      S++;
      N(c[1] + 200, 0.01);
    }
    text("🐢", (c[0] -= c[2]), c[1]);
  }
  const r = M ? 40 : 10;
  const x = sin((d += M ? 0.05 : 0.1)) * r + 49;
  const y = cos(d) * r + 49;
  if (get(x, y)[3] > 0) {
    N(500, 0.2);
    b = A(5).map(() => [(S = 0), 0]);
  }
  text("🚗", x - 4, y + 2);
}
