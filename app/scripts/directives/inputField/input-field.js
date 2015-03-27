
angular.module('App')
  .directive('inputField', [
    function () {

      'use strict';

      return {
        require: '?ngModel',
        restrict: 'A',
        scope: {
          textField: "=ngModel",
          emailExists: "=emailExists"
        },
        templateUrl: 'scripts/directives/inputField/input-field.html',
        link: function ($scope, element, attr, ngModel) {

          var inputType;

          $scope.init = function () {

            $scope.emailErrorExist = [];

            $scope.fieldExits = false;
            $scope.inputValid = ngModel.$valid;
            $scope.attr = $scope.$eval(attr.inputField) || {};

            if($scope.attr.id){
              $scope.elementId = $scope.attr.id;
            }

            if($scope.attr.label){
              $scope.label = $scope.attr.label;
            }else{
              $scope.label="";
            }

            if($scope.attr && $scope.attr.maxLength){
              $scope.maxLength = $scope.attr.maxLength
            }

            if($scope.attr && $scope.attr.inputType === "email"){
              inputType = "email"
            }

            $scope.setContent();
            if($scope.emailExists !== undefined){
              $scope.$watch('emailExists', $scope.emailExistUpdate);
            }


            ngModel.$setValidity('not-valid', false);
            //$scope.checkContent();

          };


          $scope.checkEmailValid = function(){//very simple check for e-mail


            if($scope.textField.split('@').length > 1){
              if($scope.textField.split('@')[1].split(".").length > 1 && $scope.textField.split('@')[1].split(".")[1].length > 1){
                return true;

              }else{
                return false;
              }
            }else{
              return false;
            }
          };


          $scope.emailExistUpdate = function(){

            if($scope.emailExists){
              $scope.validationError = true;
              ngModel.$setValidity('not-valid', !$scope.validationError);
              $scope.emailNotValid = true;
              $scope.validationErrorEmailText = "The e-mail is already subscribed";
              $scope.emailExists = false;
              $scope.emailErrorExist.push($scope.textField);
            }

          };


          //$scope.clearEmailValid = function(){
          //
          //  //$scope.validationError = false;
          //  //ngModel.$setValidity('not-valid', !$scope.validationError);
          //  //$scope.emailNotValid = false;
          //
          //};

          $scope.checkExists = function(){

            //$scope.clearEmailValid();
            $scope.fieldExits = false;
            $scope.validationErrorEmailText = "The "+$scope.label+" is not valid";

            for(var i = 0, iLen = $scope.emailErrorExist.length; i < iLen; i++){
              if($scope.textField === $scope.emailErrorExist[i]){
                $scope.emailNotValid = true;
                $scope.fieldExits = true;
                $scope.validationErrorEmailText = "The e-mail is already subscribed";
                break;
              }
            }


          };

          $scope.checkContent = function(){

            //Manual checks, can add more to the directive.
            if($scope.textField !== undefined){

              if($scope.textField.length === 0 ){
                $scope.minLengthReached = true;
                $scope.maxLengthReached = false;
                $scope.emailNotValid = false;
              }else if( $scope.maxLength && $scope.textField.length >  $scope.maxLength){
                $scope.maxLengthReached = true;
                $scope.minLengthReached = false;
                $scope.emailNotValid = false;
                ngModel
              }else if(inputType === "email"){
                $scope.emailNotValid = !$scope.checkEmailValid();
                $scope.maxLengthReached = false;
                $scope.minLengthReached = false;

              }else {
                $scope.maxLengthReached = false;
                $scope.minLengthReached = false;
                $scope.emailNotValid = false;
                $scope.validationErrorEmailText = "The "+$scope.label+" is not valid";
              }
            }else {
              $scope.minLengthReached = true;
            }


            if(!$scope.emailNotValid){
              $scope.checkExists();
            }
            if($scope.maxLengthReached || $scope.minLengthReached || $scope.emailNotValid || $scope.fieldExists){
              $scope.validationError = true;
              ngModel.$setValidity('not-valid', !$scope.validationError);
              element.addClass("error-active");
            }else{
              $scope.fieldExists = false;
              $scope.validationError = false;
              ngModel.$setValidity('not-valid', !$scope.validationError);
              element.removeClass("error-active");
            }



            $scope.inputValid = ngModel.$valid;
          };

          $scope.setContent = function(){
            $scope.validationError = false;
            $scope.maxLengthReached = false;
            $scope.minLengthReached = false;
            $scope.emailNotValid = false;
            $scope.placeHolderText = "Please enter "+$scope.label;
            $scope.validationErrorMaxLengthText = "The "+$scope.label+" is larger than the character limit";
            $scope.validationErrorMinLengthText =  "The "+$scope.label+" is required";
            $scope.validationErrorEmailText = "The "+$scope.label+" is not valid";
          };

          $scope.init();
        }
      };
    }
  ]
  );
