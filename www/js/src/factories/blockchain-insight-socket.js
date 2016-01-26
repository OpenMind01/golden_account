// - -------------------------------------------------------------------- - //

App.factory("bcInsightSocket",["bgBitcoin","bgclsEventEmitter",function(bitcoin,EventEmitter) {

  function InsightSocket(address,loader) {
    EventEmitter.call(this);

    // Validates the address.
    if (!bitcoin.isAddress(address)) {
      throw new Error("invalid or missing address");
    }
    this.address = address;

    // Validates the tx loader.
    if (!angular.isFunction(loader)) {
      throw new Error("invalid or missing loader");
    }
    this.loader = loader;

    // Selects url based on current network.
    this.url = bitcoin.networkMain
      ? "https://insight.bitpay.com:443/"
      : "https://test-insight.bitpay.com:443/";

  }

  InsightSocket.prototype = angular.extend({},EventEmitter.prototype,{

    // Connects to Bitpay Insight socketio server.
    connect: function() {
      var socket = this;
      var address = this.address;
      this.io = io(this.url);
      this.io.on("connect", function() {
        this.emit("subscribe",address);
        socket.emit("connect");
      });
      this.io.on("disconnect", function(event) {
        socket.emit("disconnect",[event]);
      });
      this.io.on("error", function(event) {
        socket.emit("error",[event]);
      });
      this.io.on(address,function(hash) {
        var options = {
          address: address,
          hash: hash,
        };
        socket.loader(options,function(error,tx) {
          if (error) {
            socket.emit("error",[error]);
          } else {
            socket.emit("transaction",[tx]);
          }
        });
        // socket.io.on(hash,function(data) {
        //   console.log("hash",hash,data);
        // });
      });
    },

    // Closes socketio connection.
    disconnect: function() {
      this.io.disconnect();
      this.io.removeAllListeners();
      this.io = null;
    },

  });

  return InsightSocket;
}]);

// - -------------------------------------------------------------------- - //
