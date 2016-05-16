'use strict';

/**
  * Gulp task to run all gulp tasks, plus the BrowserSync server
  *
  * @param {object} gulp - Gulp object from requiring Gulp
  * @param {object} options - Object of options to be used
**/
module.exports = (gulp, options) => {
  gulp.task('watch', options.tasks.watch);
};
