/**
 * Created by mackenzie on 2015-03-22.
 */
describe('inputField', function () {

  'use strict';

  var el,
    $scope,
    $rootScope,
    $compile;


  beforeEach(function () {

    // We need app to make sure that ngStorage is included here
    module('App', 'scripts/directives/inputField/input-field.html');


    inject([
      '$rootScope',
      '$compile',
      '$injector',
      function ($rs, $c, $i) {

        $compile = $c;
        $rootScope = $rs;

        $scope = $rootScope.$new();

        el = angular.element('<div data-input-field="{maxLength: 32}" data-ng-model="modelName"></div>');

        $compile(el)($scope);

        $scope.$apply();



      }
    ]);
  });


  it ('should initialize correctly', function () {

    $scope.$$childHead.fieldExits = true;
    $scope.$$childHead.init();
    console.log("el", el);
    expect($scope.$$childHead.attr).toBeDefined();
    expect($scope.$$childHead.fieldExits).toBe(false);
  });

  it ('should require a field name', function () {
    $scope.modelName = "";
    $scope.$$childHead.checkContent();
    expect($scope.$$childHead.minLengthReached).toBe(true);
  });

  it ('should have the correct field name', function () {

    $scope.modelName = "Test";
    el = angular.element('<div data-input-field="{maxLength: 32}" data-ng-model="modelName"></div>');
    $compile(el)($scope);
    $scope.$apply();
    $scope.$$childHead.checkContent();
    expect($scope.$$childHead.minLengthReached).toBe(false);
    expect($scope.$$childHead.maxLengthReached).toBe(false);


  });

  it ('should have the max field name', function () {

    $scope.modelName = "01234567890123467152346512746517265347162534761527645172653475312412";
    el = angular.element('<div data-input-field="{maxLength: 32}" data-ng-model="modelName"></div>');
    $compile(el)($scope);
    $scope.$apply();
    $scope.$$childHead.checkContent();
    expect($scope.$$childHead.maxLengthReached).toBe(true);

  });



});

