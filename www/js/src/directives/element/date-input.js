// - -------------------------------------------------------------------- - //

App.directive("dateInput",function() {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {},
    templateUrl: "tpl/directives/date_input.html",
    link: function($scope,element,attrs,ctrl) {

      $scope.lang = $scope.$root.lang;
      $scope.label = attrs.label;

      $scope.date = {};

      function isValid(date) {
        var parts = angular.isString(date) ? date.split("-") : [];
        var day = parseInt(parts[2]);
        var month = parseInt(parts[1]) - 1;
        var year = parseInt(parts[0]);
        var time = new Date(year,month,day).getTime();
        var valid = !isNaN(time);
        if (valid) {
          if (month === 3 || month === 5 || month === 8 || month === 10) {
            if (day === 31) {
              valid = false;
            }
          } else if (month === 1) {
            if (day > 29) {
              valid = false;
            } else if (day === 29) {
              if (year % 4 > 0) {
                valid = false;
              }
            }
          }
        }
        return valid;
      }

      // Updates input when model changes.
      $scope.$watch(function() {
        return ctrl.$modelValue;
      },function(date) {
        var parts = angular.isString(date) ? date.split("-") : [];
        $scope.date.day = parts[2];
        $scope.date.month = parts[1];
        $scope.date.year = parts[0];
      });

      // Updates model when input changes.
      $scope.$watch(function() {
        var day = $scope.date.day || "";
        var month = $scope.date.month || "";
        var year = $scope.date.year || "";
        return year + "-" + month + "-" + day;
      },function(date) {
        if (date === "--") {
          ctrl.$setViewValue(undefined);
          ctrl.$setValidity("valid",!attrs.required);
        } else {
          ctrl.$setViewValue(date);
          ctrl.$setValidity("valid",isValid(date));
        }
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
