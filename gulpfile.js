const { watch, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

const project = {
  breakOut: "breakout/",
  appleHunter: "apple-hunter/",
};

function serverBreakOut(done) {
  browserSync.init({
    server: {
      baseDir: project.breakOut,
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
  });
  done();
}

function watchingBreakOut(done) {
  watch(`${project.breakOut}**/*.*`, (done) => {
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
        extensions: ["html"],
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

exports.breakOut = parallel(serverBreakOut, watchingBreakOut);
exports.appleHunter = parallel(serverAppleHunter, watchingAppleHunter);

// exports.default = parallel(server, watching);
