/**
 * Dist
 *
 * Replaces HTML and CSS with concatenated and minified production versions. Also copies over the requisite files to
 * the dist folder.
 *
 */

var del = require ( 'del' );
var gulp = require ( 'gulp' );
var gulpif = require ( 'gulp-if' );
var uglify = require ( 'gulp-uglify' );
var useref = require ( 'gulp-useref' );


module.exports.task = function () {

  gulp.task ( 'build-dist', function () {

    var assets = useref.assets ();

    // Clean out the dist directory first
    del ( './dist', function () {
      console.log( 'Cleaned dist');
      console.log( 'Starting build...');

      // Copy over the files we're going to need
      gulp.src ( [
        './app/scripts/config.js',
        '!./app/scripts/app.js',
        '!./app/scripts/templates.js',
        './app/scripts/**/*.js'
      ] )
        .pipe ( uglify( { output: { comments: 'some' } } ) )
        .pipe ( gulp.dest ( './dist/scripts' ) )
      ;

      // Copy over the rest
      gulp.src ( [
        './app/styles/*.css.map',
        './app/styles/*.css'
      ])
        .pipe ( gulp.dest ( './dist/styles' ) )
      ;

      gulp.src ( [ './app/fonts/*{.eot,.svg,.ttf,.woff}' ] )
        .pipe ( gulp.dest ( './dist/fonts' ) )
      ;
      gulp.src ( [ './app/images/*.png' ] )
        .pipe ( gulp.dest ( './dist/images' ) )
      ;

      return gulp.src ( './app/index.html')
        .pipe ( assets )
        .pipe ( gulpif ( '**/*.js', uglify( { output: { comments: 'some' } } ) ) )
        .pipe ( assets.restore() )
        .pipe ( useref () )
        .pipe ( gulp.dest ( './dist' ) )
        ;
    });



  });

};
