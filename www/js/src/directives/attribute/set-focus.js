// - -------------------------------------------------------------------- - //

App.directive("setFocus",function($timeout) {
  return {
    restrict: "A",
    require: "ngModel",
    scope: {
      setFocus: "=",
    },
    link: function($scope,$element,attrs) {
      $scope.$watch("setFocus",function(focus) {
        if (focus) {
          $timeout(function() {
            $element[0].focus();
          });
        }
      });
    },
  };
});


// - -------------------------------------------------------------------- - //
