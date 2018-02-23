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

let l: number[][];
let v: number[];
let j, x, p, i, n;

export function U(t) {
  if (!t)
    for (j = x = 0, l = [(p = [])], v = []; t < 4; v[t++] = R(1, 3))
      p[t] = R(99);
  clear();
  l.map(p => (<any>line)(...p));
  for (
    p = [(i = 0)];
    i < 4;
    v[i++] *= n < 0 || n > 99 ? (N(n + 200, 0.01), -1) : 1
  )
    p[i] = n = l[j % 5][i] + v[i];
  l[++j % 5] = p;
  rect(
    (x = get(x, 50)[3]
      ? (N(99, 1), (S = 0))
      : M && ++x > 98 ? (N(500, 0.1), !++S) : x),
    49,
    3,
    3
  );
}
