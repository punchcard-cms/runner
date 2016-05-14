'use strict';

module.exports = (gulp) => {
  /**
    * Gulp task to run all of our lint tasks
  **/
  gulp.task('lint', ['js:lint', 'sass:lint']);
};
