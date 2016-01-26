// - -------------------------------------------------------------------- - //

App.directive("timezoneInput",function() {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {},
    templateUrl: "tpl/directives/timezone_input.html",
    link: function($scope,element,attrs,ctrl) {

      $scope.timezone = {
        selected: null,
      };

      function isValid(timezone) {
        var valid = false;
        var zones = $scope.$root.lang.timezoneSelector.timezones;
        var length = zones.length;
        for (var i = 0; i < length; i++) {
          if (zones[i].zone === timezone) {
            valid = true;
            break;
          }
        }
        return valid;
      }

      var stopWatching = $scope.$watch(function() {
        return $scope.$root.timezone;
      },function(timezone) {
        if (timezone) {
          $scope.timezone.selected = timezone;
          stopWatching();
        }
      });

      $scope.$watch(function() {
        return $scope.timezone.selected;
      },function(timezone) {
        if (timezone) {
          ctrl.$setValidity("valid",isValid(timezone));
          ctrl.$setValidity("required",true);
        } else {
          ctrl.$setValidity("required",!attrs.hasOwnProperty("required"));
        }
        ctrl.$setViewValue(timezone);
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
