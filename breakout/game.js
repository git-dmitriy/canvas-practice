// * План работы:

// +todo Задача №1 - вывести фон

"use strict";
const game = {
  start: function () {
    this.ctx = document.querySelector("#mycanvas").getContext("2d");
    const background = new Image();
    background.src = "img/background.png";
    window.requestAnimationFrame(() => {
      this.ctx.drawImage(background, 0, 0);
    });
  },
};

window.addEventListener("load", () => {
  game.start();
});
