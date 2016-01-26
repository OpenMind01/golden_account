// - -------------------------------------------------------------------- - //

App.directive("copyButton",function() {
  return {
    restrict: "A",
    scope: {
      copyButton: "=",
    },
    link: function($scope,element,attrs) {
      libz("ZeroClipboard",function() {
        ZeroClipboard.config({ swfPath: "flash/ZeroClipboard.swf" });
        var client = new ZeroClipboard(element[0]);
      });
      $scope.$watch("copyButton",function(copy) {
        element.attr("data-clipboard-text",copy);
      });
    },
  };
});

// - -------------------------------------------------------------------- - //
