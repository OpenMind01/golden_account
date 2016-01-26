// - -------------------------------------------------------------------- - //

App.factory("bcBlockCypherSocket",["bgclsSocket","bgBitcoin",function(Socket,bitcoin) {

  function BlockCypherSocket(address,parser) {

    // Validates the address.
    if (!bitcoin.isAddress(address)) {
      throw new Error("invalid or missing address");
    }
    this.address = address;

    // Validates the tx parser.
    if (!angular.isFunction(parser)) {
      throw new Error("invalid or missing parser");
    }
    this.parser = parser;

    this.url = bitcoin.networkMain
      ? "wss://socket.blockcypher.com/v1/btc/main"
      : "wss://socket.blockcypher.com/v1/btc/test3";

    Socket.call(this,this.url);

    // Pings regularly to keep the connection alive.
    this.on("connect",this.startPing);
    this.on("disconnect",this.stopPing);

    // Tells which events to notify.
    this.on("connect",function() {
      this.send({
        event: "tx-confirmation",
        address: this.address,
      });
    });

    // Emits event when a new transaction is received.
    this.on("message",function(message) {
      if (message.event !== "pong") {
        this.emit("transaction",[this.parser(message,this.address)]);
      }
      this.send({
        event: "tx-confirmation",
        address: this.address,
      });
    });
  }

  BlockCypherSocket.prototype = angular.extend({},Socket.prototype,{

    // Starts ping timer.
    startPing: function() {
      this.timer = setInterval(function() {
        this.send({ event: "ping" });
      }.bind(this),10000);
    },

    // Stops ping timer.
    stopPing: function() {
      clearInterval(this.timer);
    },

  });

  return BlockCypherSocket;
}]);

// - -------------------------------------------------------------------- - //
