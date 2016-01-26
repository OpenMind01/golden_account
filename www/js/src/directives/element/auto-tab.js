// - -------------------------------------------------------------------- - //

App.directive("autoTab",function() {
  return {
    restrict: "A",
    link: function($scope,element,attrs) {
      element.on("keyup",function() {
        if (this.value.length === this.maxLength) {
          var length = this.form.elements.length;
          for (var i = 0; i < length; i++) {
            var elm = this.form.elements[i];
            if (elm === this) {
              if (i + 1 < length) {
                this.form.elements[i + 1].focus();
                break;
              }
            }
          }
        }
      });
    },
  };
});

// - -------------------------------------------------------------------- - //
