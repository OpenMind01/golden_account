// - -------------------------------------------------------------------- - //

App.directive("hitUp",function() {
  return {
    restrict: "A",
    link: function($scope,element,attrs) {
      element.on("keydown",function(event) {
        if (event.which === 38) {
          $scope.$eval(attrs.hitUp);
          event.preventDefault();
        }
      });
    },
  };
});

// - -------------------------------------------------------------------- - //
