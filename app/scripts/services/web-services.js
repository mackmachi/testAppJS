/**
 * Created by mackenzie on 2015-03-21.
 */

/**
 * @class Services.webServices
 * @arg $http Object that creates HTTP requests, a native Angular object
 * @desc A singleton that wraps all calls to the web services and handles errors. Each method expects
 * to be passed the success handler to return the data.
 */


angular.module('App')
  .factory('webServices', [
    '$log',
    '$http',
    '$location',
    '$rootScope',
    'requestMap',
    function ($log, $http, $location, $rootScope, requestMap) {

      'use strict';


      var WEB_SERVICE_URL = 'https://us10.api.mailchimp.com/2.0',
          DEFAULT_TIMEOUT = testAppConfig.constants.DEFAULT_TIMEOUT || 1000;

      if(testAppConfig.PROXY_ENABLED){
        WEB_SERVICE_URL = testAppConfig.PROXY_URL+WEB_SERVICE_URL;
      }

      var getData =  function (o) {
        callWebService(o);
      };

      var callWebService = function (o) {
        var serviceCall,
            timeout,
            request;

        timeout =  (o && o.timeout && ! isNaN(parseInt(o.timeout, 10))) ? parseInt(o.timeout, 10) : DEFAULT_TIMEOUT;

        if (o.methodName === undefined) {
          $log.error('You must pass a method name to webServices.getData', o);
        }

        // Adds requestType and path to the config object
        angular.extend(o, requestMap.get(o.methodName));

        o.url = WEB_SERVICE_URL +  o.path;


        request = {
          method: o.requestType,
          url: o.url,
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},//'application/x-www-form-urlencoded'setting this because it avoids pre-flight
          cache: false,
          timeout: timeout
        };

        if (o.params) {
          request.params = o.params;
        }

        if (o.data) {
          request.data = o.data;
        }

        console.log("THE REQUEST I AM mAKING iS", request);

        serviceCall = $http(request);


        // Bind the success handler
        serviceCall.success(function(response, status, headers, responseConfig) {
          if (typeof o.successHandler === 'function') {
            o.successHandler(response, request);
          }
        });

        // Bind the error handler
        serviceCall.error(function(response, status, headers, responseConfig) {
          if (typeof o.errorHandler === 'function') {
            o.errorHandler(response, request);
          } else {  // If there isn't a callback, log a generic error
            $log.error('There was an error with delivery');
          }
        });
      };

      return {
        getData: getData
      };
    }
  ]
);