// - -------------------------------------------------------------------- - //

App.controller("SignUpController",function($scope,Bitgold) {

  $scope.showError = function(error) {
    if (error.message === "409") {
      $scope.form.$setValidity("conflict",false);
    } else {
      alert(error.message);
    }
  };

  $scope.resetError = function() {
    $scope.form.$setValidity("conflict",true);
  };

  $scope.signUp = function() {
    if ($scope.form.$valid) {
      Bitgold.api.signUp({
        email: $scope.email,
        password: $scope.password,
      },function(error,data) {
        if (error) {
          $scope.showError(error);
        } else {
          Bitgold.session.path("/verify/email");
        }
      });
    }
  };

});

// - -------------------------------------------------------------------- - //
