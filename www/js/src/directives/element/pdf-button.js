// - -------------------------------------------------------------------- - //

App.directive("pdfButton",function() {
  return {
    restrict: "E",
    transclude: true,
    scope: {},
    templateUrl: "tpl/directives/pdf_button.html",
    link: function($scope,element,attrs) {

      function exportPDF() {
        libz("jspdf-html2canvas",function() {
          var doc = new jsPDF();
          var elm = document.getElementById(attrs.element);
          doc.addHTML(elm,function() {
            doc.save(attrs.filename);
          });
        });
      }

      $scope.click = function() {
        if (attrs.export) {
          $scope.$parent.$eval(attrs.export,{
            callback: exportPDF,
          });
        } else {
          exportPDF();
        }
      };

    },
  };
});

// - -------------------------------------------------------------------- - //
