describe('AppCtrl', function(){
  var $rootScope,
    controller,
    $scope,
    $state;

  beforeEach(function(){

    module('App');

    inject([
      '$controller',
      '$injector',
      '$httpBackend',
      function($controller, $injector, $httpBackend){
        $rootScope = $injector.get ( '$rootScope' );
        $scope = $rootScope.$new();
        $state = $injector.get('$state');

        controller = $controller('AppCtrl', {
          $scope: $scope,
          $state: $state,
          $rootScope: $rootScope
        });



        $httpBackend.when('GET', /.*.html.*/).respond();
        $httpBackend.when('GET', /.*mocks\/.*\.json.*/).respond();

        $scope.$apply();

      }]);


  });

  it('should have a AppCtrl controller', function(){
    $scope.init();
    expect(controller).toBeDefined();
  });

  it('should update page title', function(){


    $scope.init();
    $rootScope.$broadcast("$stateChangeSuccess");
    expect($rootScope.windowTitle).toMatch('E-mail');
  });



});