( function () {

  'use strict';

  function AppCtrl ( $rootScope, $scope, $state ) {

    var sections;

    $scope.init = function () {

      sections = [
        { id: 'subscribe', sref: 'root.subscribe', label: 'Subscribe' },
        { id: 'complete', sref: 'root.complete', label: 'complete' }
      ];

      $scope.updateWindowTitle();

      $rootScope.$on( '$stateChangeSuccess', $scope.stateChanged );
    };

    $scope.stateChanged = function () {
      $scope.updateWindowTitle();
    };

    $scope.updateWindowTitle = function () {

      var sectionLabel;

      sections.some( function ( section ) {
        if ( $state.current.name.match ( new RegExp ( section.id ) ) !== null ) {
          sectionLabel = section.label;
          return true;
        }
        return false;
      });

      $rootScope.windowTitle = 'E-mail | ' + sectionLabel;

    };

    $scope.init();

  }

  angular.module( 'App' )
    .controller( 'AppCtrl', [
      '$rootScope',
      '$scope',
      '$state',
      AppCtrl
    ]);

})();