// - -------------------------------------------------------------------- - //

App.directive("addressInput",function(Bitgold) {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {
      contacts: "=",
      self: "=",
    },
    templateUrl: "tpl/directives/address_input.html",
    link: function($scope,element,attrs,ctrl) {

      function notSelf(address) {
        return $scope.self !== address;
      }

      function getAddress(text) {
        var match = text.match(/\<([a-zA-Z0-9]{34,35})\> *$/);
        if (match && match.length === 2) {
          return match[1];
        } else {
          return text;
        }
      }

      function getContact(address) {
        if ($scope.contacts instanceof Array) {
          var length = $scope.contacts.length;
          var found;
          for (var i = 0; i < length; i++) {
            var contact = $scope.contacts[i];
            if (contact.address === address) {
              found = contact;
              break;
            }
          }
          if (found) {
            if (found.name) {
              return found.name + " <" + found.address + ">";
            } else {
              return found.address;
            }
          }
        }
      }

      $scope.$watch(function() {
        return ctrl.$modelValue;
      },function(value) {
        if (!$scope.address.value || $scope.address.value.indexOf(value) === -1 || value === $scope.address.value) {
          var contact = getContact(value);
          if (contact) {
            $scope.address.value = contact;
          } else {
            $scope.address.value = value;
          }
        }
      });

      $scope.$watch(function() {
        if ($scope.address) {
          return $scope.address.value;
        }
      },function(value) {
        if (value) {
          var address = getAddress(value);
          ctrl.$setValidity("required",true);
          ctrl.$setValidity("valid",Bitgold.bitcoin.isAddress(address));
          ctrl.$setValidity("self",notSelf(address));
          ctrl.$setViewValue(address);
        } else {
          ctrl.$setValidity("required",!attrs.hasOwnProperty("required"));
          ctrl.$setValidity("valid",true);
          ctrl.$setValidity("self",true);
          ctrl.$setViewValue(undefined);
        }
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
