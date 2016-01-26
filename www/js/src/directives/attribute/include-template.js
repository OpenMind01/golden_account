// - -------------------------------------------------------------------- - //

App.directive("includeTemplate",function($http,$templateCache,$compile,$rootScope) {
  return function($scope,element,attrs) {
    var template = attrs.includeTemplate;
    $http.get(template, { cache: $templateCache }).success(function(response) {
      var contents = element.html(response).contents();
      var scope;
      if (attrs.scope === "parent") {
        scope = $scope.$parent;
      } else {
        if ($scope.$parent) {
          if ($scope.$parent.$parent) {
            scope = $scope;
          } else {
            scope = $scope.$parent;
          }
        } else if ($scope) {
          scope = $scope;
        }
      }
      $compile(contents)(scope);
    });
  };
});

// - -------------------------------------------------------------------- - //
