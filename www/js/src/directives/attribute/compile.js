// - -------------------------------------------------------------------- - //

App.directive("compile",function($compile) {
  return {
    restrict: "A",
    scope: {
      compile: "=",
    },
    link: function($scope,element,attrs) {
      $scope.$watch("compile",function(value) {
        if (value) {
          var contents = element.contents();
          $compile(contents)($scope.$parent);
        }
      });
    },
  };
});

// - -------------------------------------------------------------------- - //
