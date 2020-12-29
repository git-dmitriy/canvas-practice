export class BackgroundParticles {
  constructor(options) {
    this.options = options;
    this.canvas;
    this.ctx;
    this.mouse;
    this.particlesArray = [];
  }

  init() {
    this.canvas = document.createElement("canvas");
    this.canvas.classList.add("background");
    document.querySelector("body").append(this.canvas);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = this.canvas.getContext("2d");

    this.mouse = {
      x: null,
      y: null,
      radius: (this.canvas.height / 150) * (this.canvas.width / 150),
    };

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.mouse.radius = (this.canvas.height / 80) * (this.canvas.width / 80);
      this.createParticles();
    });

    window.addEventListener(
      "mouseout",
      () => (this.mouse.x = this.mouse.y = undefined)
    );

    this.createParticles();
    this.animate();
  }

  createParticles() {
    this.particlesArray = [];
    let numberOfParticles = (this.canvas.height * this.canvas.width) / 15000;

    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 4 + 3;
      let speed = 2;
      let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
      let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
      let directionX = Math.random() * speed - speed / 2;
      let directionY = Math.random() * speed - speed / 2;
      let color = "#333";

      this.particlesArray.push(
        new Particle(
          x,
          y,
          directionX,
          directionY,
          size,
          color,
          this.canvas,
          this.ctx,
          this.mouse
        )
      );
    }
  }

  animate() {
    const animates = () => {
      this.ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < this.particlesArray.length; i++) {
        this.particlesArray[i].update();
      }
      this.addConnections();
      requestAnimationFrame(animates);
    };
    animates();
  }

  addConnections() {
    let particlesArray = this.particlesArray;
    let opacity = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let distance =
          (particlesArray[a].x - particlesArray[b].x) *
            (particlesArray[a].x - particlesArray[b].x) +
          (particlesArray[a].y - particlesArray[b].y) *
            (particlesArray[a].y - particlesArray[b].y);

        if (distance < (this.canvas.width / 7) * (this.canvas.height / 7)) {
          opacity = 1 - distance / 20000;
          this.ctx.strokeStyle = `rgba(51, 51, 51, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          this.ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          this.ctx.stroke();
        }
      }
    }
  }
}

export class Particle {
  constructor(x, y, directionX, directionY, size, color, canvas, ctx, mouse) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.canvas = canvas;
    this.ctx = ctx;
    this.mouse = mouse;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    let canvas = this.canvas;
    let mouse = this.mouse;

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
