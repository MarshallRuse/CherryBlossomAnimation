// height="740"
//   width="360"
const CherryBlossom = document.getElementById("CherryBlossom");

const w = window.innerWidth, h = window.innerHeight;

CherryBlossom.setAttribute("height", `${h}px`);
CherryBlossom.setAttribute("width", `${w}px`);


const snowflakes = 100,
    original = document.getElementById("snowSmall1"),
    original2 = document.getElementById("snowSmall2"),
    original3 = document.getElementById("snowSmall3"),
    larr = [],
    larr2 = [],
    larr3 = [],
    container = document.getElementById("snow"),
    sizes = ["Small", "Medium", "Large"];

//Hide two flakes
TweenMax.set(document.getElementById("snowSmall1"), {y: -h, x: w});
TweenMax.set(document.getElementById("snowSmall2"), {y: -h, x: w});
TweenMax.set(document.getElementById("snowSmall3"), {y: -h, x: w});

//Animate falling
function snowing(element) {
    TweenMax.to(element, R(1, 3), {opacity: 1, ease: Power1.easeIn});
    TweenMax.to(element, R(5,16), {y: h+140, x: R(40, w), ease: Linear.easeNone, repeat:-1, delay: -14});
    TweenMax.to(element, R(8,16), {x: `-=${2*w}`, repeat: -1, ease: Sine.easeInOut});
    TweenMax.to(element, R(4,10), {rotation: R(0,160), repeat: -1, yoyo: true, ease:Sine.easeInOut, delay: -5});
};  

//   //Create rounded snowflakes
//   for (var i = 0; i < snowflakes; i++) {
// 		var snowflakeDiv = document.createElement('div');
// 		var sizeIndex = Math.ceil(Math.random() * 3) -1; 
// 		var size = sizes[sizeIndex];
// 		TweenMax.set(snowflakeDiv, {attr: {class: "round" + size}, x: R(0,w), y: R(-50, -50) }); 
// 		container.appendChild(snowflakeDiv);
// 		snowing(snowflakeDiv);
// }

//Clone 2 different inline svg snowflakes
//Push the clones to arrays
for (let i = 0; i < Math.ceil(snowflakes/2); i++) { 
    const clone = original.cloneNode(true); // "deep" clone
    const clone2 = original2.cloneNode(true); // "deep" clone
    const clone3 = original3.cloneNode(true);
    clone.id = "snowSmall1_" + i;
    clone2.id = "snowSmall2_" + i;
    clone3.id = "snowSmall3_" + i;
    original.parentNode.appendChild(clone);
    larr.push(clone);
    original2.parentNode.appendChild(clone2);
    larr2.push(clone2);
    original3.parentNode.appendChild(clone3);
    larr3.push(clone3);
}

//Animate inline svg snowflakes with "snowing" function
for (let i = 0; i < Math.ceil(snowflakes/2); i++) {
    snowing(larr[i]);
    snowing(larr2[i]);
    snowing(larr3[i]);
}

//Generate random numbers for attributes
function R(min,max) {
    return min + Math.random() * (max-min)
};
    

  
const SVG = {
    createCanvas : function( width, height, containerId ){
      var container = document.getElementById( containerId );
      var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      container.appendChild( canvas );    
      return canvas;
    },
    createLine : function (x1, y1, x2, y2, color, w) {
      var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      aLine.setAttribute('x1', x1);
      aLine.setAttribute('y1', y1);
      aLine.setAttribute('x2', x2);
      aLine.setAttribute('y2', y2);
      aLine.setAttribute('stroke', color);
      aLine.setAttribute('stroke-width', w);
      return aLine;
    }
  }

const fullPageGrid = (spacing, angle) => {

    const numLinesInWidth = Math.ceil(w / spacing);
    const floor = SVG.createCanvas(w, h, "SVGContainer");
    floor.setAttribute("id", "floor");
    const linesToRight = [];
    const linesToLeft = [];

    let x1 = -2 * w + 10;
    let y1 = 2 * h - 5;
    for (let i = 0; i < numLinesInWidth; i++){
        let x2R = x1 + (5 * h * Math.cos(Math.PI * angle / 180));
        let x2L = x1 - (5 * h * Math.cos(Math.PI * angle / 180));
        let y2 = y1 - (5 * h * Math.sin(Math.PI * angle / 180));

        const lineToRight = SVG.createLine(x1, y1, x2R, y2, "#fff", 1);
        linesToRight.push(lineToRight);
        floor.appendChild(lineToRight);

        const lineToLeft = SVG.createLine(x1, y1, x2L, y2, "#fff", 1);
        linesToLeft.push(lineToLeft);
        floor.appendChild(lineToLeft);

        x1 += 5 * spacing;
    }

    return [linesToRight, linesToLeft];
}

const [linesToRight, linesToLeft] = fullPageGrid(10, 30);