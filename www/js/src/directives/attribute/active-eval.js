// - -------------------------------------------------------------------- - //

App.directive("activeEval",function($location) {
  return {
    restrict: "A",
    link: function($scope,element,attrs) {
      function checkLink() {
        var path = $location.path();
        var href = element.attr("href").substr(1);
        if (path === href || path.indexOf(href + "/") > -1) {
          $scope.$eval(attrs.activeEval);
        }
      }
      checkLink();
      $scope.$on("$locationChangeSuccess",checkLink);
    },
  };
});

// - -------------------------------------------------------------------- - //
