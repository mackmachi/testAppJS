angular.module('App')
  .factory('requestMap', [
    function () {

      'use strict';

      var REQUEST_MAP = {
        subscribeUser: {requestType: 'POST', path: '/lists/subscribe'}
      };

      var getMapDataByKey = function (key) {

        if ( ! REQUEST_MAP[key]) {
          //$log.error('Request map not found for key', key);
          return null;
        }

        return REQUEST_MAP[key];
      };

      return {
        get: getMapDataByKey
      };

    }]);

