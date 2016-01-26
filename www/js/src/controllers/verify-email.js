// - -------------------------------------------------------------------- - //

App.controller("VerifyEmailController",function($scope,$routeParams,Bitgold) {

  $scope.token = $routeParams.token;

  if ($scope.token) {
    Bitgold.api.verifyEmail($scope.token,function(error,data) {
      if (error) {
        Bitgold.session.path("/sign-in/email-expired");
      } else {
        Bitgold.session.path("/sign-in/email-verified");
      }
    });
  } else if (!Bitgold.session.isAuthenticated()) {
    Bitgold.session.path("/sign-in/email-expired");
  }

  $scope.resendEmail = function() {
    Bitgold.api.resendEmail($scope.email,function(error) {
      if (error) {
        Bitgold.session.path("/sign-in/email-expired");
      }
    });
  };

});

// - -------------------------------------------------------------------- - //
