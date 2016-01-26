// - -------------------------------------------------------------------- - //

App.directive("focusSelect",function($timeout) {
  return {
    restrict: "A",
    link: function($scope,element,attrs) {
      element.on("focus",function(event) {
        $timeout(function() {
          element[0].setSelectionRange(0,element[0].value.length);
        },75);
      });
    },
  };
});

// - -------------------------------------------------------------------- - //
