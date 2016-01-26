// - -------------------------------------------------------------------- - //

App.directive("arrowNavigation",function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function($scope,element,attrs,ctrl) {
      element.on("keydown",function(event) {
        var key = event.which;
        var delta;
        if (key === 39 || key === 40) {
          delta = 1;
        } else if (key === 37 || key === 38) {
          delta = -1;
        }
        if (delta) {
          event.delta = delta;
          $scope.$eval(attrs.arrowNavigation,{ event: event });
          event.preventDefault();
        }
      });
    },
  };
});

// - -------------------------------------------------------------------- - //
