"use strict";

const gulp = require("gulp");
const fractal = require("./fractal.js");
const logger = fractal.cli.console;
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");

gulp.task("sass", function() {
  return gulp
    .src("_dev/scss/**/*.scss")
    .pipe(
      sass().on("error", function(err) {
        console.error(err.message);
        this.emit("end");
      })
    )
    .pipe(
      autoprefixer({
        grid: true,
        flexbox: true
      })
    )
    .pipe(sass())
    .pipe(gulp.dest("public/css"));
});

gulp.task("watch", ["sass"], function() {
  gulp.watch(["components/**/*.scss", "_dev/scss/**/*.scss"], ["sass"]);
});

gulp.task("fractal:start", function() {
  const server = fractal.web.server({
    sync: true
  });
  server.on("error", err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
});

gulp.task("default", ["fractal:start", "sass", "watch"]);
