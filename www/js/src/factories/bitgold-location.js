// - -------------------------------------------------------------------- - //

App.factory("bgLocation",["bgApi",function(api) {
  var location = {};
  location.load = function(callback) {
    api.geoIP(function(error,data) {
      if (error) {
        location.countryCode = "US";
      } else {
        Object.keys(data).forEach(function(key) {
          location[key] = data[key];
        });
      }
      if (angular.isFunction(callback)) {
        callback(error);
      }
    });
  };
  return location;
}]);

// - -------------------------------------------------------------------- - //
