// - -------------------------------------------------------------------- - //

App.controller("SignInController",function($scope,Bitgold,$routeParams) {

  $scope.emailVerified = $routeParams.message === "email-verified";

  $scope.resetError = function() {
    $scope.form.$setValidity("wrong",true);
  };

  $scope.showError = function(error) {
    if (error.message === "401") {
      $scope.form.$setValidity("wrong",false);
    } else {
      alert("Unexpected error: " + error.message);
    }
  };

  $scope.signIn = function() {
    if ($scope.form.$valid) {
      Bitgold.api.signIn({
        email: $scope.email,
        password: $scope.password,
      },function(error,data) {
        if (error) {
          $scope.showError(error);
        } else {
          var basicInfo = data.dateOfBirth > 0 && /\w+/.test(data.firstName || "") && /\w+/.test(data.lastName || "");
          if (basicInfo && data.phoneVerified && data.emailVerified) {
            Bitgold.session.path("/");
          } else if (data.phoneVerified && data.emailVerified) {
            Bitgold.session.path("/basic-info");
          } else if (data.emailVerified) {
            Bitgold.session.path("/verify/mobile");
          } else {
            Bitgold.session.path("/verify/email");
          }
        }
      });
    }
  };

});

// - -------------------------------------------------------------------- - //
