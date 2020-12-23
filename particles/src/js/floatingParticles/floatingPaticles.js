export class Particle {
  constructor(canvas, ctx, x, y, directionX, directionY, size, color) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.ctx = ctx;
    this.particleArray;
    this.ctx.canvas.height = window.innerHeight;
    this.ctx.canvas.width = window.innerWidth;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }

  init() {
    window.addEventListener("resize", () => {
      this.ctx.canvas.height = window.innerHeight;
      this.ctx.canvas.width = window.innerWidth;
    });
    this.particleArray = [];
    for (let i = 0; i < 100; i++) {
      let size = Math.random() * 10;
      let x = Math.random() * (innerWidth - size * 2);
      let y = Math.random() * (innerHeight - size * 2);
      let directionX = Math.random() * 0.4 - 0.2;
      let directionY = Math.random() * 0.4 - 0.2;
      let color = this.color;
      this.particleArray.push(
        new Particle(
          this.canves,
          this.ctx,
          x,
          y,
          directionX,
          directionY,
          size,
          color
        )
      );
    }
    this.animate();
  }

  animate() {
    const animateParticles = () => {
      this.ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < this.particleArray.length; i++) {
        this.particleArray[i].update();
      }
      window.requestAnimationFrame(animateParticles);
    };
    animateParticles();
  }
}
