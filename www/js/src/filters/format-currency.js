// - -------------------------------------------------------------------- - //

App.filter("formatCurrency",function() {

  return function(input,decimal) {
    if (isNaN(input)) {
      return "";
    } else {
      if (isNaN(decimal)) {
        decimal = 2;
      }
      var number = parseFloat(input).toFixed(decimal);
      var parts = String(number).split(".");
      var length = parts[0].length;
      var formatted = "";
      for (var i = 0; i < length; i++) {
        if (i > 0 && ((length - i) % 3) === 0) {
          formatted += ",";
        }
        formatted += parts[0][i];
      }
      formatted += "." + parts[1];
      return formatted;
    }
  };

});

// - -------------------------------------------------------------------- - //
