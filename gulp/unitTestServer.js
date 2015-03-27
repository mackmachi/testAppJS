/**
 * Unit Test Server
 *
 * Uses Karma to run project unit tests.
 *
 */

var gulp = require ( 'gulp' );
var karma = require ( 'gulp-karma' );

module.exports.task = function () {

  var testFiles = [
    'app/libraries/jquery/dist/jquery.min.js',
    'app/libraries/angular/angular.min.js',
    'app/libraries/angular-ui-router/release/angular-ui-router.min.js',
    'app/libraries/ocLazyLoad/dist/ocLazyLoad.min.js',

    'app/libraries/angular-mocks/angular-mocks.js',

    'app/scripts/config.js',
    'app/scripts/app.js',
    'app/scripts/**/*.{js,html}',
    //'app/scripts/templates.js',

    'tests/unit/directives/**/*.js',
    'tests/unit/views/**/*.js',
    'tests/unit/services/**/*.js',
    'tests/unit/build-and-price/**/*.js'
  ];

  gulp.task ( 'test-unit:run', function () {

    return gulp.src ( testFiles )
      .pipe ( karma ({
        configFile: './tests/karma-unit-tests.conf.js',
        action: 'run'
      }))
      .on ( 'error', function ( err ) {
        throw err;
      })
    ;

  });

  gulp.task ( 'test-unit:watch', function () {

    // Note that we're using gulp.watch, not gulp-watch so we don't get the benefit
    // of detecting new or deleted files.
    return gulp.src ( testFiles )
      .pipe ( karma ({
        configFile: './tests/karma-unit-tests.conf.js',
        action: 'watch'
      }))
      .on ( 'error', function ( err ) {
        throw err;
      })
      ;
  });

};