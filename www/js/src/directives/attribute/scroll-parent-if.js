// - -------------------------------------------------------------------- - //

App.directive("scrollParentIf",function() {
  return {
    restrict: "A",
    link: function($scope,element,attrs) {
      $scope.$watch(function() {
        return $scope.$eval(attrs.scrollParentIf);
      },function(scroll) {
        if (scroll) {
          var top = element[0].offsetTop;
          var parent = element.parent()[0];
          var height = parseInt(parent.offsetHeight / 3);
          parent.scrollTop = Math.max(0,top - height);
        }
      });
    },
  };
});

// - -------------------------------------------------------------------- - //
