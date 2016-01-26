// - -------------------------------------------------------------------- - //

App.directive("countryInput",function($timeout) {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {},
    templateUrl: "tpl/directives/country_input.html",
    link: function($scope,element,attrs,ctrl) {

      $scope.readonly = attrs.hasOwnProperty("readonly");

      function findByCode(country) {
        var code;
        var list = $scope.$root.lang.phoneInput.countryList;
        var length = list.length;
        for (var i = 0; i < length; i++) {
          var item = list[i];
          if (item.key === country) {
            code = item.country;
            break;
          }
        }
        return code;
      }

      function findByName(country) {
        var found;
        var list = $scope.$root.lang.phoneInput.countryList;
        var length = list.length;
        for (var i = 0; i < length; i++) {
          var item = list[i];
          if (item.country === country) {
            found = item.key;
            break;
          }
        }
        return found;
      }

      // Selects default based on user location.
      var stopWatching = $scope.$watch(function() {
        return $scope.$root.location.countryCode;
      },function(countryCode) {
        if (countryCode) {
          countryCode = countryCode.toLowerCase();
          $scope.country.default = $scope.country.value = findByCode(countryCode);
          stopWatching();
        }
      });

      // Updates model when country changes.
      $scope.$watch(function() {
        return $scope.country.value;
      },function(country) {
        var code = findByName(country);
        $scope.country.flag = code;
        ctrl.$setViewValue(code ? code.toUpperCase() : undefined);
        ctrl.$setValidity("valid",!!code);
      });

      // Updates country when model changes.
      $scope.$watch(function() {
        return ctrl.$modelValue;
      },function(code) {
        var country = findByCode(code ? code.toLowerCase() : undefined);
        $scope.country.value = country;
        $scope.country.flag = code ? code.toLowerCase() : undefined;
        ctrl.$setValidity("valid",!!country);
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
