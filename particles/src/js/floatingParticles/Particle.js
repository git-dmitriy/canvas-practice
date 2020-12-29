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
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
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
