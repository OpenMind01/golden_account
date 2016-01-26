// - -------------------------------------------------------------------- - //

App.factory("bcToshi",["$http","bgBitcoin",function($http,bitcoin) {

  return {

    // Retrieves a single transaction by its hash.
    getTransactionItem: function(options,callback) {
      if (angular.isString(options)) {
        options = { hash: options };
      }
      var url = bitcoin.networkMain
        ? "https://bitcoin.toshi.io/api/v0/transactions/" + options.hash
        : "https://testnet3.toshi.io/api/v0/transactions/" + options.hash;
      if (options.offset && options.limit) {
        url += "?offset=" + options.offset;
        url += "&limit=" + options.limit;
      }
      $http.get(url).error(function(data,status) {
        angular.isFunction(callback) && callback(new Error(status));
      }).success(function(data,status) {
        if (data.hash === options.hash) {
          var tx = this.readTransactionItem(data,options.address);
          angular.isFunction(callback) && callback(null,tx);
        } else {
          angular.isFunction(callback) && callback(new Error("received tx hash does not match"));
        }
      }.bind(this));
    },

    // Retrieves list of transactions of the given address.
    getTransactionList: function(options,callback) {
      if (angular.isString(options)) {
        options = { address: options };
      }
      var url = bitcoin.networkMain
        ? "https://bitcoin.toshi.io/api/v0/addresses/" + options.address + "/transactions"
        : "https://testnet3.toshi.io/api/v0/addresses/" + options.address + "/transactions";
      if (angular.isNumber(options.offset) && angular.isNumber(options.limit)) {
        url += "?offset=" + options.offset;
        url += "&limit=" + options.limit;
      }
      $http.get(url).error(function(data,status) {
        if (status === 404) {
          angular.isFunction(callback) && callback(null,{
            balance: 0,
            unconfirmed: 0,
            transactions: [],
          });
        } else {
          angular.isFunction(callback) && callback(new Error(status));
        }
      }).success(function(data,status) {
        if (data.hash === options.address) {
          angular.isFunction(callback) && callback(null,{
            balance: data.balance / Math.pow(10,8),
            unconfirmed: data.unconfirmed_balance / Math.pow(10,8),
            transactions: this.readTransactionList(data,options.address),
          });
        } else {
          angular.isFunction(callback) && callback(new Error("received address does not match"));
        }
      }.bind(this));
    },

    // Reads lists of transactions returned by api.
    readTransactionList: function(data,address) {
      var list = [];
      if (data.unconfirmed_transactions instanceof Array) {
        var length = data.unconfirmed_transactions.length;
        for (var i = 0; i < length; i++) {
          var tx = data.unconfirmed_transactions[i];
          var item = this.readTransactionItem(tx,address);
          if (item.amount != 0) {
            list.push(item);
          }
        }
      }
      if (data.transactions instanceof Array) {
        var length = data.transactions.length;
        for (var i = 0; i < length; i++) {
          var tx = data.transactions[i];
          var item = this.readTransactionItem(tx,address);
          if (item.amount != 0) {
            list.push(item);
          }
        }
      }
      return list;
    },

    // Reads one transaction from data returned by api.
    readTransactionItem: function(tx,address) {
      var to = [];
      var from = [];
      var amount = 0;
      var hash = tx.hash;
      var date = tx.block_time;
      var confirmations = tx.confirmations;
      if (angular.isArray(tx.inputs)) {
        var inputLength = tx.inputs.length;
        for (var i = 0; i < inputLength; i++) {
          var input = tx.inputs[i];
          var addressLength = input.addresses.length;
          for (var a = 0; a < addressLength; a++) {
            var addr = input.addresses[a];
            if (from.indexOf(addr) === -1) {
              from.push(addr);
            }
          }
        }
      }
      var fromAddress = from.indexOf(address) > -1;
      if (angular.isArray(tx.outputs)) {
        var outputLength = tx.outputs.length;
        for (var i = 0; i < outputLength; i++) {
          var output = tx.outputs[i];
          var addressLength = output.addresses.length;
          var add = false;
          for (var a = 0; a < addressLength; a++) {
            var addr = output.addresses[a];
            if (fromAddress) {
              if (from.indexOf(addr) === -1) {
                add = true;
                if (to.indexOf(addr) === -1) {
                  to.push(addr);
                }
              }
            } else if (addr === address) {
              add = true;
              to.push(addr);
            }
          }
          if (add) {
            amount += output.amount / Math.pow(10,8);
          }
        }
      }
      if (fromAddress) {
        amount = -amount;
      }
      return {
        to: to,
        from: from,
        amount: amount,
        hash: hash,
        date: date,
        confirmations: confirmations,
        status: confirmations > 0 ? "confirmed" : "pending",
        currency: "BTC",
      };
    },

  };

}]);

// - -------------------------------------------------------------------- - //
