'use strict';

const browserSync = require('browser-sync').create('221B Baker Street');


module.exports = (gulp, options) => {
  /**
    * Gulp task to proxy our server through BrowserSync
  **/
  gulp.task('browser-sync', ['nodemon'], () => {
    let url = options.server.host;

    if (options.server.port !== 80) {
      url += `:${options.server.port}`;
    }

    browserSync.init({
      'proxy': url,
    });
  });
};
