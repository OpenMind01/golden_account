// - -------------------------------------------------------------------- - //

App.controller("BasicInfoController",function($scope,Bitgold) {

  $scope.showError = function(error) {
    if (error.message === "403") {
      Bitgold.session.path("/sign-in");
    } else {
      alert(error.message);
    }
  };

  $scope.resetError = function() {
    $scope.formBasicInfo.$setValidity("expired",true);
  };

  $scope.updateProfile = function() {
    if ($scope.formBasicInfo.$valid) {
      var profile = $scope.profile;
      Bitgold.api.updateProfile(profile,function(error,data) {
        if (error) {
          $scope.showError(error);
        } else {
          var basic = $scope.basic;
          basic.fullName = profile.firstName + " " + profile.lastName;
          Bitgold.session._basicInfo = basic;
          Bitgold.session.path("/verify/id");
        }
      });      
    }
  };

});

// - -------------------------------------------------------------------- - //
