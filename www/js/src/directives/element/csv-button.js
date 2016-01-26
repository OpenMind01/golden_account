// - -------------------------------------------------------------------- - //

App.directive("csvButton",function() {
  return {
    restrict: "E",
    transclude: true,
    scope: {},
    templateUrl: "tpl/directives/csv_button.html",
    link: function($scope,element,attrs) {

      function mapText(elm) {
        var arr = [];
        angular.forEach(elm,function(val) {
          var td = angular.element(val);
          if (td.attr("data-csv") !== "false") {
            var text = td.text().trim();
            text = text.replace(/\s+/g," ");
            arr.push('"' + text + '"');
          }
        });
        return arr;
      }

      function tableToCSV(table) {
        var th = table.find("thead").find("th");
        var data = mapText(th).join(",") + "\n";
        var rows = table.find("tbody").find("tr");
        angular.forEach(rows,function(row) {
          var tr = angular.element(row);
          var td = tr.find("td");
          data += mapText(td).join(",") + "\n";
        });
        return data;
      }

      function exportCSV() {
        var elm = document.getElementById(attrs.element);
        var table = angular.element(elm);
        var data = tableToCSV(table);
        var link = document.createElement("a");
        link.download = attrs.filename;
        link.href = "data:," + escape(data);
        link.click();
      }

      $scope.click = function() {
        if (attrs.export) {
          $scope.$parent.$eval(attrs.export,{
            callback: exportCSV,
          });
        } else {
          exportCSV();
        }
      };

    },
  };
});

// - -------------------------------------------------------------------- - //
