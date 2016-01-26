// - -------------------------------------------------------------------- - //

App.directive("matchPassword",function() {
  return {
    restrict: "A",
    require: "ngModel",
    scope: {
        matchPassword: "=",
    },
    link: function($scope,element,attrs,ctrl) {
      $scope.$watch(function() {
        return $scope.matchPassword;
      },function(value) {
        var match = value && ctrl.$modelValue || ctrl.$$invalidModelValue === value;
        ctrl.$setValidity("match",match);
      });
      $scope.$watch(function() {
        return ctrl.$modelValue || ctrl.$$invalidModelValue;
      },function(value) {
        var match = value && $scope.matchPassword === value;
        ctrl.$setValidity("match",match);
      });
    },
  };
});

// - -------------------------------------------------------------------- - //
