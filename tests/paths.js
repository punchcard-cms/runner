import test from 'ava';
import paths from '../lib/paths';

const options = require('../lib/defaults');
const mySharona = {
  assets: {
    _folders: {
      public: 'public',
      source: 'src',
    },
    arraySrc: {
      src: [
        'foo',
        'bar',
      ],
      dest: 'js',
      files: '**/*.js',
    },
    arrayFiles: {
      files: [
        'foo.js',
        'bar.js',
        'baz.js',
      ],
      dest: 'js',
      src: 'waldo',
    },
    arrayBoth: {
      files: [
        'foo.js',
        'bar.js',
        'baz.js',
      ],
      dest: 'js',
      src: [
        'waldo',
        'garfield',
      ],
    },
  },
};

test('Simple Paths', t => {
  const lintPaths = paths(options.tasks.js.lint.paths, options, 'source');
  const jsPaths = paths(options.tasks.js.build.paths, options);

  const lintExpected = ['lib/**/*.js', 'index.js', 'src/js/**/*.js', 'tests/**/*.js'];
  const jsExpected = ['js/**/*.js'];

  t.deepEqual(lintPaths, lintExpected, 'Should expand an array of paths');
  t.deepEqual(jsPaths, jsExpected, 'Should expand for a single path');
});

test('Array Source', t => {
  const arraySrc = paths(['assets.arraySrc'], mySharona);
  const arrayFiles = paths(['assets.arrayFiles'], mySharona);
  const arrayBoth = paths(['assets.arrayBoth'], mySharona);

  const arraySrcE = ['foo/**/*.js', 'bar/**/*.js'];
  const arrayFilesE = ['waldo/foo.js', 'waldo/bar.js', 'waldo/baz.js'];
  const arrayBothE = ['waldo/foo.js', 'waldo/bar.js', 'waldo/baz.js', 'garfield/foo.js', 'garfield/bar.js', 'garfield/baz.js'];

  t.deepEqual(arraySrc, arraySrcE, 'Should expand an array of sources');
  t.deepEqual(arrayFiles, arrayFilesE, 'Should expand an array of files');
  t.deepEqual(arrayBoth, arrayBothE, 'Should expand both an array of sources and files');
});
