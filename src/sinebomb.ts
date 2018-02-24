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
let x, y, z, w;

export function U(t) {
  clear();
  if (!t) {
    x = y = 0;
    b = A(3).map(() => [0, 0]);
  }
  if (y < 0 && M) {
    y = 95;
    x = X;
  }
  rect(x, (y -= 5), 3, 5);
  b.map(c => {
    if (c[0] <= 0) {
      A(6).map(i => (c[i] = R([1, 1, 33, 99, 0.2, 2][i])));
    }
    rect((z = c[3] + sin((c[1] += c[4])) * c[2]), (w = c[0] += c[5]), 9, 3);
    if (abs(z - x) + abs(w - y) < 19) {
      c[0] = y = 0;
      S++;
      N(222 + z, 0.1);
    }
    if (w > 99) {
      S = c[0] = 0;
    }
  });
}
