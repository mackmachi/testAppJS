/**
 * JSHint
 *
 * Validates JavaScript files for syntax and style errors.
 *
 */

var gulp = require ( 'gulp' );
var jsHint = require ( 'gulp-jshint' );
var jsHintStylish = require ( 'jshint-stylish' );
var plumber = require( 'gulp-plumber' );

module.exports.task = function () {

  gulp.task ( 'hint', function () {
    return gulp.src ( './app/src/**/*.js' )
      .pipe ( plumber() )
      .pipe ( jsHint() )
      .pipe ( jsHint.reporter ( jsHintStylish ) )
    ;
  });

};