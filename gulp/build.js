'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('styles', function () {
  var sassOptions = {
    style: 'expanded'
  };

  return gulp.src([
    path.join(conf.paths.src, '/**/*.scss')
  ])
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.cleanCss())
    .pipe($.concat('ca-angular-loading-overlay.min.css'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/css/')));
});

gulp.task('scripts', function () {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.size())
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'caLoadingOverlay',
      root: 'ca-loading-overlay'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});


gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['scripts', 'partials', 'styles'], function () {
  return gulp.src([
    conf.paths.src + '/loading-overlay.module.js',
    conf.paths.src + '/**/*.js',
    conf.paths.tmp + '/**/*.js'
  ])
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe($.concat('ca-angular-loading-overlay.min.js'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/js/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});
