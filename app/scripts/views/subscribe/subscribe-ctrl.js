( function () {

  'use strict';

  function SubscribeCtrl ($rootScope, $scope, $timeout, $state, stateManager) {


    //setting up the formData to pass with the controller.


    $scope.init = function () {

      $scope.emailExists = false;
      $scope.initializeContent();
      $scope.formVisible = true;
      $scope.$on( '$destroy', $scope.destroyed );

    };

    $scope.initializeContent = function () {
      $scope.clearInputs();
      $scope.pageTitle = testAppConfig.constants.PAGE_TITLE;
      $scope.firstNameLabel = testAppConfig.constants.FIRST_NAME_LABEL_ENG;
      $scope.lastNameLabel = testAppConfig.constants.LAST_NAME_LABEL_ENG;
      $scope.emailLabel = testAppConfig.constants.EMAIL_LABEL;
      $scope.validationErrorMaxLengthText = testAppConfig.constants.MAX_LENGTH_ERROR;
      $scope.validationErrorMinLengthText = testAppConfig.constants.MIN_LENGTH_ERROR;
      $scope.validationErrorInvalidCharactersText = testAppConfig.constants.INVALID_ERROR;
      $scope.formData = {
        'apikey': ''+testAppConfig.API_KEY,
        'id': ''+testAppConfig.LIST_ID,
        'email': {
          'email': ''
        },
        'merge_vars': {
          'FNAME': '',
          'LNAME': ''
        }
      };
    };


    $scope.signUp = function(){
      $scope.formData.email.email = $scope.emailValue;
      $scope.formData.merge_vars.FNAME = $scope.firstName;
      $scope.formData.merge_vars.LNAME = $scope.lastName;
      $rootScope.$broadcast('mask/update', {msg: "Your request is being sent", type: 'info'});
      $rootScope.$broadcast('mask/open-locked');
      stateManager.updateSubscriberList({
        data: $scope.formData,
        dataType: "JSON",
        successHandler: $scope.signUpSuccess,
        errorHandler: $scope.signUpError
      });
    };



    $scope.signUpSuccess = function(response){
      $scope.formVisible = false;
      $rootScope.$broadcast('mask/update', {msg: "Thank you for signing up", type: 'success', clear: true});
      $scope.emailExists = false;
      $scope.goToComplete();
    };

    $scope.signUpError = function(response){
      var msgToDisplay = "";

      if(response.code === 214){ //e-mail code if e-mail exists.
        msgToDisplay = "The e-mail is already subscribed, click to close and try again";
        $scope.emailExists = true;
      }else{
        msgToDisplay = "There was an error signing you up, click to close and try again";
      }

      $rootScope.$broadcast('mask/update', {msg: msgToDisplay, type: 'error', clear: true});

    };

    $scope.clearInputs = function(){
      $scope.firstName = "";
      $scope.lastName = "";
      $scope.emailValue = "";
    };

    $scope.goToComplete = function(){
      $state.go('root.complete');
    };

    $scope.init();

  }

  angular.module( 'App' )
    .controller( 'SubscribeCtrl', [
      '$rootScope',
      '$scope',
      '$timeout',
      '$state',
      'stateManager',
      SubscribeCtrl
    ]);

})();


