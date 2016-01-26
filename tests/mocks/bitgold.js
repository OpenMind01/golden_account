// - -------------------------------------------------------------------- - //

function stub(opts) {

  if (!opts) opts = {};

  var func;

  func = function() {
    var args = [], fn = [];
    var len = arguments.length;
    for (var i = 0; i < len; i++) {
      var arg = arguments[i];
      args.push(arg);
      if (typeof arg === "function") {
        fn.push(i);
      }
    }
    func._calls.push(args);
    if (func._callbackWith instanceof Array) {
      var idx = fn.pop();
      if (args[idx]) {
        args[idx].apply(this,func._callbackWith);
      }
    }
    return func._returns;
  };

  func._calls = [];

  func._returns = opts.returns;
  func.returns = function(returns) {
    func._returns = returns;
  };

  func._callbackWith = opts._callbackWith;
  func.callbackWith = function() {
    func._callbackWith = [];
    var len = arguments.length;
    for (var i = 0; i < len; i++) {
      var arg = arguments[i];
      func._callbackWith.push(arg);
    }
  };

  func.called = function() {
    return func._calls.length;
  };

  func.notCalled = function() {
    return func._calls.length === 0;
  };

  func.calledOnce = function() {
    return func._calls.length === 1;
  };

  func.calledWith = function() {
    var callsLength = func._calls.length;
    var calledWith = 0;
    for (var i = 0; i < callsLength; i++) {
      var call = func._calls[i];
      var argsLength = arguments.length;
      var strictEqual = false;
      for (var a = 0; a < argsLength; a++) {
        if (typeof arguments[a] === "object" && arguments[a] !== null) {
          try {
            assert.deepEqual(arguments[a],call[a]);
            strictEqual = true;
          } catch(e) {}
        } else {
          try {
            assert.strictEqual(arguments[a],call[a]);
            strictEqual = true;
          } catch(e) {}
        }
        if (!strictEqual) {
          break;
        }
      }
      if (strictEqual) {
        calledWith++;
      }
    }
    return calledWith;
  };

  func.calledOnceWith = function() {
    var calledWith = func.calledWith.apply(this,arguments);
    return calledWith === 1;
  };

  return func;
}

// - -------------------------------------------------------------------- - //

var mock = angular.module("bgMock",["Bitgold"]);

mock.factory("bgMock",function() {
  return {
    api: {
      signIn: stub(),
      signUp: stub(),
      verifyEmail: stub(),
      verifyPhone: stub(),
      updateProfile: stub(),
      resendEmail: stub(),
      resendPhone: stub(),
    },
    session: {
      path: stub(),
      setAESKey: stub(),
      getAESKey: stub(),
      setProfile: stub(),
      getProfile: stub(),
      isAuthenticated: stub(),
    },
  };

});

// - -------------------------------------------------------------------- - //
