"use strict";

const gulp = require("gulp");
const fractal = require("./fractal.js");
const logger = fractal.cli.console;
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const postcssCustomProperties = require("postcss-custom-properties");
const stripComments = require("gulp-strip-css-comments");
const notify = require("gulp-notify");

const cssDir = "public/css";
const sassDir = "_dev/scss/**/*.scss";
const componentDir = "components/**/*.scss";

function compileSass() {
  return gulp
    .src(sassDir)
    .pipe(
      sass().on("error", function(err) {
        console.error(err.message);
        this.emit("end");
      })
    )
    .pipe(stripComments())
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: true
      })
    )
    .pipe(postcss([postcssCustomProperties()]))
    .pipe(gulp.dest(cssDir))
    .pipe(notify("Sass compiled"));
}

function fractalStart() {
  const server = fractal.web.server({
    sync: true
  });
  server.on("error", err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
}

function watchSass() {
  gulp.watch([componentDir, sassDir], compileSass);
}

gulp.task("default", gulp.series(fractalStart, compileSass, watchSass));
