'use strict';

/**
  * Gulp task to run all gulp tasks, plus the BrowserSync server
**/
module.exports = (gulp, options) => {
  gulp.task('watch', options.tasks.watch);
};
