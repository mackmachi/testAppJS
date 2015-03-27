/**
 * HTML Validation
 *
 * For checking the validity of our HTML templates. Refer to this for the available
 * options: https://github.com/yaniswang/HTMLHint/wiki/Rules
 */

var gulp = require ( 'gulp' );
var hint = require ( 'gulp-htmlhint' );
var plumber = require( 'gulp-plumber' );

module.exports.task = function () {

  gulp.task ( 'validate-html', function () {
    gulp.src ( 'app/src/**/*.html')
      .pipe ( plumber() )
      .pipe ( hint ({
        'doctype-first': false
      }) )
      .pipe ( hint.reporter () )
    ;
  });

};