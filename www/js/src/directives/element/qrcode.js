// - -------------------------------------------------------------------- - //

App.directive("qrcode",function() {
  return {
    restrict: "E",
    scope: {
      text: "=",
    },
    templateUrl: "tpl/directives/qrcode.html",
    link: function($scope,element,attrs) {
      var elm = element.children();
      $scope.$watch("text",function() {
        elm.empty();
        if ($scope.text) {
          libz("qrcode",function() {
            $scope.qrcode = new QRCode(elm[0],{
              text: $scope.text,
              // width: 128,
              // height: 128,
              colorDark : "#000000",
              colorLight : "#ffffff",
              correctLevel : QRCode.CorrectLevel.H
            });
          });
        } else {
          $scope.qrcode = null;
        }
      });
    },
  };
});

// - -------------------------------------------------------------------- - //
