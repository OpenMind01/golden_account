// - -------------------------------------------------------------------- - //

App.directive("outerClick",function() {
  return {
    restrict: "A",
    link: function($scope,element,attrs) {
      angular.element(document).on("click",function(event) {
        $scope.$eval(attrs.outerClick);
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });
      element.on("click",function(event) {
        event.stopPropagation();
      });
    },
  };
});

// - -------------------------------------------------------------------- - //
