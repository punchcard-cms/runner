'use strict';

const configuration = require('./lib/config');

module.exports = (gulp, options) => {
  const config = configuration(options);

  //////////////////////////////
  // Tasks
  //////////////////////////////
  require('./tasks/browser-sync')(gulp, config);
  require('./tasks/npm')(gulp, config);
  require('./tasks/js')(gulp, config);
  require('./tasks/nodemon')(gulp, config);
  require('./tasks/sass')(gulp, config);
  require('./tasks/imagemin')(gulp, config);
  require('./tasks/clean')(gulp, config);

  require('./tasks/lint')(gulp, config);
  require('./tasks/watch')(gulp, config);
  require('./tasks/build')(gulp, config);
  require('./tasks/help')(gulp, config);

  require('./tasks/default')(gulp, config);
};


module.exports.config = configuration;
