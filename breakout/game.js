// * План работы:

// +todo Задача №1 - вывести фон
// +todo Рефакторинг:
//  выделение чёткой структуры
// +todo Расставить объекты по полю
// +todo Реализовать движение платформы

"use strict";

const game = {
  ctx: null,
  platform: null,
  ball: null,
  blocks: [],
  rows: 4,
  cols: 8,
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
      if (e.code === "ArrowRight") {
        this.platform.dx = this.platform.velocity;
      } else if (e.code === "ArrowLeft") {
        this.platform.dx = -this.platform.velocity;
      }
    });
    window.addEventListener("keyup", () => {
      this.platform.dx = 0;
    });
  },
  preload: function (callback) {
    let loaded = 0;
    const required = Object.keys(this.sprites).length;
    // let onImageLoad = () => {
    //   ++loaded;
    //   if (loaded >= required) {
    //     console.log("preload is done");
    //     callback();
    //   }
    // };

    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `img/${key}.png`;
      this.sprites[key].addEventListener("load", () => {
        loaded++;
        if (loaded >= required) {
          callback();
        }
      });
    }
  },
  create() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.blocks.push({
          x: 64 * col + 65,
          y: 24 * row + 35,
        });
      }
    }
  },
  stateUpadate() {
    this.platform.move();
  },
  run: function () {
    window.requestAnimationFrame(() => {
      this.stateUpadate();
      this.render();
      this.run();
    });
  },
  render: function () {
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

    for (let block of this.blocks) {
      this.ctx.drawImage(this.sprites.block, block.x, block.y);
    }
  },
  start: function () {
    this.init();
    this.preload(() => {
      this.create();
      this.run();
    });
  },
};

game.ball = {
  x: 320,
  y: 280,
  height: 20,
  width: 20,
};

game.platform = {
  velocity: 6,
  dx: 0,
  x: 280,
  y: 300,
  move() {
    if (this.dx) {
      this.x += this.dx;
    }
  },
};

window.addEventListener("load", () => {
  game.start();
});
