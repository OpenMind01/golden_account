// - -------------------------------------------------------------------- - //

App.factory("bgclsSocket",["bgclsEventEmitter",function(EventEmitter) {

  // Base class for handling WebSockets.
  function Socket(url) {
    this.url = url;
    EventEmitter.call(this);
  }

  Socket.prototype = angular.extend({},EventEmitter.prototype,{

    // Connects to WebSocket url.
    connect: function() {
      this._connect(0,function() {
        this.ws.onopen = function(event) {
          this.emit("connect",[event]);
        }.bind(this);

        this.ws.onclose = function(event) {
          this.emit("disconnect",[event]);
        }.bind(this);

        this.ws.onerror = function(event) {
          this.emit("error",[event.data]);
        }.bind(this);

        this.ws.onmessage = function(event) {
          var error, message;
          try { message = JSON.parse(event.data) }
          catch(e) { error = e; }
          if (error) {
            this.emit("error",[error]);
          } else {
            this.emit("message",[message]);
          }
        }.bind(this);

      }.bind(this));
    },

    _connect: function(count,callback) {
      count = count || 0;
      try {
        this.ws = new WebSocket(this.url);
        callback();
      } catch(e) {
        if (count < 10) {
          setTimeout(function() {
            this._connect(count++);
          }.bind(this),100);
        } else {
          throw e;
        }
      }
    },

    // Closes the websocket connection.
    disconnect: function() {
      try {
        this.ws.close();
      } catch(e) {}
    },

    // Sends a json message to the other peer.
    send: function(message) {
      if (this.ws.readyState === 1) {
        this.ws.send(JSON.stringify(message));
      }
    },

  });

  return Socket;
}]);

// - -------------------------------------------------------------------- - //
