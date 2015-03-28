describe('CompleteCtrl', function(){
  var $rootScope,
      controller,
      location,
      $scope,
      $state,
      $stateProvider;

  beforeEach(function(){

    module('App');

    inject([

      '$controller',
      '$injector',
      '$httpBackend',
      '$location',
      function($controller, $injector, $httpBackend, $location){
        $rootScope = $injector.get ( '$rootScope' );
        $scope = $rootScope.$new();
        $state = $injector.get('$state');
        location = $injector.get('$location');

        controller = $controller('CompleteCtrl', {
          $scope: $scope,
          $state: $state,
          $rootScope: $rootScope,
          $location: $location
        });


        $httpBackend.when('GET', /.*.html.*/).respond();
        $httpBackend.when('GET', /.*mocks\/.*\.json.*/).respond();

        $scope.$digest();

      }]);


  });

  it('should have a completeCtrl controller', function(){
    $scope.init();
    expect(controller).toBeDefined();


  });






});