// make sure you ran `npm install`
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('gulp-cssnano');
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

// Automate HTML compiling
gulp.task('nunjucks', function() {
  return gulp.src('shared/pages/*.njk')
    .pipe(plumber())
    .pipe(nunjucksRender({
      path: ['shared/partials']
    }))
    .pipe(gulp.dest('public'))
});

// Automate CSS compiling
gulp.task('sass', function() {
  return gulp.src('shared/scss/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('public/css'))
});

gulp.task('css-future', ['sass'], function() {
  var processors = [
    autoprefixer({
      browsers: ['last 5 versions', 'Firefox >= 3.5', 'iOS >= 4', 'Android >= 2.3']
    })
  ];
  return gulp.src('public/css/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('public/css'));
});

gulp.task('cssnano', ['css-future'], function() {
  return gulp.src('public/css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

// watch & browser refresh
gulp.task('watch', function() {

  browserSync.init({
    server: "./public"
  });

  gulp.watch('shared/scss/**/*.scss', ['cssnano']);
  gulp.watch('shared/**/*.njk', ['nunjucks']).on('change', browserSync.reload);
});