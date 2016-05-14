'use strict';

const sequence = require('../lib/helpers').sequence;

module.exports = (gulp, options) => {
  /**
    * Gulp task to build and then watch files for development
  **/
  gulp.task('default', cb => {
    return sequence.run(sequence(options.tasks.default, cb));
  });
};
