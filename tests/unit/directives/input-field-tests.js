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



      }
    ]);
  });


  it ('should initialize correctly', function () {



    el = angular.element('<div data-input-field="{maxLength: 32}" data-ng-model="modelName"></div>');

    $compile(el)($scope);

    $scope.$apply();
    $scope.$$childHead.fieldExits = true;
    $scope.$$childHead.init();

    expect($scope.$$childHead.attr).toBeDefined();
    expect($scope.$$childHead.fieldExits).toBe(false);
    expect($scope.$$childHead.maxLength).toBe(32);
  });

  it ('should require a field name', function () {
    $scope.modelName = "";
    el = angular.element('<div data-input-field="{maxLength: 32}" data-ng-model="modelName"></div>');
    $compile(el)($scope);
    $scope.$apply();
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

  it ('should bind element id, maxLength, type', function () {
    $scope.modelName = "Test";
    el = angular.element('<div data-input-field="{maxLength: 32, inputType: \'normal\', id: \'first-name\', label: \'First Name\'}" data-ng-model="modelName"></div>');
    $compile(el)($scope);
    $scope.$apply();
    $scope.$$childHead.init();
    console.log("el", $scope.$$childHead.attr);
    //$scope.$$childHead.checkContent();
    expect($scope.$$childHead.elementId).toBe('first-name');
    expect($scope.$$childHead.maxLength).toBe(32);
    expect($scope.$$childHead.label).toBe('First Name');

  });

  it ('should validate correct e-mail', function () {
    $scope.modelName = "test@123.com";
    el = angular.element('<div data-input-field="{maxLength: 32, inputType: \'email\', id: \'first-name\', label: \'First Name\'}" data-ng-model="modelName"></div>');
    $compile(el)($scope);
    $scope.$apply();
    $scope.$$childHead.init();
    $scope.$$childHead.checkContent();
    //$scope.$$childHead.checkContent();
    expect($scope.$$childHead.emailNotValid).toBe(false);

  });

  it ('should validate in-correct e-mail', function () {
    $scope.modelName = "test@123com";
    el = angular.element('<div data-input-field="{maxLength: 32, inputType: \'email\', id: \'first-name\', label: \'First Name\'}" data-ng-model="modelName"></div>');
    $compile(el)($scope);
    $scope.$apply();
    $scope.$$childHead.init();
    $scope.$$childHead.checkContent();
    //$scope.$$childHead.checkContent();
    expect($scope.$$childHead.emailNotValid).toBe(true);

  });

  it ('should validate empty field', function () {
    $scope.modelName = "test1@test.com";
    $scope.emailExists = true;

    el = angular.element('<div data-input-field="{maxLength: 32, inputType: \'email\', id: \'first-name\', label: \'First Name\'}" data-ng-model="modelName" email-Exists="emailExists"></div>');
    $compile(el)($scope);
    $scope.$apply();
    $scope.$$childHead.init();
    $scope.$$childHead.emailExists = true;
    $scope.$$childHead.emailExistUpdate();
    expect($scope.$$childHead.validationError).toBe(true);
    expect($scope.$$childHead.emailNotValid).toBe(true);
    expect($scope.$$childHead.emailErrorExist.length).toBe(1);


  });



});

