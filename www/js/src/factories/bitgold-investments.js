// - -------------------------------------------------------------------- - //

App.factory("bgInvestments",["bgApi","bgSession",function(api,session) {

  return {

    _balance: {
      source: "investments",
      currency: "USD",
      value: 10,
      change: { daily: 1 },
    },

    _transactions: [],

// - -------------------------------------------------------------------- - //

    getBalance: function() {
      return this._balance;
    },

    getTransactions: function() {
      return this._transactions;
    },

// - -------------------------------------------------------------------- - //

    loadBalance: function(callback) {
      // TODO
      angular.isFunction(callback) && callback(null);
    },

    loadTransactions: function(limit,callback) {
      // TODO
      angular.isFunction(callback) && callback(null);
    },

  };

}]);

// - -------------------------------------------------------------------- - //
