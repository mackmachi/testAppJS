/**
 * Preview Server
 *
 * Set up a connects server to preview the application. It runs on port 5555 by default.
 *
 */

var connect = require ( 'gulp-connect' ); // Keep this for livereload
var gulp = require ( 'gulp' );


module.exports.task = function () {

  var SERVER_PORT = process.env.PORT_ROUTING || 8888,
    LIVE_RELOAD_PORT = 5555;

  // Create the server task
  gulp.task ( 'preview-server', function () {

    // Set non-standard ports to avoid collisions with other apps
    connect.server ({
      //host: '192.168.78.78',
      livereload: true,
      'livereload.port': LIVE_RELOAD_PORT,
      port: SERVER_PORT,
      root: './app'
    });

  });

};

module.exports.connect = connect;