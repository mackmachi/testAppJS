/**
 * SASS
 *
 * Compiles .scss files into a single css file. 
 *
 */

var gulp = require ( 'gulp' );
var compass = require('gulp-compass');
var plumber = require ( 'gulp-plumber' );

module.exports.task = function () {

	gulp.task('sass', function() {
    console.log("I AM RUNNING THIS");
	  gulp.src('./app/styles/sass/styles.scss')
	  	.pipe( plumber() )
	    .pipe( compass({
	      css: './app',
	      sass: './app/styles/sass',
	      image: './app/images'
	    }))
	    .pipe(gulp.dest('./app/styles'));
	});

};


