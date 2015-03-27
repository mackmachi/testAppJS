/**
 * Created by mackenzie on 2015-03-22.
 */
describe('mask', function () {

  'use strict';

  var el,
    $scope,
    $rootScope,
    $compile;

  beforeEach(function () {

    // We need app to make sure that ngStorage is included here
    module('App');

    inject([
      '$rootScope',
      '$compile',
      '$injector',
      function ($rs, $c, $i) {

        $compile = $c;
        $rootScope = $rs;
        $scope = $rootScope.$new();

        el = angular.element('<div mask></div>');

        $compile(el)($scope);

        $scope.$apply();



      }
    ]);
  });


  it ('should initialize correctly', function () {
    $scope.init();
    expect($scope.maskIsLocked).toBe(false);
    //expect($scope.$$childHead.attr).toBeDefined();
  });

  it ('should update message correctly correctly', function () {
    $scope.init();
    //expect($scope.maskQueue).toBeDefined();
    //expect($scope.$$childHead.attr).toBeDefined();
  });



});

