declare const M: boolean;
declare const Y: (note: number | string, duration: number | string) => void;
declare const R: (startOrEnd: number, end?: number, step?: number) => number[];
declare let S: number;

let l: number[][];
let v: number[];
let r, j, x, p, i, n;

export function U(t) {
  r = random;
  if (!t)
    for (j = x = 0, l = [(p = [])], v = []; t < 4; v[t++] = r(1, 3))
      p[t] = r(99);
  clear();
  l.map(p => (<any>line)(...p));
  for (
    p = [(i = 0)];
    i < 4;
    v[i++] *= n < 0 || n > 99 ? (Y(n + 200, 0.01), -1) : 1
  )
    p[i] = n = l[j % 5][i] + v[i];
  l[++j % 5] = p;
  rect(
    (x = get(x, 50)[3]
      ? (Y(99, 1), (S = 0))
      : M && ++x > 98 ? (Y(500, 0.1), !++S) : x),
    49,
    3,
    3
  );
}
