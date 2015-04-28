var gulp = require('gulp');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('./js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./js'));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch(['./js/**/*.js', '!./js/app.js'], ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);