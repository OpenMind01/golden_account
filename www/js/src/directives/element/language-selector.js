// - -------------------------------------------------------------------- - //

App.directive("languageSelector",function($window) {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {},
    templateUrl: "tpl/directives/language_selector.html",
    link: function($scope,element,attrs,ctrl) {

      $scope.language = {
        default: null,
        selected: null,
      };

      // Updates selected language when preferences changes.
      $scope.$watch(function() {
        return Bitgold.session.getPrefs("language");
      },function(language) {
        if (language) {
          $scope.language.selected = language;
        }
      });

      // Gets selected language from user's preferences.
      if (Bitgold.session.isAuthenticated()) {
        var language = Bitgold.session.getPrefs("language");
        if (language) {
          $scope.language.selected = language;
        }
      }

      if (!$scope.language.selected) {

        // Tries to load previously stored language.
        var stored = $window.localStorage.getItem("selectedLanguage");
        if (angular.isString(stored)) {
          $scope.language.selected = stored;
        } else {

          // Waits for geo ip.
          var stopWatching = $scope.$watch(function() {
            return $scope.$root.location.countryCode;
          },function(location) {
            if (location) {
              location = location.toLowerCase();
              var match = [];
              $scope.$root.lang.languageSelector.languages.forEach(function(item) {
                item.countries.forEach(function(country) {
                  if (country === location) {
                    match.push(item.name);
                  }
                });
              });
              if (match.length > 0) {
                if (match.length > 1) {
                  var hasEnglish;
                  match.forEach(function(lang) {
                    if (lang === "English") {
                      $scope.language.selected = lang;
                    }
                  });
                  if (!hasEnglish) {
                    $scope.language.selected = match[0];
                  }
                } else {
                  $scope.language.selected = match[0];
                }
                stopWatching();
              }
            }
          });
        }
      }

      // Updates model when selected language changes.
      $scope.$watch(function() {
        return $scope.language.selected;
      },function(language) {
        if (language) {
          $window.localStorage.setItem("selectedLanguage",language);
        }
        ctrl.$setViewValue(language);
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
