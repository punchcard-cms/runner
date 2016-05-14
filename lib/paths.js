'use strict';

const path = require('path');
const helpers = require('./helpers');

//////////////////////////////
// Builds an array of paths to test against
//////////////////////////////
module.exports = (find, options, fldr) => {
  const paths = [];
  let toFind = [];
  let pFolder = fldr || '';

  if (!Array.isArray(find)) {
    toFind.push(find);
  }
  else {
    toFind = find;
  }

  toFind.forEach((f) => {
    const object = helpers.objByString(options, f);
    let folder = helpers.findFolders(options, f);
    folder = folder[pFolder] || '';

    if (Array.isArray(object.src)) {
      object.src.forEach(src => {
        if (Array.isArray(object.files)) {
          object.files.forEach(file => {
            paths.push(path.join(folder, src, file));
          });
        }
        else {
          paths.push(path.join(folder, src, object.files));
        }
      });
    }
    else {
      if (Array.isArray(object.files)) {
        object.files.forEach(file => {
          paths.push(path.join(folder, object.src, file));
        });
      }
      else {
        paths.push(path.join(folder, object.src, object.files));
      }
    }
  });

  return paths;
};
