# jsgame256

Write a JavaScript game in 256 letters.

## Aliases, Variables

```javascript
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
```

## Samples

Click the image to play.

<a href="https://abagames.github.io/jsgame256/springcar.html"><img src="https://raw.githubusercontent.com/abagames/jsgame256/master/docs/springcar.png" alt="springcar" align="left"></a>

<a href="https://abagames.github.io/jsgame256/snowdrop.html"><img src="https://raw.githubusercontent.com/abagames/jsgame256/master/docs/snowdrop.png" alt="snowdrop" align="left"></a>

<a href="https://abagames.github.io/jsgame256/fallingboot.html"><img src="https://raw.githubusercontent.com/abagames/jsgame256/master/docs/fallingboot.png" alt="fallingboot" align="left"></a>

<a href="https://abagames.github.io/jsgame256/lineart.html"><img src="https://raw.githubusercontent.com/abagames/jsgame256/master/docs/lineart.png" alt="lineart" align="left"></a>

<a href="https://abagames.github.io/jsgame256/inoutcar.html"><img src="https://raw.githubusercontent.com/abagames/jsgame256/master/docs/inoutcar.png" alt="inoutcar" align="left"></a>

<a href="https://abagames.github.io/jsgame256/boxpress.html"><img src="https://raw.githubusercontent.com/abagames/jsgame256/master/docs/boxpress.png" alt="boxpress" align="left"></a>

<a href="https://abagames.github.io/jsgame256/piyopoyon.html"><img src="https://raw.githubusercontent.com/abagames/jsgame256/master/docs/piyopoyon.png" alt="piyopoyon" align="left"></a>

<a href="https://abagames.github.io/jsgame256/sinebomb.html"><img src="https://raw.githubusercontent.com/abagames/jsgame256/master/docs/sinebomb.png" alt="sinebomb"></a>

## Create your own game

![REPL screenshot](https://raw.githubusercontent.com/abagames/jsgame256/master/repl_screenshot.gif)

1.  Clone this repository

```
% git clone https://github.com/abagames/jsgame256.git
```

2.  Install packages

```
% npm install
```

3.  Write a game title (e.g. 'falling') to src/\_boot.ts

```
import * as g from "./falling";
```

4.  Create a source file (e.g. src/falling.ts)

5.  Copy src/\_template.ts to the source file

6.  Launch the dev server

```
% npm start
```

7.  Open http://localhost:8080/ with a browser

8.  You can use the REPL on the dev server

```
REPL> T
311
REPL> //p
//PAUSE
REPL> rect(10, 20, 30, 40)
undefined
REPL> //r
//RESUME
```

9.  Write your code in function U()

```javascript
export let f;

export function U() {
  clear();
  if (!T) {
    f = A(30).map(i => [0, 99]);
  }
  f.map(g => {
    g[1] += 1 + T / 999;
    if (g[1] > 99) {
      g[0] = R(-9, 99);
      g[1] = R(-99, 0);
      S++;
    }
    text("🏀", g[0], g[1]);
  });
  if (get(X, 77)[3] > 0 || X < 0) {
    S = 0;
    T = -1;
  }
  text("🦑", X - 4, 80);
}
```

10. Build the html file with the '//b' command

```
REPL> //b
REPL>
[at-loader] Checking started in a separate process...

[at-loader] Ok, 0.001 sec.

Build: falling.html
clear(),T||(f=A(30).map(i=>[0,99])),f.map(g=>{g[1]+=1+T/999,g[1]>99&&(g[0]=R(-9,99),g[1]=R(-99,0),S++),text("🏀",g[0],g[1])}),(get(X,77)[3]>0||X<0)&&(S=0,T=-1),text("🦑",X-4,80)
177 / 256
```

11. If you want to publish your game, set the publishing URL (e.g. https://foo.com/bar/) to builder.js before building the html file

```javascript
const imageUrl = "https://foo.com/bar/";
```
