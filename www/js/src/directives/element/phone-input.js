// - -------------------------------------------------------------------- - //

App.directive("phoneInput",function($timeout) {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {
      country: "=?",
    },
    templateUrl: "tpl/directives/phone_input.html",
    link: function($scope,element,attrs,ctrl) {

      $scope.readonly = attrs.hasOwnProperty("readonly");

      initList();

      function initList() {
        var list = $scope.$root.lang.phoneInput.countryList;
        var length = list.length;
        for (var i = 0; i < length; i++) {
          var item = list[i];
          item.value = item.country + " (+" + item.code + ")";
        }
      }

      function findByCode(code,isCanada) {
        var value;
        var list = $scope.$root.lang.phoneInput.countryList;
        var length = list.length;
        for (var i = 0; i < length; i++) {
          var item = list[i];
          if (parseInt(item.code) === parseInt(code)) {
            if (!isCanada || item.key === "ca") {
              value = item.value;
              break;
            }
          }
        }
        return value;
      }

      function findByCountry(country) {
        var code;
        var list = $scope.$root.lang.phoneInput.countryList;
        var length = list.length;
        for (var i = 0; i < length; i++) {
          var item = list[i];
          if (item.key === country) {
            code = item.value;
            break;
          }
        }
        return code;
      }

      function getFlag(code,isCanada) {
        if (code) {
          var flag;
          var list = $scope.$root.lang.phoneInput.countryList;
          var length = list.length;
          for (var i = 0; i < length; i++) {
            var item = list[i];
            if (parseInt(item.code) === parseInt(code)) {
              if (!isCanada || item.key === "ca") {
                flag = item.key;
                break;
              }
            }
          }
          return flag;
        }
      }

      function parseCode(code) {
        code = code || "";
        code = code.match(/\((\+[0-9]+)\)$|^ *(\+?[0-9]+) *$/);
        code = code instanceof Array ? code[1] ? code[1] : code[0] : "";
        if (code.length > 0 && code.substr(0,1) != "+") {
          code = "+" + code;
        }
        return code;
      }

      // Selects default based on user location.
      var stopWatching = $scope.$watch(function() {
        return $scope.$root.location.countryCode;
      },function(countryCode) {
        if (countryCode) {
          countryCode = countryCode.toLowerCase();
          $scope.code.default = $scope.code.value = findByCountry(countryCode);
          stopWatching();
        }
      });

      // Updates flag when code changes.
      $scope.$watch(function() {
        return $scope.code.value;
      },function(code) {
        $scope.code.pure = parseCode(code);
        $scope.code.flag = getFlag($scope.code.pure,/canada/i.test(code));
        $scope.country = $scope.code.flag ? $scope.code.flag.toUpperCase() : undefined;
      });

      libz("phoneformat",function() {

        // Updates input fields if model value is changed.
        $scope.$watch(function() {
          return ctrl.$modelValue;
        },function(phone) {
          if (phoneformat.isValidNumber(phone)) {
            var parts = phone.split(" ");
            $scope.code.pure = parts.shift();
            $scope.code.value = findByCode($scope.code.pure,/canada/i.test($scope.code.value));
            $scope.number = parts.join("").replace(/[^0-9]/g,"");
            ctrl.$setValidity("valid",true);
          } else if (angular.isUndefined(phone) || phone === null) {
            $scope.code.value = $scope.code.default;
            $scope.number = undefined;
            ctrl.$setValidity("valid",!attrs.hasOwnProperty("required"));
          } else {
            ctrl.$setValidity("valid",false);
          }
        });

        // Validates the phone number and update the model value.
        $scope.$watch(function() {
          var code = parseCode($scope.code.pure) || "";
          var number = $scope.number || "";
          return code + " " + number;
        },function(phone) {
          if (phoneformat.isValidNumber(phone)) {
            ctrl.$setViewValue(phone);
            ctrl.$setValidity("valid",true);
          } else if (phone[phone.length - 1] === " ") {
            ctrl.$setViewValue("");
            ctrl.$setValidity("valid",!attrs.hasOwnProperty("required"));
          } else {
            ctrl.$setViewValue(phone);
            ctrl.$setValidity("valid",false);
          }
        });

      });

    },
  };
});

// - -------------------------------------------------------------------- - //
