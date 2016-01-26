// - -------------------------------------------------------------------- - //

App.directive("methodInput",function($timeout) {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {
      country: "=?",
      flag: "=?",
    },
    templateUrl: "tpl/directives/method_input.html",
    link: function($scope,element,attrs,ctrl) {

      function isValid(method) {
        var valid = false;
        var methods = $scope.$root.lang.methodInput.methodList;
        var length = methods.length;
        for (var i = 0; i < length; i++) {
          var item = methods[i];
          if (item.method = method) {
            valid = true;
            break;
          }
        }
        return valid;
      }

      // Updates model when method changes.
      $scope.$watch(function() {
        return $scope.method.value;
      },function(method) {
        if (method) {
          ctrl.$setViewValue(method);
          ctrl.$setValidity("valid",isValid(method));
          ctrl.$setValidity("required",true);
        } else {
          ctrl.$setValidity("valid",true);
          ctrl.$setValidity("required",!attrs.hasOwnProperty("required"));
        }
      });

      // Updates method when model changes.
      $scope.$watch(function() {
        return ctrl.$modelValue;
      },function(method) {
        if (method) {
          $scope.method.value = method;
          ctrl.$setValidity("valid",isValid(method));
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
