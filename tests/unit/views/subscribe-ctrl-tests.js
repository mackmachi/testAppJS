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

  it('should clear inputs on singup sucess', function(){
    $scope.signUpSuccess();
    expect($scope.formVisible).toBe(false);
  })

  it('should clear inputs on singup error', function(){
    var response={code :214};
    $scope.signUpError(response);
    expect($scope.emailExists).toBe(true);
  });

  it('should clear inputs on singup error', function(){
    var response={code :500};
    $scope.signUpError(response);
    expect($scope.emailExists).toBe(false);
  });

  it('should populate data to send', function(){
    $scope.emailValue = "test@test.com"
    $scope.signUp();
    expect($scope.formData.email.email).toBe("test@test.com");
  });

});