'use strict';

const runSequence = require('run-sequence');

// From http://stackoverflow.com/questions/2631001/javascript-test-for-existence-of-nested-object-key
const nested = function nested(obj) {
  const args = Array.prototype.slice.call(arguments, 1);
  let object = obj;
  let i;

  for (i = 0; i < args.length; i++) {
    if (!object || !object.hasOwnProperty(args[i])) {
      return false;
    }
    object = object[args[i]];
  }

  return true;
};

//////////////////////////////
// Create Array from Object String
//////////////////////////////
const arrayFromString = (string) => {
  let s = string;
  let a = '';

  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  a = s.split('.');

  return a;
};

//////////////////////////////
// Find Folders by String
//////////////////////////////
const findFolders = (object, string) => {
  const a = arrayFromString(string);
  let top;
  let folders = {};

  if (a.length) {
    top = a[0];
  }

  if (object.hasOwnProperty(top) && object[top].hasOwnProperty('_folders')) {
    folders = object[top]._folders;
  }

  return folders;
};

//////////////////////////////
// Get Object by String
//////////////////////////////
const objByString = (object, string) => {
  const a = arrayFromString(string);
  let o = object;
  let n;
  let i;

  for (i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in o) {
      o = o[k];
    }
    else {
      return null;
    }
  }

  return o;
};

//////////////////////////////
// Build Sequence for Run Sequence
//////////////////////////////
const sequence = (config, cb) => {
  let seq = [];

  if (Array.isArray(config)) {
    seq = config;
  }
  else {
    Object.keys(config).forEach(task => {
      seq.push(config[task]);
    });
  }

  seq.push(cb);

  return seq;
};

sequence.run = function sequenceRun(seq) {
  return runSequence.apply(this, seq);
};


module.exports.nestedExists = nested;
module.exports.objByString = objByString;
module.exports.sequence = sequence;
module.exports.findFolders = findFolders;
