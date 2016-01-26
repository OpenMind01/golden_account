// - -------------------------------------------------------------------- - //

App.factory("bgVault",["bgApi","bgSession",function(api,session) {

  return {

    _balance: {
      source: "vault",
      currency: "XAU.gr",
      value: 10,
      change: { daily: 1 },
      locations: [
        {
          country: "us",
          label: "My New York Vault",
          location: "New York",
          custodian: "Brinks",
          change: { daily: 0 },
          value: 0,
        },
        {
          country: "ca",
          label: "My Toronto Vault",
          location: "Toronto",
          custodian: "Brinks",
          change: { daily: 0 },
          value: 0,
        }
      ]
    },

    _transactions: [{
      date: new Date().toISOString(),
      currency: "XAU.gr",
      description: "",
      status: "pending",
      amount: 1,
    },{
      date: new Date().toISOString(),
      currency: "XAU.gr",
      description: "",
      status: "confirmed",
      amount: -1,
    }],

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
