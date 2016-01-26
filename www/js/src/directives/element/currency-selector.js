// - -------------------------------------------------------------------- - //

App.directive("currencySelector",function($window,Bitgold) {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {},
    templateUrl: "tpl/directives/currency_selector.html",
    link: function($scope,element,attrs,ctrl) {

      $scope.btc = angular.isDefined(attrs.btc);
      $scope.search = angular.isDefined(attrs.search);

      $scope.currency = {
        selected: null,
      };

      // Updates selected currency when preferences changes.
      $scope.$watch(function() {
        return Bitgold.session.getPrefs("currency");
      },function(currency) {
        if (currency) {
          $scope.currency.selected = currency;
        }
      });

      // Gets selected currency from user's preferences.
      if (Bitgold.session.isAuthenticated()) {
        var currency = Bitgold.session.getPrefs("currency");
        if (currency) {
          $scope.currency.selected = currency;
        }
      }

      if (!$scope.currency.selected) {

        // Tries to load previously stored currency.
        var stored = $window.localStorage.getItem("selectedCurrency");
        if (angular.isString(stored)) {
          $scope.currency.selected = stored;
        } else {

          // Waits for geo ip.
          var stopWatching = $scope.$watch(function() {
            return $scope.$root.location.countryCode;
          },function(location) {
            if (location) {
              location = location.toLowerCase();
              Object.keys($scope.$root.lang.currencySelector.country).forEach(function(continent) {
                $scope.$root.lang.currencySelector.country[continent].forEach(function(country) {
                  if (country.key === location) {
                    $scope.currency.selected = country.currency;
                  }
                });
              });
              stopWatching();
            }
          });
        }
      }

      $scope.$watch(function() {
        return $scope.currency.selected;
      },function(currency) {
        if (currency) {
          $window.localStorage.setItem("selectedCurrency",currency);
        }
        ctrl.$setViewValue(currency);
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
