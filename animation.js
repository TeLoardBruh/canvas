const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var maxRadius = 40;
var mixRadius = 2;
var mouseCoordinate = {
  x: undefined,
  y: undefined,
};

var colorArray = ["#fffaa33", "#99ffaaa", "#00ffaa", "#4411aa", "#ff1100"];

function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.mixRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
    context.stroke();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (
      mouseCoordinate.x - this.x < 50 &&
      mouseCoordinate.x - this.x > -50 &&
      mouseCoordinate.y - this.y < 50 &&
      mouseCoordinate.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.mixRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

// var circle = new Circle(200, 200, 30, 3, 3);
var circleArry = [];

for (let i = 0; i < 1000; i++) {
  var radius = Math.random() * 3 + 1;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dx = Math.random() - 0.5;
  var dy = Math.random() - 0.5;
  circleArry.push(new Circle(x, y, radius, dx, dy));
}

function moveMouse(event) {
  mouseCoordinate.x = event.x;
  mouseCoordinate.y = event.y;
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
}

window.addEventListener("mousemove", moveMouse);
window.addEventListener("resize", resize);

function init() {
  circleArry = [];

  for (let i = 0; i < 1000; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = Math.random() - 0.5;
    var dy = Math.random() - 0.5;
    circleArry.push(new Circle(x, y, radius, dx, dy));
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArry.length; i++) {
    circleArry[i].update();
  }
}

animate();
