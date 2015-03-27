/**
 * Created by mackenzie on 2015-03-21.
 */
( function () {

  'use strict';


  //angular.module ( 'Subscribe', []);
  //angular.module("scripts/directives/inputField/inputField.html", []).run(["$templateCache", function($templateCache) {
  //  $templateCache.put("scripts/directives/inputField/inputField.html",
  //    '<div data-input-field="{maxLength: 32}" data-ng-model="firstName"></div>');
  //}]);

  angular.module ( 'App', [ 'ui.router', 'oc.lazyLoad' ] );
  angular.element ( document).ready( function () {




    function setRoutes ( $stateProvider, $urlRouterProvider, $httpProvider ) {

      ////Enable cross domain calls
      //$httpProvider.defaults.useXDomain = true;
      ////Remove the header used to identify ajax call  that would prevent CORS from working
      //delete $httpProvider.defaults.headers.common['X-Requested-With'];

      // This gets chained below
      $stateProvider

        .state ( 'root', {
        url: '/',
        views: {
          // appView at root
          'appView@': {
            templateUrl: 'scripts/views/app/app.html'
          }
        },
        resolve: {
          common: [ '$ocLazyLoad', function ( $lazy ) {
            return $lazy.load ({
              name: 'App',
              files: [
                'scripts/directives/mask/mask.js',
                'scripts/services/state-manager.js',
                'scripts/services/request-map.js',
                'scripts/services/web-services.js',
                'scripts/directives/inputField/input-field.js',
                'scripts/views/app/app-ctrl.js'
              ]
            });
          }]
        }
      })

        .state ( 'root.subscribe', {
        url: 'subscribe',
        views: {
          'mainView@root': {
            templateUrl: 'scripts/views/subscribe/subscribe.html'
          }
        },

        resolve: {
          controllers: [ '$ocLazyLoad', function ( $lazy ) {
            return $lazy.load ({
              name: 'App',
              files: [
                'scripts/views/subscribe/subscribe-ctrl.js'
              ]
            });
          }]
        }
      })
        .state ( 'root.complete', {
        url: 'complete',
        views: {
          'mainView@root': {
            templateUrl: 'scripts/views/complete/complete.html'
          }
        },
        resolve: {
          controllers: [ '$ocLazyLoad', function ( $lazy ) {
            return $lazy.load ({
              name: 'App',
              files: [
                'scripts/views/complete/complete-ctrl.js'
              ]
            });
          }]
        }
      })

      ;

      $urlRouterProvider
        .otherwise ( '/subscribe' );

    }

    // Instantiating modules like this is better for debugging
    angular.module ( 'App' )
      .config ( [
      '$stateProvider',
      '$urlRouterProvider',
      '$httpProvider',
      setRoutes
    ]);
    // Manual bootstrap of the Angular app - it's generally better to have fine-grained control
    angular.bootstrap ( document, [ 'App' ] );

  });


})();
