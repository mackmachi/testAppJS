var httpMock,
  $scope,
  rootScope,
  ctrl,
  sm,
//  $timeout,
//  mocks,
  contentData,
  configData;

var mockBasicServices = function () {

  'use strict';

  inject(function ($httpBackend) {




    httpMock = $httpBackend;
    httpMock.when('POST', /.*subscribe.*/).respond({});



  });
};
