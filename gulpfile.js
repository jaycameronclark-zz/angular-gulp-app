var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

// Modules for webserver and livereload
var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

// Set up an express server (not starting it yet)
var server = express();
server.use(livereload({port: livereloadport}));
server.use(express.static('./dist'));
server.all('/*', function(req, res) {
  res.sendfile('index.html', { root: 'dist' });
});

// Dev task
gulp.task('dev', ['views', 'styles', 'lint', 'browserify'], function() {
  server.listen(serverport);
  lrserver.listen(livereloadport);
  gulp.run('watch');
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('app/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('app/styles/normalize/normalize.css')
  .pipe(gulp.dest('dist/css/'))
  gulp.src('app/styles/*.scss')
  .pipe(sass({onError: function(e) { console.log(e); } }))
  .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
  .pipe(gulp.dest('dist/css/'))
  .pipe(refresh(lrserver));
});

// Browserify task
gulp.task('browserify', function() {
  gulp.src(['app/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('dist/js'));
});

// Views task
gulp.task('views', function() {
    gulp.src('app/index.html')
    .pipe(gulp.dest('dist/'))
    .pipe(refresh(lrserver));
    gulp.src('app/views/**/*')
    .pipe(gulp.dest('dist/views/'))
    .pipe(refresh(lrserver));
});

gulp.task('watch', ['lint'], function() {
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
    'lint',
    'browserify'
  ]);
  
  gulp.watch(['app/styles/**/*.scss'], [
    'styles'
  ]);

  gulp.watch(['app/**/*.html'], [
    'views'
  ]);
});