// - -------------------------------------------------------------------- - //

App.controller("VerifyMobileController",function($scope,Bitgold) {

  $scope.showSetError = function(error) {
    if (error.message === "403") {
      Bitgold.session.path("/sign-in");
    } else {
      alert(error.message);
    }
  };

  $scope.showVerifyError = function(error) {
    if (error.message === "400") {
      $scope.formVerify.$setValidity("expired",false);
    } else {
      alert(error.message);
    }
  };

  $scope.resetVerifyError = function() {
    $scope.formVerify.$setValidity("expired",true);
  };

  $scope.setMobile = function() {
    if ($scope.formSet.$valid) {
      Bitgold.api.updateProfile({ phone: $scope.phone },function(error,data) {
        if (error) {
          $scope.showSetError(error);
        } else {
          $scope.displayVerifyCode = true;
        }
      });
    }
  };

  $scope.verifyMobile = function() {
    if ($scope.formVerify.$valid) {
      Bitgold.api.verifyPhone($scope.token,function(error,data) {
        if (error) {
          $scope.showVerifyError(error);
        } else {
          Bitgold.session.path("/basic-info");
        }
      });
    }
  };

  $scope.resendCode = function() {
    Bitgold.api.resendPhone(function(error) {
      if (error) {
        $scope.showError(error);
      } else {
        // what do to?
      }
    });
  };

});

// - -------------------------------------------------------------------- - //
