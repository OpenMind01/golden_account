// - -------------------------------------------------------------------- - //

App.directive("labelInput",function() {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {},
    templateUrl: "tpl/directives/label_input.html",
    link: function($scope,element,attrs,ctrl) {

      $scope.label = {};

      $scope.$watch(function() {
        return ctrl.$modelValue;
      },function(label) {
        $scope.label.value = label;
        $scope.label.new = label;
      });

      $scope.$watch(function() {
        return $scope.label.value;
      },function(label) {
        ctrl.$setViewValue(label);
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
