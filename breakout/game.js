// * План работы:

// +todo Задача №1 - вывести фон
// +todo Рефакторинг:
//  выделение чёткой структуры
// +todo Расставить объекты по полю
// +todo Реализовать движение платформы
// +todo Движение мяча вместе с платформой
// +todo Запуск мяча
// +todo Взлет мяча под случайным углом
// todo Обработка столкновения мяча с блоком
//    +* Отскок мяча от блока
//    +*  Отскок мяча от платформы
//    +*  Разрушение блока
// todo Обработка событий выхода элементов за игровое поле
//    +* Мяча
//    * Платформы
// todo Добавить звуковые эффекты
// todo Завершение игры
//    * Отображение очков

"use strict";

const game = {
  ctx: null,
  platform: null,
  ball: null,
  blocks: [],
  rows: 4,
  cols: 8,
  boardWidth: 640,
  boardHeight: 360,
  sprites: {
    background: null,
    ball: null,
    platform: null,
    block: null,
  },
  init: function () {
    this.ctx = document.querySelector("#mycanvas").getContext("2d");
    this.setEvents();
  },
  setEvents() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        this.platform.fire();
      } else if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
        this.platform.start(e.code);
      }
    });
    window.addEventListener("keyup", () => {
      this.platform.stop();
    });
  },
  preload: function (callback) {
    let loaded = 0;
    const required = Object.keys(this.sprites).length;
    let onImageLoad = () => {
      ++loaded;
      if (loaded >= required) {
        callback();
      }
    };

    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `img/${key}.png`;
      this.sprites[key].addEventListener("load", onImageLoad());
    }
  },
  create() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.blocks.push({
          x: 64 * col + 65,
          y: 24 * row + 35,
          width: 60,
          height: 20,
          active: true,
        });
      }
    }
  },
  stateUpadate() {
    this.platform.move();
    this.ball.move();
    this.collideblocks();
    this.collidePlatform();
    this.ball.collideWorldBounds();
  },
  collideblocks() {
    for (let block of this.blocks) {
      if (this.ball.collide(block) && block.active) {
        this.ball.hitBlock(block);
      }
    }
  },
  collidePlatform() {
    if (this.ball.collide(this.platform)) {
      this.ball.bounceOff(this.platform);
    }
  },

  run: function () {
    window.requestAnimationFrame(() => {
      this.stateUpadate();
      this.render();
      this.run();
    });
  },
  render: function () {
    this.ctx.clearRect(0, 0, this.boardWidth, this.boardHeight);
    this.ctx.drawImage(this.sprites.background, 0, 0);
    this.ctx.drawImage(
      this.sprites.ball,
      0,
      0,
      this.ball.width,
      this.ball.height,
      this.ball.x,
      this.ball.y,
      this.ball.width,
      this.ball.height
    );
    this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
    this.renderBlocks();
  },
  renderBlocks() {
    for (let block of this.blocks) {
      if (block.active) {
        this.ctx.drawImage(this.sprites.block, block.x, block.y);
      }
    }
  },
  start: function () {
    this.init();
    this.preload(() => {
      this.create();
      this.run();
    });
  },
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};

game.ball = {
  x: 320,
  y: 280,
  dx: 0,
  dy: 0,
  height: 20,
  width: 20,
  velocity: 3,
  start() {
    this.dy = -this.velocity;
    this.dx = game.random(-this.velocity, this.velocity);
  },
  move() {
    if (this.dy) {
      this.y += this.dy;
    }
    if (this.dx) {
      this.x += this.dx;
    }
  },
  collide(element) {
    let x = this.x + this.dx;
    let y = this.y + this.dy;
    if (
      x + this.width > element.x &&
      x < element.x + element.width &&
      y + this.height > element.y &&
      y < element.y + element.height
    ) {
      return true;
    }
    return false;
  },
  collideWorldBounds() {
    let x = this.x + this.dx;
    let y = this.y + this.dy;

    if (x < 0) {
      this.x = 0;
      this.dx = this.velocity;
    } else if (x + this.width > game.boardWidth) {
      this.x = game.boardWidth - this.width;
      this.dx = -this.velocity;
    } else if (y < 0) {
      this.y = 0;
      this.dy = this.velocity;
    } else if (y + this.height > game.boardHeight) {
      console.log("Game over");
    }
  },
  hitBlock(element) {
    this.dy *= -1;
    element.active = false;
  },
  bounceOff(platform) {
    if (this.dy > 0) {
      this.dy = -this.velocity;
      let touchX = this.x + this.width / 2;
      this.dx = this.velocity * platform.getTouchOffSet(touchX);
    }
  },
};

game.platform = {
  velocity: 6,
  dx: 0,
  x: 280,
  y: 300,
  width: 100,
  height: 14,
  ball: game.ball,
  start(direction) {
    if (direction === "ArrowRight") {
      this.dx = this.velocity;
    } else if (direction === "ArrowLeft") {
      this.dx = -this.velocity;
    }
  },
  fire() {
    if (this.ball) {
      this.ball.start();
      this.ball = null;
    }
  },
  stop() {
    this.dx = 0;
  },
  move() {
    if (this.dx) {
      this.x += this.dx;
      if (this.ball) {
        this.ball.x += this.dx;
      }
    }
  },
  getTouchOffSet(x) {
    let diff = this.x + this.width - x;
    let offset = this.width - diff;
    let result = (2 * offset) / this.width;
    return result - 1;
  },
};

window.addEventListener("load", () => {
  game.start();
});
