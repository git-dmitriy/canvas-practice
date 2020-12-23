import { Particle } from "./floatingParticles/floatingPaticles";

document.addEventListener("DOMContentLoaded", () => {
  const particles = new Particle(
    document.querySelector("#canvas"),
    canvas.getContext("2d"),
    100,
    100,
    1,
    1,
    5,
    "black"
  );
  particles.init();
});
