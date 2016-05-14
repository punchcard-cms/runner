'use strict';

const imagemin = require('gulp-imagemin');
const paths = require('../lib/paths');
const browserSync = require('browser-sync').get('221B Baker Street');
const path = require('path');

module.exports = (gulp, options) => {
  const imagePaths = paths(options.tasks.images.build.paths, options, 'source');
  const output = path.join(options.assets._folders.public, options.assets.images.dest);

  /**
    * Gulp task to watch all Image files, optimize them, and put them in to our public folder
  **/
  gulp.task('imagemin', () => {
    return gulp.src(imagePaths)
      .pipe(imagemin(options.tasks.images.build.options))
      .pipe(gulp.dest(output))
      .pipe(browserSync.stream());
  });

  /**
    * Gulp task to watch all Image files and optimize on change
  **/
  gulp.task('imagemin:watch', () => {
    return gulp.watch(imagePaths, ['imagemin']);
  });
};
