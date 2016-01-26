// - -------------------------------------------------------------------- - //

App.directive("strengthBar",function($rootScope) {
  return {
    restrict: "E",
    templateUrl: "tpl/directives/strength_bar.html",
    scope: {
      field: "=",
    },
    link: function($scope,element,attrs,ctrl) {
      $scope.lang = $rootScope.lang;
    },
  };
});

// - -------------------------------------------------------------------- - //
