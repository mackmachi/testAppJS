/**
 * Modernizr
 *
 * Build Modernizr for this project
 *
 */

var gulp = require ( 'gulp' );
var uglify = require ( 'gulp-uglify' );
var modernizr = require ( 'gulp-modernizr' );
var rename = require ( 'gulp-rename' );

module.exports.task = function () {

  gulp.task ( 'build-modernizr', function () {

    return gulp.src ( './app/scripts/**/*.js')
      .pipe ( modernizr ( 'modernizr-custom.js', {
        extra: {
          intl: true
        }
      }))
      .pipe ( gulp.dest ( './app/libraries/modernizr' ) )
      .pipe ( rename( 'modernizr-custom.min.js' ) )
      .pipe ( uglify() )
      .pipe ( gulp.dest ( './app/libraries/modernizr' ) )
    ;

  });

};
