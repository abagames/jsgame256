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

* [lineart](https://abagames.github.io/jsgame256/lineart.html) ([source](https://github.com/abagames/jsgame256/blob/master/src/lineart.ts))

```javascript
if(!T)for(j=x=0,l=[p=[]],v=[];T<4;v[T++]=R(1,3))p[T]=R(99);for(clear(),l.map(p=>line(...p)),p=[i=0];i<4;v[i++]*=n<0||n>99?(N(n+200,.01),-1):1)p[i]=n=l[j%5][i]+v[i]*T/999;l[++j%5]=p,rect(x=get(x,50)[3]?(N(99,1),S=0,T=-1):M&&++x>98?(N(500,.1),!++S):x,49,3,3)
```

* [inoutcar](https://abagames.github.io/jsgame256/inoutcar.html) ([source](https://github.com/abagames/jsgame256/blob/master/src/inoutcar.ts))

```javascript
clear(),T||(b=A(5).map(()=>[0,d=r=1]));for(c of b)c[0]<=0&&(c[1]=R(c[0]=99),c[2]=R(.5,1+T/999),S++,N(400,.01)),text("🐢",c[0]-=c[2],c[1]);r=max(10,min(40,r+(M?1:-1))),get(x=sin(d+=.05)*r+39,y=cos(d)*r+49)[3]&&(S=0,T=-1,N(300,.1)),text("🚗",x-4,y+2)
```

* [springcar](https://abagames.github.io/jsgame256/springcar.html) ([source](https://github.com/abagames/jsgame256/blob/master/src/springcar.ts))
* [sinebomb](https://abagames.github.io/jsgame256/sinebomb.html) ([source](https://github.com/abagames/jsgame256/blob/master/src/sinebomb.ts))
