// - -------------------------------------------------------------------- - //

App.directive("retina",function($window,$http) {
  return {
    restrict: "A",
    link: function($scope,element,attrs) {
      var suffix = "_2x";
      var checkForRetina = new RegExp("(.+)(" + suffix + "\\.\\w{3,4})");
      if ($window.devicePixelRatio >= 2) {
        var src = element.attr("src");
        if (src) {
          if (!checkForRetina.test(src)) {
            var retinaSrc = src.replace(/(.+)(\.\w{3,4})$/,"$1"+ suffix +"$2");
            $http.head(retinaSrc).success(function() {
              element.attr("src",retinaSrc);
            });
          }
        }
      }
    }
  }
});

// - -------------------------------------------------------------------- - //
