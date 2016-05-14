'use strict';

const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').get('221B Baker Street');
const helpers = require('../lib/helpers');

module.exports = (gulp, options) => {
  const index = helpers.objByString(options, options.tasks.nodemon.script);
  const watch = [];

  options.tasks.nodemon.watch.forEach(watching => {
    watch.push(helpers.objByString(options, watching));
  });

  /**
    * Gulp task to run nodemon which will stop and restart our Node server
  **/
  gulp.task('nodemon', cb => {
    nodemon({
      script: index,
      watch: watch,
      ext: options.tasks.nodemon.extension,
    })
    .once('start', () => {
      cb();
    })
    .on('start', () => {
      setTimeout(() => {
        browserSync.reload();
      }, 500);
    });
  });
};
