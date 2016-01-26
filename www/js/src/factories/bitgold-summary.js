// - -------------------------------------------------------------------- - //

App.factory("bgSummary",["bgApi","bgSession","bgWallet","bgVault","bgInvestments",function(api,session,wallet,vault,investments) {

  return {

    _balance: {
      value: 0,
      change: { daily: 0 },
      sources: [
        wallet.getBalance(),
        vault.getBalance(),
        investments.getBalance(),
      ],
    },

    _transactions: {
      all: [],
      wallet: wallet.getTransactions(),
      vault: vault.getTransactions(),
      investments: investments.getTransactions(),
    },

// - -------------------------------------------------------------------- - //

    getBalance: function() {
      return this._balance;
    },

    getTransactions: function() {
      return this._transactions;
    },

// - -------------------------------------------------------------------- - //

    loadBalance: function(callback) {
      var count = 3;
      function handle(error) {
        if (error) {
        } else {
          if (--count === 0) {
            angular.isFunction(callback) && callback(null);
          }
        }
      }
      wallet.loadBalance(handle.bind(this));
      vault.loadBalance(handle.bind(this));
      investments.loadBalance(handle.bind(this));
    },

    loadTransactions: function(limit,callback) {
      var count = 3;
      function handle(error) {
        if (error) {
        } else {
          if (--count === 0) {
            angular.isFunction(callback) && callback(null);
          }
        }
      }
      wallet.loadTransactions(limit,handle.bind(this));
      vault.loadTransactions(limit,handle.bind(this));
      investments.loadTransactions(limit,handle.bind(this));
    },

// - -------------------------------------------------------------------- - //

  };

}]);

// - -------------------------------------------------------------------- - //
