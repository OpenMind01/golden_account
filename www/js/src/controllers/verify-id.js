// - -------------------------------------------------------------------- - //

App.controller("VerifyIdController",function($scope,Bitgold) {

  if (!angular.isObject(Bitgold.session._basicInfo)) {
    // Bitgold.session.path("/basic-info");
  }

  $scope.$watch("document",function(document) {
    if (document) {
      $scope.verifyId();
    }
  });

  $scope.verifyId = function() {
    var basic = Bitgold.session._basicInfo;
    basic.documentImageId = angular.isString($scope.document) ? $scope.document : "";
    Bitgold.api.validateIdentity(basic,function(error,data) {
      if (error) {
        $scope.showError(error);
      } else {
        delete Bitgold.session._basicInfo;
        Bitgold.session.path("/thank-you-for-sigining-up-to-bitgold");
      }
    });
  };

});

// - -------------------------------------------------------------------- - //
