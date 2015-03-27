
angular.module('App')
  .directive('mask', [
    '$compile',
    function ($compile) {

      'use strict';


      return {
        restrict: 'A',
        link: function postLink($scope, element, attr) {

          var defaultZIndex = 7;

          $scope.init = function () {

            $scope.maskIsLocked = false;
            element.css('visibility', 'hidden');
            $scope.initMessage();
            $scope.compileEl();
            $scope.$on('mask/set-z-index', $scope.setZIndex);
            $scope.$on('mask/reset-z-index', $scope.resetZIndex);
            $scope.$on('mask/close', $scope.maskClose);
            $scope.$on('mask/open', $scope.maskOpen);
            $scope.$on('mask/update', $scope.updateMessage);
            $scope.$on('mask/open-invisible', $scope.maskOpenInvisible);
            $scope.$on('mask/close-invisible', $scope.maskCloseInvisible);
            $scope.$on('mask/open-locked', $scope.maskOpenLocked);
            $scope.$on('mask/close-locked', $scope.maskCloseLocked);
            $scope.$on('$destroy', $scope.destroyed);
          };

          $scope.initMessage = function(){
            $scope.msgToDisplay = "Your request is being sent";
          };

          $scope.compileEl = function(){

            var el = $compile( '<div id="user-information" class="info no-select"><span>{{msgToDisplay}}</span></div>' )( $scope );
            element.append( el );
          };

          $scope.updateMessage = function(e, d){

            if(d && d.msg){
              $scope.msgToDisplay = d.msg;
            }

            if(d && d.type){
              if(d.type === 'success'){
                element.find('div').removeClass('error info').addClass('success');
              }else if(d.type === 'error'){
                element.find('div').removeClass('success info').addClass('error');
              }else if(d.type === 'info'){
                element.find('div').removeClass('error success').addClass('info');
              }
            }

            if(d && d.clear){
              $scope.maskIsLocked = false;
            }
          };

          $scope.maskClicked = function (e) {
            $scope.maskClose();
          };

          $scope.maskOpen = function (ev, o) {
            element.css('visibility', 'visible');
            element.addClass('in');

          };

          $scope.maskClose = function () {
            if ( ! $scope.maskIsLocked) {
              element.removeClass('top in invisible');
              element.css('visibility', 'hidden');
            }
          };

          $scope.maskTransitionEnd = function () {
            if ( ! element.hasClass('in')) {
              element.css('visibility', 'hidden');
            }
          };

          $scope.maskOpenInvisible = function (ev) {
            $scope.maskOpen(ev);
            element.addClass('invisible');
          };

          $scope.maskCloseInvisible = function (ev) {
            $scope.maskClose(ev);
            element.removeClass('invisible');
          };

          $scope.maskOpenLocked = function (ev) {
            $scope.maskIsLocked = true;
            $scope.maskOpen();
          };

          $scope.maskCloseLocked = function (ev) {
            console.log("I WILL CLOSE MASK HERE");
            $scope.maskIsLocked = false;
            $scope.maskClose();
          };

          $scope.setZIndex = function (ev, zIndex) {
            if (zIndex) {
              element.css('zIndex', zIndex);
            } else {
              $scope.resetZIndex();
            }

          };

          $scope.resetZIndex = function (ev, zIndex) {
            element.css('zIndex', defaultZIndex);
          };

          $scope.destroyed = function () {

          };

          $scope.init();
        }
      };
    }
  ]
);
