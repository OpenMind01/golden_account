// - -------------------------------------------------------------------- - //

App.directive("currencyInput",function() {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {},
    templateUrl: "tpl/directives/currency_input.html",
    link: function($scope,element,attrs,ctrl) {

      $scope.currency = {
        selected: null,
      };

      function getFlags(currency) {
        var continents = Object.keys($scope.$root.lang.currencySelector.country);
        var continentsLength = continents.length;
        var flags = [];
        CONTINENTS: for (var i = 0; i < continentsLength; i++) {
          var continent = continents[i];
          var countries = $scope.$root.lang.currencySelector.country[continent];
          var countriesLength = countries.length;
          COUNTRIES: for (var g = 0; g < countriesLength; g++) {
            var country = countries[g];
            if (country.currency === currency) {
              flags.push(country.key);
              break CONTINENTS;
            }
          }
        }
        return flags;
      }

      function isValid(currency) {
        return !!$scope.$root.lang.currencySymbol[currency];
      }

      var stopWatching = $scope.$watch(function() {
        return $scope.$root.currency;
      },function(currency) {
        if (currency) {
          $scope.currency.selected = currency;
          var flags = getFlags(currency);
          if ($scope.currency.flag) {
            if (flags.indexOf($scope.currency.flag) === -1) {
              $scope.currency.flag = flags[0];
            }
          } else {
            $scope.currency.flag = flags[0];
          }
          stopWatching();
        }
      });

      $scope.$watch(function() {
        return $scope.currency.selected;
      },function(currency) {
        if (currency) {
          var flags = getFlags(currency);
          if ($scope.currency.flag) {
            if (flags.indexOf($scope.currency.flag) === -1) {
              $scope.currency.flag = flags[0];
            }
          } else {
            $scope.currency.flag = flags[0];
          }
          ctrl.$setValidity("valid",isValid(currency));
          ctrl.$setValidity("required",true);
        } else {
          $scope.currency.flag = undefined;
          ctrl.$setValidity("valid",!attrs.required);
          ctrl.$setValidity("required",!attrs.required);
        }
        ctrl.$setViewValue(currency);
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
