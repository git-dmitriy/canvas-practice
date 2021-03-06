const canvas = document.createElement("canvas");
canvas.classList.add("canvas");
document.querySelector("body").append(canvas);

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 150) * (canvas.width / 150),
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

export class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let repulsionSpeed = 1;
    if (distance < mouse.radius + this.size) {
      if (
        mouse.x < this.x &&
        this.x < canvas.width - this.size * repulsionSpeed
      ) {
        this.x += repulsionSpeed;
      }
      if (mouse.x > this.x && this.x > this.size * repulsionSpeed) {
        this.x -= repulsionSpeed;
      }
      if (
        mouse.y < this.y &&
        this.y < canvas.height - this.size * repulsionSpeed
      ) {
        this.y += repulsionSpeed;
      }
      if (mouse.y > this.y && this.y > this.size * repulsionSpeed) {
        this.y -= repulsionSpeed;
      }
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 15000;
  console.log("numberOfParticles:", numberOfParticles);
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 4 + 3;
    let speed = 2;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * speed - speed / 2;
    let directionY = Math.random() * speed - speed / 2;
    let color = "#333";

    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connection();
}

function connection() {
  let opacity = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance =
        (particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x) +
        (particlesArray[a].y - particlesArray[b].y) *
          (particlesArray[a].y - particlesArray[b].y);

      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacity = 1 - distance / 20000;
        ctx.strokeStyle = `rgba(51, 51, 51, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.height / 80) * (canvas.width / 80);
  init();
});

window.addEventListener("mouseout", () => (mouse.x = mouse.y = undefined));
