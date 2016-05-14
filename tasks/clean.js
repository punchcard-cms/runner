'use strict';

const clean = require('del');

module.exports = (gulp, options) => {
  /**
    * Gulp task to delete the public assets folder
  **/
  gulp.task('clean:public', cb => {
    return clean([
      options.assets._folders.public,
    ], cb);
  });
};
