import test from 'ava';
import config from '../lib/config';

const defaults = require('../lib/defaults');

const userConfig = {
  options: {
    fail: true,
  },
  foo: {
    bar: 'baz',
  },
};

test('Default Config', t => {
  const options = config();

  t.deepEqual(options, defaults, 'Output matches defaults when no options passed in');
});

test('Merged Config', t => {
  const options = config(userConfig);
  const updated = defaults;

  updated.options.fail = true;
  updated.foo = {
    bar: 'baz',
  };


  t.deepEqual(options, updated, 'Output matches merged results when merging is set to `true`');
});

test('Unmerged Config', t => {
  const updated = userConfig;
  updated.options.merge = false;

  const options = config(userConfig);

  t.deepEqual(options, updated, 'Output matches merged results when merging is set to `false`');
});
