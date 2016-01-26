// - -------------------------------------------------------------------- - //

App.directive("locationInput",function($timeout) {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {
      country: "=?",
      flag: "=?",
    },
    templateUrl: "tpl/directives/location_input.html",
    link: function($scope,element,attrs,ctrl) {

      function getFlag(location) {
        var list = $scope.$root.lang.locationInput.locationList;
        var length = list.length;
        var found;
        for (var i = 0; i < length; i++) {
          var item = list[i];
          if (item.location === location) {
            found = item;
            break;
          }
        }
        return found;
      }

      // Updates model when location changes.
      $scope.$watch(function() {
        return $scope.location.value;
      },function(location) {
        if (location) {
          var flag = getFlag(location);
          $scope.flag = flag ? flag.flag : undefined;
          $scope.country = flag ? flag.country : undefined;
          $scope.location.flag = $scope.flag;
          ctrl.$setViewValue(location);
          ctrl.$setValidity("valid",!!flag);
          ctrl.$setValidity("required",true);
        } else {
          ctrl.$setValidity("valid",true);
          ctrl.$setValidity("required",!attrs.hasOwnProperty("required"));
        }
      });

      // Updates location when model changes.
      $scope.$watch(function() {
        return ctrl.$modelValue;
      },function(location) {
        if (location) {
          var flag = getFlag(location);
          $scope.flag = flag ? flag.flag : undefined;
          $scope.country = flag ? flag.country : undefined;
          $scope.location.value = location;
          $scope.location.flag = $scope.flag;
          ctrl.$setValidity("valid",!!flag);
          ctrl.$setValidity("required",true);
        } else {
          ctrl.$setValidity("valid",true);
          ctrl.$setValidity("required",!attrs.hasOwnProperty("required"));
        }
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
