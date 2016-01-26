// - -------------------------------------------------------------------- - //

App.directive("stateInput",function($timeout) {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {
      country: "@",
    },
    templateUrl: "tpl/directives/state_input.html",
    link: function($scope,element,attrs,ctrl) {

      // Prevents anything except number / decimal separator.
      element.find("input").on("keypress",function(ev) {
        var char = String.fromCharCode(ev.which);
        if (/[a-z]/.test(char)) {
        }
      });

      $scope.state = {};

      // State codes for validation.
      var states = {
        US: [
          "AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","ID",
          "IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO",
          "MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA",
          "RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
        ],
        CA: [
          "AB","BC","LB","MB","NB","NF","NS","NU","NW","ON","PE","QC","SK","YU",
        ],
      };

      // Validates the state code.
      function isValid(state,country) {
        if (angular.isString(state)) {
          if (state.length === 2) {
            if (angular.isString(country)) {
              var codes = states[country.toUpperCase()];
              if (angular.isArray(codes)) {
                if (codes.indexOf(state) > -1) {
                  return true;
                }
              } else {
                return true;
              }
            }
          }
        }
        return false;
      }

      // Updates model when state changes.
      $scope.$watch(function() {
        return $scope.country;
      },function(country) {
        ctrl.$setValidity("valid",isValid($scope.state.value,country));
      });

      // Updates model when state changes.
      $scope.$watch(function() {
        return $scope.state.value;
      },function(state) {
        state = state ? state.toUpperCase() : undefined;
        ctrl.$setViewValue(state);
        ctrl.$setValidity("valid",isValid(state,$scope.country));
      });

      // Updates state when model changes.
      $scope.$watch(function() {
        return ctrl.$modelValue;
      },function(state) {
        state = state ? state.toUpperCase() : undefined;
        $scope.state.value = state;
        ctrl.$setValidity("valid",isValid(state,$scope.country));
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
