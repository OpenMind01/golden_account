// - -------------------------------------------------------------------- - //

App.factory("bcyApi",["$http","bgBitcoin",function($http,bitcoin) {


  var http = "https://api.blockcypher.com/v1/btc/test3"; // /bc

  return {

    newTransaction: function(data,callback) {
      var error = null;
      var valid = angular.isObject(data)
        && angular.isArray(data.inputs)
        && angular.isArray(data.outputs);
      if (!valid) {
        error = new Error("invalid or missing tx");
      }
      if (error) {
        angular.isFunction(callback) && callback(error);
      } else {
        $http({
          method: "POST",
          url: http + "/txs/new",
          data: JSON.stringify(data),
          headers: { "Content-Type": "text/plain" }
        }).success(function(data,statusCode) {
          angular.isFunction(callback) && callback(null,data);
        }).error(function(data,statusCode) {
          angular.isFunction(callback) && callback(new Error(statusCode));
        });
      }
    },

  };

}]);

// - -------------------------------------------------------------------- - //
