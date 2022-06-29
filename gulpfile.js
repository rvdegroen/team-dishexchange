const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");

gulp.task("sass", () =>
  // return sass files from the direct folders or subfolders (helpers)
  gulp
    .src("static/scss/**/*.scss")
    // compile scss files to css and if it goes wrong, log the error
    // compress compiled css files (source: https://www.npmjs.com/package/gulp-sass --> render with options)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    // bundle the compiled compressed css files
    .pipe(concat("bundle.min.css"))
    // save the compiled css into the destination folder
    .pipe(gulp.dest("static/css/"))
);

gulp.task("watch", () => {
  // which files do I want to be watched and which tasks will I run after a change has been made?
  gulp.watch("static/scss/**/*.scss", gulp.series(["sass"]));
});

// if you type gulp in terminal, it will run default
// gulp series can run an array of tasks one after another: first run sass then something else if I wanted to add one in the future
gulp.task("default", gulp.series(["sass"]));
