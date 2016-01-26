// - -------------------------------------------------------------------- - //

App.directive("modal",function() {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {
      show: "=",
    },
    transclude: true,
    templateUrl: "tpl/directives/modal.html",
    link: function($scope,element,attrs,ctrl,transcludeFn) {

      var overlay = angular.element(document.getElementById("modal-overlay"));
      var container = element.children().eq(0);
      container.append(transcludeFn($scope.$parent,function() {}));

      function close() {
        ctrl.$setViewValue(false);
        overlay.removeClass("active");
        container.removeClass("active");
        overlay.off("click",close);
      }

      $scope.$watch(function() {
        return ctrl.$modelValue;
      },function(show) {
        if (show) {
          overlay.addClass("active");
          container.addClass("active");
          if (!attrs.hasOwnProperty("block")) {
            overlay.on("click",close);
          }
        } else {
          close();
        }
      });

    },
  };
});

// - -------------------------------------------------------------------- - //
