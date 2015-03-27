describe('requestMap', function () {

  'use strict';

  var $rootScope,
      rm;

  // load the module
  beforeEach(function () {

    module('App');

    inject([
      '$injector',
      'requestMap',
      function ($injector, requestMap) {

        $rootScope = $injector.get('$rootScope');
        rm = requestMap;

      }
    ]);
  });

  it('should retrieve the proper post object', function () {
    var testObject = rm.get("subscribeUser");
    expect(testObject).toBeDefined();

  });

  it('should retrieve null when requesting nothing', function () {
    var testObject = rm.get("");
    expect(testObject).toBe(null);

  });




});
