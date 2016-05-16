'use strict';

const sass = require('gulp-sass');
const lint = require('gulp-sass-lint');
const paths = require('../lib/paths');
const gif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const prefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync').get('221B Baker Street');
const path = require('path');

module.exports = (gulp, options) => {
  const sassPaths = paths(options.tasks.sass.build.paths, options, 'source');
  const lintPaths = paths(options.tasks.sass.lint.paths, options, 'source');
  const sassOptions = options.tasks.sass.options;
  const output = path.join(options.assets._folders.public, options.assets.sass.dest);

  /**
    * Gulp task to lint Sass files
  **/
  gulp.task('sass:lint', () => {
    return gulp.src(lintPaths)
      .pipe(lint())
      .pipe(lint.format())
      .pipe(gif(options.options.fail, lint.failOnError()));
  });

  /**
    * Gulp task to compile Sass files.
    * Lints them beforehand
  **/
  gulp.task('sass', ['sass:lint'], () => {
    return gulp.src(sassPaths)
      .pipe(gif(!options.options.fail, sourcemaps.init()))
      .pipe(gif(options.options.fail, sass(sassOptions).on('error', sass.logError), sass(sassOptions)))
      .pipe(prefix())
      .pipe(gif(!options.options.fail, sourcemaps.write('./maps')))
      .pipe(gulp.dest(output))
      .pipe(browserSync.stream());
  });

  /**
    * Gulp task to watch all Sass files and compile on change
  **/
  gulp.task('sass:watch', () => {
    return gulp.watch(sassPaths, ['sass']);
  });
};
