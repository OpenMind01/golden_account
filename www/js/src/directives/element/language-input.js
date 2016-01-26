// - -------------------------------------------------------------------- - //

App.directive("languageInput",function() {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {},
    templateUrl: "tpl/directives/language_input.html",
    link: function($scope,element,attrs,ctrl) {

      $scope.language = {
        selected: null,
      };

      function isValid(language) {
        var valid = false;
        var langs = $scope.$root.lang.languageSelector.languages;
        var length = langs.length;
        for (var i = 0; i < length; i++) {
          if (langs[i].name === language) {
            valid = true;
            break;
          }
        }
        return valid;
      }

      var stopWatching = $scope.$watch(function() {
        return $scope.$root.language;
      },function(language) {
        if (language) {
          $scope.language.selected = language;
          stopWatching();
        }
      });

      $scope.$watch(function() {
        return $scope.language.selected;
      },function(language) {
        if (language) {
          ctrl.$setValidity("valid",isValid(language));
          ctrl.$setValidity("required",true);
        } else {
          ctrl.$setValidity("required",!attrs.hasOwnProperty("required"));
        }
        ctrl.$setViewValue(language);
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
