const { watch, parallel, series, src, dest } = require("gulp");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const clean = require("gulp-clean");

const project = "particles";

const path = {
  src: {
    html: `${project}/src/**/*.html`,
    css: `${project}/src/styles/main.css`,
    js: `${project}/src/js/index.js`,
  },
  build: {
    html: `${project}/build`,
    css: `${project}/build/styles/main.css`,
    js: `${project}/build/js/index.js`,
  },
  watch: {
    html: `${project}/src/**/*.html`,
    css: `${project}/src/styles/**/*.css`,
    js: `${project}/src/js/**/.js`,
  },
  clean: `${project}/build/`,
};

function reload(cb) {
  bs.reload();
  cb();
}

module.exports.cleanBuild = cleanBuild = () => {
  return src(path.clean, { read: false }).pipe(clean());
};

module.exports.buildJs = function buildJS() {
  return src(path.src.js)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(dest(path.build.js));
};

module.exports.html = function html() {
  return src(path.src.html).pipe(dest(path.build.html));
};

module.exports.css = function css() {
  return src(path.src.css).pipe(dest(path.build.css));
};

module.exports.watching = function watching(done) {
  watch([path.src.html, path.src.css, path.src.js], (done) => {
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
