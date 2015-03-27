
/**
 * Package dependencies
 */

// I prefer to define all of the packages up top instead of where they're used. Alphabetical order.

var gulp = require ( 'gulp' );
var requireDir = require ( 'requiredir' );
var watch = require ( 'gulp-watch' ); // gulp.watch is too primitive. This covers new and deleted files and per-file streams
var compass = require('gulp-compass');


/**
 * Import our tasks
 *
 * I broke it down like this so that the file isn't so monolithic and so that we can focus
 * on the workflow rather than the individual tasks.
 */

var imports = requireDir ( './gulp' );

for ( var prop in imports ) {
  if ( imports.hasOwnProperty ( prop ) ) {
    if ( typeof imports [ prop ].task === 'function' ) {
      imports [ prop ].task();
    }
  }
}

var connect = imports.previewServer.connect;

/**
 * Workflows
 *
 * These are collections of tasks that we need to support our workflow
 *
 */


// Run tasks for development process
gulp.task ( 'generate-css', [
    'sass'
  ],
  function () {
    console.log( 'Compiled CSS.');
  }
);

// Run unit tests
gulp.task ( 'test', [
    'test-unit:watch'
  ],
  function () {
    console.log( 'Running UNIT TEST server.');
  }
);

// Default - runs when you just type 'gulp'
gulp.task ( 'default', [ 'dev' ] );

