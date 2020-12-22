const { watch, series, src, dest } = require("gulp");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const clean = require("gulp-clean");

const project = "particles";

const path = {
  src: {
    html: `${project}/src/**/*.html`,
    css: `${project}/src/styles/main.css`,
    js: `${project}/src/js/main.js`,
  },
  build: {
    html: `${project}/build`,
    css: `${project}/build/styles/`,
    js: `${project}/build/js/`,
  },
  watch: {
    html: `${project}/src/**/*.html`,
    css: `${project}/src/styles/**/*.css`,
    js: `${project}/src/js/**/*.js`,
  },
  clean: `${project}/build/`,
};

function reload(cb) {
  browserSync.reload();
  cb();
}

module.exports.cleanBuild = cleanBuild = () => {
  return src(path.clean, { read: false, allowEmpty: true }).pipe(clean());
};

module.exports.buildJS = buildJS = () => {
  return src(path.src.js)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(dest(path.build.js));
};

module.exports.html = html = () => {
  return src(path.src.html).pipe(dest(path.build.html));
};

module.exports.css = css = () => {
  return src(path.src.css).pipe(dest(path.build.css));
};

module.exports.watching = watching = () => {
  watch(path.watch.html, series(html, reload));
  watch(path.watch.css, series(css, reload));
  watch(path.watch.js, series(buildJS, reload));
};

module.exports.server = server = (done) => {
  browserSync.init({
    server: {
      baseDir: "particles/build",
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
    open: false,
  });
  done();
};
