// - -------------------------------------------------------------------- - //

App.directive("emailInput",function(Bitgold) {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {
      contacts: "=",
    },
    templateUrl: "tpl/directives/email_input.html",
    link: function($scope,element,attrs,ctrl) {

      function isEmail(email) {
        var valid = true;
        return valid;
      }

      function findByAddress(address) {
        var email;
        var contacts = $scope.contacts || [];
        var length = contacts.length;
        for (var i = 0; i < length; i++) {
          if (contacts[i].address === address) {
            email = contacts[i].email;
            break;
          }
        }
        return email;
      }

      $scope.$watch(function() {
        return ctrl.$modelValue;
      },function(value) {
        if (Bitgold.bitcoin.isAddress(value)) {
          $scope.email.value = findByAddress(value);
        } else {
          $scope.email.value = value;
        }
      });

      $scope.$watch(function() {
        if ($scope.email) {
          return $scope.email.value;
        }
      },function(email) {
        if (email) {
          ctrl.$setValidity("valid",isEmail(email));
          ctrl.$setViewValue(email);
        } else {
          ctrl.$setValidity("valid",!attrs.required);
          ctrl.$setViewValue(undefined);
        }
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
