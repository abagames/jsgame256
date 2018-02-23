declare const M: boolean;
declare const Y: (note: number | string, duration: number | string) => void;
declare const R: (startOrEnd: number, end?: number, step?: number) => number[];
declare let S: number;

let l: number[][];
let v: number[];
let x: number;
let f: number[];

export function U(t) {
  if (!t) {
    f = R(4);
    l = [f.map(_ => random(99))];
    v = f.map(_ => random(1, 3));
    x = 0;
  }
  clear();
  l.map(p => (<any>line)(...p));
  l.unshift(
    f.map(i => {
      const n = l[0][i] + v[i];
      if (n < 0 || n > 99) {
        v[i] *= -1;
        Y(n + 200, 0.01);
      }
      return n;
    })
  );
  l.splice(5);
  if (M && ++x > 98) {
    S++;
    x = 0;
    Y(500, 0.1);
  }
  if (get(x, 50)[3] > 0) {
    x = S = 0;
    Y(99, 1);
  }
  rect(x, 49, 3, 3);
}
