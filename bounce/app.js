const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
const numberofParticle = 250;
let heu = 0;

// get Measurement
let titleElement = document.getElementById("title1");
let titleMeasurement = titleElement.getBoundingClientRect();
let title = {
  x: titleMeasurement.left,
  y: titleMeasurement.top,
  width: titleMeasurement.width,
  height: 10,
};
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 15 + 1;
    this.weight = Math.random() * 1 + 1;
    this.directionX = -2;
    this.color = "hsl(" + heu + ",100%,50%)";
  }
  update() {
    if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.weight = Math.random() * 1 + 1;
      this.x = Math.random() * canvas.width * 1.2;
    }
    this.weight += 0.05;
    this.y += this.weight;
    this.x += this.directionX;
    // checking for collision
    if (
      this.x < title.x + title.width &&
      this.x + this.size > title.x &&
      this.y < title.y + title.height &&
      this.y + this.size > title.y
    ) {
      this.y -= 3;
      this.weight *= -0.5;
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}
function init() {
  for (var i = 0; i < numberofParticle; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particleArray.push(new Particle(x, y));
  }
}
init();



function handleParticle() {
  for (var i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    for (var j = i; j < particleArray.length; j++) {
      const dx = particleArray[i].x - particleArray[j].x;
      const dy = particleArray[i].y - particleArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particleArray[i].color;
        ctx.lineWidth = 0.05;
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
      }
    }
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.fillStyle = "rgba(255,255,255,0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  heu += 0.5;
  for (var i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  }

  ctx.fillRect(title.x, title.y, title.width, title.height);

  requestAnimationFrame(animate);
}

animate();
