'use strict';

const merge = require('merge');
const defaults = require('./defaults');
const helpers = require('./helpers');

module.exports = (options) => {
  if (helpers.nestedExists(options, 'options', 'merge')) {
    if (options.options.merge === false) {
      return options;
    }
  }

  return merge.recursive(true, defaults, options);
};
