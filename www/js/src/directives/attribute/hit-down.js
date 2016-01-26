// - -------------------------------------------------------------------- - //

App.directive("hitDown",function() {
  return {
    restrict: "A",
    link: function($scope,element,attrs) {
      element.on("keydown",function(event) {
        if (event.which === 40) {
          $scope.$eval(attrs.hitDown);
          event.preventDefault();
        }
      });
    },
  };
});

// - -------------------------------------------------------------------- - //
