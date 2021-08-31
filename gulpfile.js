const { watch, parallel, series } = require('gulp');
const browserSync = require('browser-sync').create();

const particles = require('./particles/particles.tasks');

const project = {
  breakout: 'breakout/',
  appleHunter: 'apple-hunter/',
};

function serverBreakout(done) {
  browserSync.init({
    server: {
      baseDir: project.breakout,
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
  });
  done();
}

function watchingBreakout(done) {
  watch(`${project.breakout}**/*.*`, (done) => {
    browserSync.reload();
    done();
  });
  done();
}
function serverAppleHunter(done) {
  browserSync.init({
    server: {
      baseDir: project.appleHunter,
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
  });
  done();
}

function watchingAppleHunter(done) {
  watch(`${project.appleHunter}**/*.*`, (done) => {
    browserSync.reload();
    done();
  });
  done();
}

exports.breakout = parallel(serverBreakout, watchingBreakout);

exports.appleHunter = parallel(serverAppleHunter, watchingAppleHunter);

exports.particles = series(
  particles.cleanBuild,
  parallel(particles.html, particles.css, particles.buildJS),
  parallel(particles.server, particles.watching)
);
