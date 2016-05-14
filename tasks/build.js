'use strict';

const sequence = require('../lib/helpers').sequence;

module.exports = (gulp, options) => {
  /**
    * Gulp task to delete and then build and compile all public files
  **/
  gulp.task('build', cb => {
    return sequence.run(sequence(options.tasks.build, cb));
  });
};
