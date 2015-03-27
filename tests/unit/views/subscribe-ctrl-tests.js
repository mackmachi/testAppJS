describe('SubscribeCtrl', function(){
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

        controller = $controller('SubscribeCtrl', {
          $scope: $scope,
          $state: $state,
          $rootScope: $rootScope
        });


        $httpBackend.when('GET', /.*.html.*/).respond();
        $httpBackend.when('GET', /.*mocks\/.*\.json.*/).respond();

        $scope.$digest();

      }]);


  });

  it('should have a homectrl controller', function(){
    $scope.init();
    expect(controller).toBeDefined();
  });


  it('should have variables initialized', function(){
    $scope.init();
    expect($scope.firstName).toBe("");
    expect($scope.lastName).toBe("");
    expect($scope.emailValue).toBe("");
  });

  //it('should broadcast to open the mask', function(){
  //  spyOn($rootScope, '$broadcast');
  //  $scope.init();
  //  $scope.showMask();
  //  expect($rootScope.$broadcast).toHaveBeenCalledWith('mask/open');
  //});

  it('should clear the inputs', function(){
    spyOn($rootScope, '$broadcast');
    $scope.init();
    $scope.firstName = "Test";
    $scope.lastName = "Apple";
    $scope.emailValue = "Test@apple.com";
    $scope.clearInputs();
    expect($scope.firstName).toBe("");
    expect($scope.lastName).toBe("");
    expect($scope.emailValue).toBe("");
  });

});