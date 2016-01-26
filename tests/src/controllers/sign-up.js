// - -------------------------------------------------------------------- - //

describe("SignUpController",function() {

  beforeEach(module("Bitgold"));
  beforeEach(module("bgMock"));

  var $scope, $element, Bitgold;
  beforeEach(inject(function($compile,$templateCache,$controller,$rootScope,bgMock) {
    $scope = $rootScope.$new();
    $element = $compile( $templateCache.get("tpl/views/sign_up.html") )($scope);
    Bitgold = bgMock;
    $controller("SignUpController",{
      $scope: $scope,
      $element: $element,
      Bitgold: Bitgold,
    });
    $scope.$digest();
  }));

  it("success",function() {
    Bitgold.api.signUp.callbackWith(null,{});
    $scope.email = "test@test.com";
    $scope.password = "#@!321EWQewq";
    $scope.repeatPassword = "#@!321EWQewq";
    $scope.terms = true;
    $scope.$apply();
    $scope.signUp();
    assert.ok(Bitgold.api.signUp.calledOnceWith({
      email: "test@test.com",
      password: "#@!321EWQewq",
    }));
    assert.ok(Bitgold.session.path.calledOnceWith("/verify/email"));
  });

  it("error conflict",function() {
    assert.ok(!$scope.success);
    Bitgold.api.signUp.callbackWith(new Error("409"));
    $scope.email = "test@test.com";
    $scope.password = "#@!321EWQewq";
    $scope.repeatPassword = "#@!321EWQewq";
    $scope.terms = true;
    $scope.$apply();
    $scope.signUp();
    assert.ok(Bitgold.api.signUp.calledOnceWith({
      email: "test@test.com",
      password: "#@!321EWQewq",
    }));
    assert.ok($scope.form.$error.conflict);
    assert.ok(!$scope.success);
  });

  it("error terms",function() {
    assert.ok(!$scope.success);
    Bitgold.api.signUp.callbackWith(null,{});
    $scope.email = "test@test.com";
    $scope.password = "#@!321EWQewq";
    $scope.repeatPassword = "#@!321EWQewq";
    $scope.terms = false;
    $scope.$apply();
    $scope.signUp();
    assert.ok(Bitgold.api.signUp.notCalled());
    assert.ok(!$scope.form.$valid);
    assert.ok(!$scope.form.terms.$valid);
    assert.ok(!$scope.success);
  });

  it("error password repeat",function() {
    assert.ok(!$scope.success);
    Bitgold.api.signUp.callbackWith(null,{});
    $scope.email = "test@test.com";
    $scope.password = "#@!321EWQewq";
    $scope.repeatPassword = "#";
    $scope.terms = true;
    $scope.$apply();
    $scope.signUp();
    assert.ok(Bitgold.api.signUp.notCalled());
    assert.ok(!$scope.form.$valid);
    assert.ok(!$scope.form.repeatPassword.$valid);
    assert.ok(!$scope.success);
  });

  it("error password strength",function() {
    assert.ok(!$scope.success);
    Bitgold.api.signUp.callbackWith(null,{});
    $scope.email = "test@test.com";
    $scope.password = "#@!321EWQ";
    $scope.repeatPassword = "#@!321EWQ";
    $scope.terms = true;
    $scope.$apply();
    $scope.signUp();
    assert.ok(Bitgold.api.signUp.notCalled());
    assert.ok(!$scope.form.$valid);
    assert.ok(!$scope.form.password.$valid);
    assert.ok(!$scope.form.password.strength.veryStrong);
    assert.ok(!$scope.success);
  });

  it("error invalid",function() {
    assert.ok(!$scope.success);
    Bitgold.api.signUp.callbackWith(null,{});
    $scope.email = "test";
    $scope.password = "#";
    $scope.repeatPassword = "#";
    $scope.terms = true;
    $scope.$apply();
    $scope.signUp();
    assert.ok(Bitgold.api.signUp.notCalled());
    assert.ok(!$scope.form.$valid);
    assert.ok(!$scope.form.email.$valid);
    assert.ok(!$scope.form.password.$valid);
    assert.ok(!$scope.success);
  });

});

// - -------------------------------------------------------------------- - //
