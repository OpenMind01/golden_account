// - -------------------------------------------------------------------- - //

describe("VerifyMobileController",function() {

  beforeEach(module("Bitgold"));
  beforeEach(module("bgMock"));

  var $scope, $element, Bitgold;
  beforeEach(inject(function($compile,$templateCache,$controller,$rootScope,bgMock) {
    $scope = $rootScope.$new();
    $element = $compile( $templateCache.get("tpl/views/verify_mobile.html") )($scope);
    Bitgold = bgMock;
    $controller("VerifyMobileController",{
      $scope: $scope,
      $element: $element,
      Bitgold: Bitgold,
    });
    $scope.$digest();
  }));

  beforeEach(function(done) {
    libz("phoneformat",done);
  });

  it("set mobile success",function() {
    assert.ok(!$scope.displayVerifyCode);
    Bitgold.api.updateProfile.callbackWith(null,{});
    $scope.phone = "+55 3288888888";
    $scope.$apply();
    $scope.setMobile();
    assert.ok(Bitgold.api.updateProfile.calledOnceWith({
      phone: "+55 3288888888",
    }));
    assert.ok($scope.displayVerifyCode);
  });

  it("set mobile invalid error",function() {
    assert.ok(!$scope.displayVerifyCode);
    Bitgold.api.updateProfile.callbackWith(null,{});
    $scope.phone = "+55328";
    $scope.$apply();
    $scope.setMobile();
    assert.ok(Bitgold.api.updateProfile.notCalled());
    assert.ok(!$scope.formSet.$valid);
    assert.ok($scope.formSet.phone.$error.valid);
    assert.ok(!$scope.displayVerifyCode);
  });

  it("set mobile empty error",function() {
    assert.ok(!$scope.displayVerifyCode);
    Bitgold.api.updateProfile.callbackWith(null,{});
    $scope.phone = null;
    $scope.$apply();
    $scope.setMobile();
    assert.ok(Bitgold.api.updateProfile.notCalled());
    assert.ok(!$scope.formSet.$valid);
    assert.ok($scope.formSet.phone.$error.required);
    assert.ok(!$scope.displayVerifyCode);
  });

  it("set mobile auth error",function() {
    assert.ok(!$scope.displayVerifyCode);
    Bitgold.api.updateProfile.callbackWith(new Error("403"));
    $scope.phone = "+55 3288888888";
    $scope.$apply();
    $scope.setMobile();
    assert.ok(Bitgold.api.updateProfile.calledOnceWith({
      phone: "+55 3288888888",
    }));
    assert.ok(!$scope.displayVerifyCode);
    assert.ok(Bitgold.session.path.calledOnceWith("/sign-in"));
  });

  it("verify mobile success",function() {
    Bitgold.api.verifyPhone.callbackWith(null,{});
    $scope.token = "1234";
    $scope.$apply();
    $scope.verifyMobile();
    assert.ok(Bitgold.api.verifyPhone.calledOnceWith("1234"));
    assert.ok(Bitgold.session.path.calledOnceWith("/basic-info"));
  });

  it("verify mobile empty error",function() {
    Bitgold.api.verifyPhone.callbackWith(null,{});
    $scope.token = "";
    $scope.$apply();
    $scope.verifyMobile();
    assert.ok(Bitgold.api.verifyPhone.notCalled());
  });

  it("verify mobile remote error",function() {
    Bitgold.api.verifyPhone.callbackWith(new Error("400"));
    $scope.token = "1234";
    $scope.$apply();
    $scope.verifyMobile();
    assert.ok(Bitgold.api.verifyPhone.calledOnceWith("1234"));
    assert.ok($scope.formVerify.$error.expired);
  });

  it("verify mobile resend code",function() {
    Bitgold.api.resendPhone.callbackWith(null,{});
    $scope.$apply();
    $scope.resendCode();
    assert.ok(Bitgold.api.resendPhone.calledOnce());
  });

});

// - -------------------------------------------------------------------- - //
