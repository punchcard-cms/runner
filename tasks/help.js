'use strict';

const taskListing = require('gulp-task-listing');

module.exports = gulp => {
  /**
    * Gulp task to display all available Gulp tasks
  **/
  gulp.task('help', taskListing.withFilters(/:/));
};
