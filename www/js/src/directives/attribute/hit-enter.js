// - -------------------------------------------------------------------- - //

App.directive("hitEnter",function() {
  return {
    restrict: "A",
    link: function($scope,element,attrs,ctrl) {
      element.on("keydown",function(event) {
        var key = event.which;
        if (key === 13) {
          $scope.$eval(attrs.hitEnter);
          event.preventDefault();
        }
      });
    },
  };
});

// - -------------------------------------------------------------------- - //
