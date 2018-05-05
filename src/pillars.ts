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
  isCapturingGif: true,
  gccOptions: {
    scale: 2
  }
};

export function U() {
  clear();
  A(100).map(i => {
    const w = i % 10;
    const q = floor(i / 10);
    const x = w * 14 + (q % 2) * 7;
    const a = T / 180 * TWO_PI + i;
    const y = q * 10 - sin(a) * cos(a) * 39;
    push();
    translate(x, y);
    fill(222, cos(a) * 99 + 99, sin(a) * 99 + 99);
    rect(-7, 0, 13.3, 99);
    rotate(PI / 4);
    fill(222);
    rect(-5, -5, 10, 10);
    pop();
  });
}
