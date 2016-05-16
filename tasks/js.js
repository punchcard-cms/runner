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
  const lintPaths = {
    node: paths(options.tasks.js['lint:node'].paths, options, 'source'),
    browser: paths(options.tasks.js['lint:browser'].paths, options, 'source'),
    test: paths(options.tasks.js['lint:test'].paths, options, 'source'),
  };
  const lintOptions = {
    node: options.tasks.js['lint:node'].options,
    browser: options.tasks.js['lint:browser'].options,
    test: options.tasks.js['lint:test'].options,
  };
  const jsPaths = paths(options.tasks.js.build.paths, options, 'source');
  const output = path.join(options.assets._folders.public, options.assets.js.dest);

  /**
    * Gulp task to watch all JavaScript files and lint them
  **/
  gulp.task('js:lint:node', () => {
    return gulp.src(lintPaths.node)
      .pipe(eslint(lintOptions.node))
      .pipe(eslint.format())
      .pipe(gif(options.options.fail, eslint.failOnError()));
  });

  gulp.task('js:lint:browser', () => {
    return gulp.src(lintPaths.browser)
      .pipe(eslint(lintOptions.browser))
      .pipe(eslint.format())
      .pipe(gif(options.options.fail, eslint.failOnError()));
  });

  gulp.task('js:lint:test', () => {
    return gulp.src(lintPaths.test)
      .pipe(eslint(lintOptions.test))
      .pipe(eslint.format())
      .pipe(gif(options.options.fail, eslint.failOnError()));
  });

  gulp.task('js:lint', ['js:lint:node', 'js:lint:browser', 'js:lint:test']);

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
