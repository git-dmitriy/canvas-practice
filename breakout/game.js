// * План работы:

// +todo Задача №1 - вывести фон
// +todo Рефакторинг:
//  выделение чёткой структуры
// todo Расставить объекты по полю

"use strict";

const game = {
  ctx: null,
  platform: null,
  ball: null,
  sprites: {
    background: null,
    ball: null,
    platform: null,
  },
  init: function () {
    this.ctx = document.querySelector("#mycanvas").getContext("2d");
  },
  preload: function (callback) {
    let loaded = 0;
    const required = Object.keys(this.sprites).length;

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
  run: function () {
    window.requestAnimationFrame(() => {
      this.render();
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
  },
  start: function () {
    this.init();
    this.preload(() => {
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
  x: 280,
  y: 300,
};

window.addEventListener("load", () => {
  game.start();
});
