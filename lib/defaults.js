'use strict';

const importer = require('node-sass-import-once');

module.exports = {
  options: {
    fail: typeof process.env.CI !== 'undefined',
    merge: true,
  },
  assets: {
    _folders: {
      public: 'public',
      source: 'src',
    },
    sass: {
      src: 'sass',
      dest: 'css',
      files: '**/*.scss',
    },
    images: {
      src: 'images',
      dest: 'images',
      files: '**/*',
    },
    js: {
      src: 'js',
      dest: 'js',
      files: '**/*.js',
    },
  },
  application: {
    views: {
      src: 'views',
      files: '**/*.html',
    },
    library: {
      src: 'lib',
      files: '**/*.js',
    },
    index: {
      src: './',
      files: 'index.js',
    },
  },
  gulp: {
    tasks: {
      src: 'tasks',
      files: '**/*.js',
    },
    index: {
      src: './',
      files: 'Gulpfile.js',
    },
  },
  tests: {
    application: {
      src: 'tests',
      files: '**/*.js',
    },
  },
  server: {
    port: process.env.PORT || 5000,
    host: 'http://localhost',
  },
  tasks: {
    js: {
      'lint:node': {
        paths: [
          'application.library',
          'application.index',
          'assets.js',
          'tests.application',
        ],
      },
      'lint:browser': {
        paths: [
          'assets.js',
        ],
      },
      'build': {
        paths: [
          'assets.js',
        ],
      },
    },
    sass: {
      lint: {
        paths: [
          'assets.sass',
        ],
      },
      build: {
        paths: [
          'assets.sass',
        ],
      },
      options: {
        importer,
        importOnce: {
          index: true,
          css: true,
          bower: true,
        },
      },
    },
    images: {
      build: {
        paths: [
          'assets.images',
        ],
      },
      options: {
        progressive: true,
        svgoPlugins: [
          {
            removeViewBox: false,
          },
        ],
      },
    },
    nodemon: {
      extension: 'js html',
      script: 'application.index.files',
      watch: [
        'application.index.files',
        'application.views.src',
        'application.library.src',
      ],
    },
    build: {
      clean: [
        'clean:public',
      ],
      assets: [
        'sass',
        'imagemin',
        'js',
      ],
    },
    watch: [
      'browser-sync',
      'js:watch',
      'sass:watch',
      'imagemin:watch',
      'npm:ava:watch',
    ],
    default: {
      build: [
        'build',
      ],
      watch: [
        'watch',
      ],
    },
  },
};
