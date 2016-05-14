'use strict';

const spawn = require('child_process').spawn;
const paths = require('../lib/paths.js');

//////////////////////////////
// Gulp Task to run NPM Tasks
//////////////////////////////
module.exports = (gulp, options) => {
  /**
    * Gulp task to run our automated AVA testing
  **/
  gulp.task('npm:ava', (cb) => {
    const test = spawn('npm', ['run', 'ava', '--silent'], { stdio: 'inherit' });

    test.on('close', code => {
      let result = null;
      if (code !== 0 && options.options.fail) {
        result = `AVA failed with a code of ${code}`;
      }

      return cb(result);
    });
  });

  gulp.task('npm:ava:watch', (cb) => {
    const test = spawn('npm', ['run', 'ava:watch'], { stdio: 'inherit' });

    test.on('close', code => {
      let result = null;
      if (code !== 0 && options.options.fail) {
        result = `AVA failed with a code of ${code}`;
      }

      return cb(result);
    });
  });
};
