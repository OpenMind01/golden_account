// - -------------------------------------------------------------------- - //

describe("BasicInfoController",function() {

  beforeEach(module("Bitgold"));
  beforeEach(module("bgMock"));

  var $scope, $element, Bitgold;
  beforeEach(inject(function($compile,$templateCache,$controller,$rootScope,bgMock) {
    $scope = $rootScope.$new();
    $element = $compile( $templateCache.get("tpl/views/basic_info.html") )($scope);
    Bitgold = bgMock;
    $controller("BasicInfoController",{
      $scope: $scope,
      $element: $element,
      Bitgold: Bitgold,
    });
    $scope.$digest();
  }));

});

// - -------------------------------------------------------------------- - //
