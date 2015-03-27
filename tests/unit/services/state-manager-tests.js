describe('state-manager', function () {

  'use strict';

  var $rootScope,
      sm,
      httpMock;

  // load the module
  beforeEach(function () {

    module('App');

    inject([
      '$injector',
      'stateManager',
      '$httpBackend',
      function ($injector, stateManager, $httpBackend) {

        $rootScope = $injector.get('$rootScope');
        sm = stateManager;
        httpMock = $httpBackend;

      }


    ]);


  });

  it('should call a service', function () {
    //httpMock.when('POST', /.*.subscribe.*/).respond({userId: 'userX'}, {'A-Token': 'xxx'});


    var dataToPass = {
      dataType: "JSON",
      data: {
        id: 12341,
        keyId: 10
      }

    };
   sm.updateSubscriberList(dataToPass);


  });


  it('should not call a service', function () {

    sm.updateSubscriberList();
  });




});
