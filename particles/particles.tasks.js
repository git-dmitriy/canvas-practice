const { watch, parallel, src, dest } = require("gulp");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");

// const project = "particles";

// const path = {
//   src: {
//     html: `${project}/src/index.html`,
//     css: `${project}/src/styles/main.css`,
//     js: `${project}/src/js/index.js`,
//   },
//   build: {
//     html: `${project}/build/index.html`,
//     css: `${project}/build/styles/main.css`,
//     js: `${project}/build/js/index.js`,
//   },
//   watch: {
//     html: `${project}/src/**/*.html`,
//     css: `${project}/src/styles/**/*.css`,
//     js: `${project}/src/js/**/.js`,
//   },
// };

module.exports.buildJs = function buildJS() {
  return src("particles/src/js/index.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(dest("particles/build"));
};

module.exports.html = function html() {
  return src("particles/src/index.html").pipe(dest("particles/build"));
};
module.exports.css = function css() {
  return src("particles/src/styles/main.css").pipe(dest("particles/build"));
};

module.exports.watching = function watching(done) {
  watch("particles/src/**/*.*", (done) => {
    browserSync.reload();
    done();
  });
  done();
};

module.exports.server = function server(done) {
  browserSync.init({
    server: {
      baseDir: "particles/build",
      serveStaticOptions: {
        extensions: ["html"],
      },
      open: true,
    },
  });
  done();
};
