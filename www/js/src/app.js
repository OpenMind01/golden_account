// -------------------------------------------------------------------- - //

var App = angular.module("Bitgold",["bgTemplates","ngTouch","ngRoute","ngSanitize"]);

App.run(function($rootScope,Language,Bitgold) {
  $rootScope.lang = Language;
  $rootScope.currency = "USD";
  $rootScope.language = "english";
  $rootScope.exchange = Bitgold.exchange;
  $rootScope.location = Bitgold.location;

  $rootScope.$watchCollection(function() {
    return Bitgold.session.getProfile();
  },function(profile) {
    $rootScope.profile = profile;
  });

  $rootScope.timezone = (function() {
    var offset = new Date().getTimezoneOffset();
    var minutes = offset % 60;
    if (minutes < 10) minutes = "0" + minutes;
    var sign = offset < 0 ? "+" : "-";
    var hours = (offset - minutes) / 60;
    if (hours < 10) hours = "0" + hours;
    return sign + hours + ":" + minutes;
  })();

  $rootScope.$watch(function() {
    return Bitgold.session.getPrefs("timezone");
  },function(timezone) {
    if (timezone) {
      $rootScope.timezone = timezone;
    }
  });
});

// - -------------------------------------------------------------------- - //
