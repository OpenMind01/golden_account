// - -------------------------------------------------------------------- - //

App.filter("formatDate",function($rootScope) {

  return function(input) {
    if (angular.isString(input)) {
      var parts = input.split("T").shift().split("-");
      var month = $rootScope.lang.dateFormat.month.short[parts[1]];
      var day = parts[2];
      var year = parts[0];
      return month + " " + day + ", " + year;
    } else {
      return "";
    }
  };

});

// - -------------------------------------------------------------------- - //
