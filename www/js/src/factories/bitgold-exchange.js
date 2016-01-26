// - -------------------------------------------------------------------- - //

App.factory("bgExchange",["bgSession","bgclsSocket","$rootScope",function(session,Socket,$rootScope) {
  var exchange = {};
  exchange.load = function(callback) {
    var host = session.host();
    var url = "wss://" + host + "/ws/exchange-rates";
    var socket = new Socket(url);
    socket.on("message",function(data) {
      $rootScope.$apply(function() {
        data.forEach(function(item) {
          var xaugr = (item.xau / 31.1034768);
          exchange[item.currency] = {
            USD: item.rate,
            BTC: item.btc,
            XAU: item.xau,
            "XAU.gr": xaugr,
          };
          if (item.currency === "USD") {
            exchange["BTC"] = {
              USD: item.btc,
              BTC: 1,
              XAU: item.xau / item.btc,
              "XAU.gr": xaugr / item.btc,
            };
            exchange["XAU.gr"] = {
              USD: item.rate / xaugr,
              BTC: item.btc / xaugr,
              XAU: xaugr,
              "XAU.gr": 1,
            };
          }
        });
      });
    });
    if (angular.isFunction(callback)) {
      socket.once("message",function() {
        callback();
      });
    }
    socket.connect();
  };
  return exchange;
}]);

// - -------------------------------------------------------------------- - //
