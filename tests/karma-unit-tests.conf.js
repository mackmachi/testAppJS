module.exports = function ( config ) {

  'use strict';

  config.set({

    // Normalize the reference to project root
    basePath: '../',

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari
    // - PhantomJS
    browsers: [ 'PhantomJS' ],

    // enable / disable colors in the output (reporters and logs)
    colors: true,



    // list of files to exclude
    exclude: [],

    frameworks: [
      'jasmine',
      //'mocha',
      //'sinon-chai'
    ],

    // level of logging
    logLevel: config.LOG_DEBUG,

    preprocessors: {
      'app/scripts/**/!(*.test).js': 'coverage',
      'app/scripts/**/*.html': ['ng-html2js']
    },

    // This essentially injects all of the html templates into a module called 'mock-templates' and
    // strips the prepending directory so that the URLs match up properly.
    ngHtml2JsPreprocessor: {
      //moduleName: 'mock-templates',
      stripPrefix: 'app/'
    },



    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-junit-reporter',
      'karma-ng-html2js-preprocessor'
      //'karma-mocha',
      //'karma-sinon-chai',
      //'karma-chrome-launcher',
      //'karma-phantomjs-launcher',
      //'karma-coverage',
      //'karma-ng-html2js-preprocessor'
    ],

    // web server port
    port: config.PORT || 8090,


    proxies: {
      '/': 'http://localhost:8086/'
    },


    coverageReporter: {
      type: 'html',
      //type: 'lcov',
      dir: './tests/coverage'
    },
    junitReporter: {
      outputFile: 'test/reports/unit-test-results.xml'
    },

    // test results reporter to use
    // possible values: dots || progress
    reporters: [ 'progress', 'coverage'],

    // cli runner port
    runnerPort: config.RUNNER_PORT || 9010,

    urlRoot: '__karma'
  });
};