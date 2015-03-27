/**
 * @class App.Services.stateManager
 * @desc A singleton that wraps stores the various state data. Also allows for easy reversion.
 */

angular.module('App')
  .factory('stateManager', [
    '$log',
    '$rootScope',
    '$q', //this could be used if we want to create promises
    'webServices',
    function ($log, $rootScope, $q, webServices) {

      'use strict';

      // Initialize
      var init = function () {

      };


      var callService = function (o) {
        webServices.getData(o);
      };


      var updateSubscriberList = function (o) {

        if(o.dataType === 'JSON'){
          angular.toJson(o.data);
          //JSON.stringify(o.data)
        }else{
          $.param(o.data);
        }

        return callService({
          methodName: 'subscribeUser',
          data: o.data,
          successHandler: o.successHandler,
          errorHandler: o.errorHandler
        });
      };



      init();

      return {
        updateSubscriberList: updateSubscriberList
      };
    }
  ]
);

