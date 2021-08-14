// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    createCanvas, colorMode, HSB, background, mouseIsPressed, strokeWeight, line, mouseX, mouseY
 */

// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.

let priorX, priorY;

var socket;

function setup(){
  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);

  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  background(220, 0, 90);
}

function newDrawing(data) {
  fill('white');
  ellipse(data.x, data.y, 20);
}

function draw(){
  if (mouseIsPressed){ 
    fill('black');
    ellipse(mouseX, mouseY, 20);
    console.log('Sending: (' + mouseX + ', ' + mouseY + ')');
    var data = {
      x: mouseX,
      y: mouseY
    }
    socket.emit('mouse', data);
  }
}