( function () {

  'use strict';

  function CompleteCtrl ($rootScope, $scope, $timeout, $state) {


    //setting up the formData to pass with the controller.


    $scope.init = function () {

      $scope.$on( '$destroy', $scope.destroyed );

    };


    $scope.goToForm = function(){
      $state.go('root.subscribe');
    };
    $scope.init();

  }

  angular.module( 'App' )
    .controller( 'CompleteCtrl', [
      '$rootScope',
      '$scope',
      '$timeout',
      '$state',
      'stateManager',
      CompleteCtrl
    ]);

})();


