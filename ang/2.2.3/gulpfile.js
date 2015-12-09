'use strict';

require('es6-promise').polyfill();

var gulp     = require('gulp'),
  jshint     = require('gulp-jshint'),
  sass       = require('gulp-sass'),
  concat     = require('gulp-concat'),
  uglify     = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  usemin     = require('gulp-usemin'),
  minifyCss  = require('gulp-minify-css'),
  connect    = require('gulp-connect'),

  files = {
    html: ['app/**/*.html'],
    js: ['app/js/**/*.js'],
    sass: ['app/**/*.scss'],
    vendor: ['app/bower_components']
  },

  dest = {
    build: 'dist/',
    html: 'dist/',
    css: 'app/css/',
    js: 'app/js/'
  };

// Lint JavaScript
gulp.task('jshint', function() {
  return gulp.src(files.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Compile sass
gulp.task('sass', function() {
  return gulp.src(files.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.css));
});

gulp.task('usemin', function() {
  return gulp.src('app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      vendor: [],
      angular: [],
      route: [],
      js: [uglify()]
    }))
    .pipe(gulp.dest(dest.build));
});

gulp.task('partials', function() {
  return gulp.src(files.html)
    .pipe(gulp.dest(dest.html));
});

gulp.task('watch', function() {
  gulp.watch(files.js, ['jshint']);
  gulp.watch(files.sass, ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    port: 1337,
    root: 'app'
  });
});

gulp.task('default', ['sass', 'jshint', 'connect', 'watch']);

gulp.task('build', ['jshint', 'sass', 'usemin', 'partials']);