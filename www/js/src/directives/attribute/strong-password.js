// - -------------------------------------------------------------------- - //

App.directive("strongPassword",function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope,element,attrs,ctrl) {
      ctrl.strength = {};
      scope.$watch(function() {
        return ctrl.$modelValue || ctrl.$$invalidModelValue || "";
      },function(password) {

        var hasLowercase = /[a-z]+/.test(password);
        var hasUppercase = /[A-Z]+/.test(password);
        var hasNumber = /[0-9]+/.test(password);
        // var hasSymbol = /[ \`\~\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\\\|\:\;\"\'\<\>\,\.\?\/]+/.test(password);
        var hasSymbol = true;
        var hasLength = password.length >= 8;

        var strengthLevel = 0;
        if (hasLength) {
          strengthLevel++;
          hasUppercase && hasLowercase && (strengthLevel += 2);
          hasNumber && strengthLevel++;
          // hasSymbol && strengthLevel++;
        } else if (hasUppercase || hasLowercase || hasNumber) {
          strengthLevel++;
        }

        ctrl.strength.level = strengthLevel;
        ctrl.strength.veryWeak = strengthLevel === 1;
        ctrl.strength.weak = strengthLevel === 2;
        ctrl.strength.strong = strengthLevel === 3;
        ctrl.strength.veryStrong = strengthLevel === 4;

        ctrl.strength.hasLength = hasLength;
        ctrl.strength.hasMixed = hasLowercase && hasUppercase;
        ctrl.strength.hasNumber = hasNumber;
        ctrl.strength.hasSymbol = hasSymbol;

        ctrl.$setValidity("strength",strengthLevel === 4);

      });
    },
  };
});


// - -------------------------------------------------------------------- - //
