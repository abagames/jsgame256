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

export let options = {
  isCapturingGif: true
};

let e;

export function U() {
  clear();
  if (!T) {
    e = A(9).map(i => [R(99), R(9)]);
    fill(9);
  }
  let l = T * TWO_PI / 180;
  e.map(f => {
    let w = sin(l + f[1]) * 79;
    let z = f[0] - 50;
    let a = atan2(w, z);
    let d = sqrt(w * w + z * z);
    let g = a - l / 6;
    A(12).map(i => {
      ellipse(cos(a) * d + 50, sin(a) * d + 50, 9);
      a += i % 2 == 0 ? PI / 3 - g * 2 : g * 2;
    });
  });
}
