// - -------------------------------------------------------------------- - //

describe("SignInController",function() {

  beforeEach(module("Bitgold"));
  beforeEach(module("bgMock"));

  var $scope, $element, Bitgold;
  beforeEach(inject(function($compile,$templateCache,$controller,$rootScope,bgMock) {
    $scope = $rootScope.$new();
    $element = $compile( $templateCache.get("tpl/views/sign_in.html") )($scope);
    Bitgold = bgMock;
    $controller("SignInController",{
      $scope: $scope,
      $element: $element,
      Bitgold: Bitgold,
    });
    $scope.$digest();
  }));

  it("success",function() {
    Bitgold.api.signIn.callbackWith(null,{
      phoneVerified: true,
      emailVerified: true,
      firstName: "first",
      lastName: "last",
    });
    $scope.email = "test@test.com";
    $scope.password = "#@!321EWQewq";
    $scope.$apply();
    $scope.signIn();
    assert.ok(Bitgold.api.signIn.calledOnceWith({
      email: "test@test.com",
      password: "#@!321EWQewq",
    }));
    assert.ok(Bitgold.session.path.calledOnceWith("/"));
  });

  it("success verify email",function() {
    Bitgold.api.signIn.callbackWith(null,{
      phoneVerified: false,
      emailVerified: false,
    });
    $scope.email = "test@test.com";
    $scope.password = "#@!321EWQewq";
    $scope.$apply();
    $scope.signIn();
    assert.ok(Bitgold.api.signIn.calledOnce());
    assert.ok(Bitgold.session.path.calledOnceWith("/verify/email"));
  });

  it("success verify phone",function() {
    Bitgold.api.signIn.callbackWith(null,{
      phoneVerified: false,
      emailVerified: true,
    });
    $scope.email = "test@test.com";
    $scope.password = "#@!321EWQewq";
    $scope.$apply();
    $scope.signIn();
    assert.ok(Bitgold.api.signIn.calledOnce());
    assert.ok(Bitgold.session.path.calledOnceWith("/verify/mobile"));
  });

  it("success basic-info",function() {
    Bitgold.api.signIn.callbackWith(null,{
      phoneVerified: true,
      emailVerified: true,
    });
    $scope.email = "test@test.com";
    $scope.password = "#@!321EWQewq";
    $scope.$apply();
    $scope.signIn();
    assert.ok(Bitgold.api.signIn.calledOnce());
    assert.ok(Bitgold.session.path.calledOnceWith("/basic-info"));
  });

  it("error invalid",function() {
    $scope.email = "invalid email";
    $scope.password = null;
    $scope.$apply();
    $scope.signIn();
    assert.ok(Bitgold.api.signIn.notCalled());
    assert.ok(!$scope.form.$valid);
    assert.ok(!$scope.form.email.$valid);
    assert.ok(!$scope.form.password.$valid);
  });

  it("error wrong",function() {
    Bitgold.api.signIn.callbackWith(new Error("401"));
    $scope.email = "test@test.com";
    $scope.password = "#@!321EWQewq";
    $scope.$apply();
    $scope.signIn();
    assert.ok(Bitgold.api.signIn.calledOnce());
    assert.ok($scope.form.$invalid);
    assert.ok($scope.form.$error.wrong);
    $scope.resetError();
    assert.ok(!$scope.form.$error.wrong);
  });

});

// - -------------------------------------------------------------------- - //
