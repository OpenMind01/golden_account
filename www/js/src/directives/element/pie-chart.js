// - -------------------------------------------------------------------- - //

App.directive("pieChart",function(Bitgold) {
  return {
    restrict: "E",
    scope: {
      data: "=",
    },
    templateUrl: "tpl/directives/pie-chart.html",
    link: function($scope,element,attrs) {

      libz("Chart",function() {

        $scope.$watchCollection("data",function(data) {

          var canvas = element.find("canvas")[0];
          var context = canvas.getContext("2d");
          var pieChart = new Chart(context).Pie(data,{
            animation: false,
            tooltipTemplate: "<%= label %>",
          });

        });

      });

    },
  };
});

// - -------------------------------------------------------------------- - //
