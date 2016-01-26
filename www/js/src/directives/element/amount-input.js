// - -------------------------------------------------------------------- - //

App.directive("amountInput",function($timeout) {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {
      input: "=?",
    },
    templateUrl: "tpl/directives/amount_input.html",
    link: function($scope,element,attrs,ctrl) {

      // Prevents anything except number / decimal separator.
      element.find("input").on("keypress",function(ev) {
        var char = String.fromCharCode(ev.which);
        if (!/[0-9]/.test(char)) {
          if (/[\,\.]/.test(this.value)) {
            ev.preventDefault();
          } else if (!/[\.\,]/.test(char)) {
            ev.preventDefault();
          }
        }
      });

      // Calculates amount from currency value.
      function calcAmount(value) {
        var currency = $scope.currency;
        if (currency) {
          if ($scope.$root.exchange[currency]) {
            var rate = $scope.$root.exchange[currency].BTC;
            if (angular.isString(value)) {
              value = parseFloat(value.replace(/\,/,"."));
            }
            if (angular.isNumber(rate) && angular.isNumber(value)) {
              var amount = value / rate;
              amount = amount.toFixed(5);
              amount = parseFloat(amount);
              return amount;
            }
          }
        }
      }

      // Calculates currency value from amount.
      function calcValue(amount,decimal) {
        var currency = $scope.currency;
        if (currency) {
          if ($scope.$root.exchange[currency]) {
            var rate = $scope.$root.exchange[currency].BTC;
            if (angular.isNumber(rate) && angular.isNumber(amount)) {
              var value = amount * rate;
              value = value.toFixed(decimal);
              return value;
            }
          }
        }
      }

      $scope.$watch("value",function(value) {
        var amount = calcAmount(value);
        var valid = angular.isNumber(amount);
        ctrl.$setValidity("valid",valid);
        ctrl.$setValidity("min",amount > 0.00001);
        ctrl.$setViewValue(amount);
        $scope.input = {
          currency: $scope.currency,
          value: $scope.value,
        };
      });

      $scope.$watch(function() {
        return ctrl.$modelValue;
      },function(amount) {
        var decimal = (($scope.value || "").split(/[\,\.]/)[1] || "").length;
        var value = calcValue(amount,decimal);
        $scope.value = value;
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
