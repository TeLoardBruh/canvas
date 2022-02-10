const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");

context.fillStyle = "rgba(255,0,0,0.5)";
context.fillRect(100, 100, 100, 100);
context.fillStyle = "rgba(0,255,0,0.5)";
context.fillRect(400, 100, 100, 100);
context.fillStyle = "rgba(0,0,255,0.5)";
context.fillRect(300, 300, 100, 100);

// creating line

context.beginPath();
context.moveTo(50, 300);
context.lineTo(300, 100);
context.lineTo(400, 300);
context.stroke();

// arc

context.arc(300, 300, 30, 0, Math.PI * 2, false);
context.stroke();

for (var i = 0; i < 4; i++) {
  var x = Math.random() * window.innerWidth;
  var y = Math.random() * window.innerHeight;
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  context.beginPath();
  context.arc(x, y, 30, 0, Math.PI * 2, false);
  context.strokeStyle = "#"+randomColor;

  context.stroke();
}
