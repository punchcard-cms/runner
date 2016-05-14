import test from 'ava';
import helpers from '../lib/helpers';

const options = require('../lib/defaults');

const obj = {
  foo: {
    bar: {
      baz: 'qux'
    }
  }
};

test('Nested Property Find', t => {
  t.true(helpers.nestedExists(obj, 'foo', 'bar', 'baz'), 'Should be `true` if a nested key exists');
  t.false(helpers.nestedExists(obj, 'foo', 'baz'), 'Should be `false` if a nested key does not exist');
});


test('Object By String', t => {
  t.deepEqual(helpers.objByString(obj, 'foo.bar'), {baz: 'qux'}, 'Should return the value of a nested item');
  t.deepEqual(helpers.objByString(obj, 'foo.bar.baz'), 'qux', 'Should return the value of a nested item');
  t.is(helpers.objByString(obj, 'foo.baz'), null, 'Should return `null` if not found');
  t.is(helpers.objByString(obj, 'bar'), null, 'Should return `null` if not found');
})

test('Build Sequence from Object', t => {
  // Sample Config
  const seq = {
    'clean': [
      'clean'
    ],
    'lint': [
      'sass:lint',
      'js:lint'
    ],
    'serve': [
      'build',
      'serve'
    ]
  };

  // Sample Callback Function, not an actual thing we need to test
  const cb = () => {
    return 'Hello World';
  };

  // Expected Results
  const results = [
    [
      'clean'
    ],
    [
      'sass:lint',
      'js:lint'
    ],
    [
      'build',
      'serve'
    ],
    cb
  ];

  t.deepEqual(helpers.sequence(seq, cb), results, 'Should return an array of arrays with the callback at the end');
});

test('Build Sequence from Array', t => {
  // Sample Config
  const seq = [
    [
      'clean'
    ],
    [
      'sass:lint',
      'js:lint'
    ],
    [
      'build',
      'serve'
    ]
  ];

  // Sample Callback Function, not an actual thing we need to test
  const cb = () => {
    return 'Hello World';
  };

  // Expected Results
  const results = seq;
  results.push(cb);

  t.deepEqual(helpers.sequence(seq, cb), results, 'Should return an array of arrays with the callback at the end');
});


test('Finds the `_folders` property of top most parent if it exists', t => {
  const folder = helpers.findFolders(options, 'assets.js');
  const expected = { public: 'public', source: 'src' };

  t.deepEqual(helpers.findFolders(options, 'assets.js'), expected, 'Should return the `_folders` object if found');
  t.deepEqual(helpers.findFolders(options, 'application.library'), {}, 'Should return an empty object if no `_folders` object is found');
});
