// - -------------------------------------------------------------------- - //

App.factory("bgclsEventEmitter",[function() {

  // Base class for handling events.
  function EventEmitter(id) {
    this._events = {};
  }

  EventEmitter.prototype = {

    // Adds a callback to an event.
    on: function(event,callback) {
      if (!angular.isArray(this._events[event])) {
        this._events[event] = [];
      }
      if (angular.isFunction(callback)) {
        this._events[event].push(callback);
      }
    },

    // Removes a callback from an event.
    off: function(event,callback) {
      if (angular.isArray(this._events[event]) && angular.isFunction(callback)) {
        this._events[event] = this._events[event].filter(function(item) {
          return item !== callback;
        });
      }
    },

    // Adds a callback to be executed only once.
    once: function(event,callback) {
      var once = function() {
        callback.apply(this,arguments);
        this.off(event,once);
      };
      this.on(event,once);
    },

    // Emits an event calling all callbacks with passed arguments.
    emit: function(event,args) {
      if (angular.isArray(this._events[event])) {
        var callargs = args || [];
        var callbacks = this._events[event];
        var length = callbacks.length;
        var index = 0;
        while (index < length) {
          callbacks[index].apply(this,callargs);
          if (callbacks.length === length) {
            index++;
          } else {
            length = callbacks.length;
          }
        }
      }
    },

  };

  return EventEmitter;
}]);

// - -------------------------------------------------------------------- - //
