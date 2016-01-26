// - -------------------------------------------------------------------- - //

describe("VerifyEmailController",function() {

  beforeEach(module("Bitgold"));
  beforeEach(module("bgMock"));

  it("verify email success",function() {
    var $scope, $element, Bitgold;
    inject(function($compile,$templateCache,$controller,$rootScope,bgMock) {
      $scope = $rootScope.$new();
      $element = $compile( $templateCache.get("tpl/views/verify_email.html") )($scope);
      Bitgold = bgMock;
      Bitgold.session.isAuthenticated.returns(true);
      Bitgold.api.verifyEmail.callbackWith(null,{});
      $controller("VerifyEmailController",{
        $scope: $scope,
        $element: $element,
        Bitgold: Bitgold,
        $routeParams: { token: "5250f90f54b146e485e94db6112f7951" },
      });
      $scope.$digest();
    });
    assert.ok(Bitgold.api.verifyEmail.calledOnceWith("5250f90f54b146e485e94db6112f7951"));
    assert.ok(Bitgold.session.path.calledOnceWith("/sign-in/email-verified"));
  });

  it("verify email expired",function() {
    var $scope, $element, Bitgold;
    inject(function($compile,$templateCache,$controller,$rootScope,bgMock) {
      $scope = $rootScope.$new();
      $element = $compile( $templateCache.get("tpl/views/verify_email.html") )($scope);
      Bitgold = bgMock;
      Bitgold.session.isAuthenticated.returns(false);
      $controller("VerifyEmailController",{
        $scope: $scope,
        $element: $element,
        Bitgold: Bitgold,
        $routeParams: {},
      });
      $scope.$digest();
    });
    assert.ok(Bitgold.session.path.calledOnceWith("/sign-in/email-expired"));
  });

  it("verify email resend",function() {
    var $scope, $element, Bitgold;
    inject(function($compile,$templateCache,$controller,$rootScope,bgMock) {
      $scope = $rootScope.$new();
      $element = $compile( $templateCache.get("tpl/verify_email.html") )($scope);
      Bitgold = bgMock;
      Bitgold.session.isAuthenticated.returns(true);
      $controller("VerifyEmailController",{
        $scope: $scope,
        $element: $element,
        Bitgold: Bitgold,
        $routeParams: {},
      });
      $scope.$digest();
    });
    Bitgold.api.resendEmail.callbackWith(null,{});
    $scope.resendEmail();
    assert.ok(Bitgold.api.resendEmail.calledOnce());
  });

});

// - -------------------------------------------------------------------- - //
