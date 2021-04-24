"use strict";

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const devip = require("dev-ip");


// ===================================
// SERVER
// ===================================
// Dev server
gulp.task("default", function() {
browserSync.init({
    server: "src",
    host: devip(), // From "dev-ip" extension
    reloadDelay: 0,
    reloadDebounce: 100,
    notify: false,
  });

  gulp.watch("src/*.html").on("change", browserSync.reload)
  gulp.watch("src/sass/**/*.scss", gulp.series("sass"));
  gulp.watch("src/js/**/*.js").on("change", browserSync.reload);
});


// ===================================
// DEV TASKS
// ===================================
// SASS compilation
gulp.task("sass", function() {
  return gulp
    .src("src/sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});