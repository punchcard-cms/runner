'use strict';

const paths = require('../lib/paths.js');
const eslint = require('gulp-eslint');
const gif = require('gulp-if');
const browserSync = require('browser-sync').get('221B Baker Street');
const path = require('path');

//////////////////////////////
// Gulp task to run ESLint
//////////////////////////////
module.exports = (gulp, options) => {
  const lintPaths = paths(options.tasks.js.lint.paths, options, 'source');
  const jsPaths = paths(options.tasks.js.build.paths, options, 'source');
  const output = path.join(options.assets._folders.public, options.assets.js.dest);

  /**
    * Gulp task to watch all JavaScript files and lint them
  **/
  gulp.task('js:lint', () => {
    return gulp.src(lintPaths)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(gif(options.options.fail, eslint.failOnError()));
  });

  /**
    * Gulp task to copy all JavaScript files and to public
  **/
  gulp.task('js', ['js:lint'], () => {
    return gulp.src(jsPaths)
      .pipe(gulp.dest(output))
      .pipe(browserSync.stream());
  });

  /**
    * Gulp task to watch all JavaScript files and lint on change
  **/
  gulp.task('js:watch', () => {
    return gulp.watch(lintPaths, ['js']);
  });
};
