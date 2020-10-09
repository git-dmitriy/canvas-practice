const { watch, parallel } = require("gulp");

const browserSync = require("browser-sync").create();

function server(done) {
  browserSync.init({
    server: {
      baseDir: `./breakout/`,
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
  });
  done();
}

function watching(done) {
  watch("./breakout/**/*.*", function reloading(done) {
    browserSync.reload();
    done();
  });
  done();
}

exports.default = parallel(server, watching);
