'use strict';

const configuration = require('./lib/config');

const browserSync = require('./tasks/browser-sync');
const npm = require('./tasks/npm');
const js = require('./tasks/js');
const nodemon = require('./tasks/nodemon');
const sass = require('./tasks/sass');
const imagemin = require('./tasks/imagemin');
const clean = require('./tasks/clean');

const lint = require('./tasks/lint');
const watch = require('./tasks/watch');
const build = require('./tasks/build');
const help = require('./tasks/help');

const defaults = require('./tasks/default');


module.exports = (gulp, options) => {
  const config = configuration(options);

  //////////////////////////////
  // Tasks
  //////////////////////////////
  browserSync(gulp, config);
  npm(gulp, config);
  js(gulp, config);
  nodemon(gulp, config);
  sass(gulp, config);
  imagemin(gulp, config);
  clean(gulp, config);

  lint(gulp, config);
  watch(gulp, config);
  build(gulp, config);
  help(gulp, config);

  defaults(gulp, config);
};


module.exports.config = configuration;
