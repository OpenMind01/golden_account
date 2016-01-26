// - -------------------------------------------------------------------- - //

App.factory("bcBlockCypher",["$http","bgBitcoin","bcBlockCypherSocket",function($http,bitcoin,BlockCypherSocket) {

  return {

    // Creates new websocket for the given address.
    createSocket: function(address) {
      return new BlockCypherSocket(address,this.readTransactionItem.bind(this));
    },

    getTransactionList: function(address,callback) {
    },

    readTransactionList: function(data,address) {

    },

    // Parses one tx returned by blockcypher api.
    readTransactionItem: function(tx,address) {
      var to = [];
      var from = [];
      var amount = 0;
      var hash = tx.hash;
      var date = tx.confirmations > 0 ? tx.confirmed : null;
      var confirmations = tx.confirmations;
      var outputIndex = {};
      if (angular.isArray(tx.inputs)) {
        var inputLength = tx.inputs.length;
        for (var i = 0; i < inputLength; i++) {
          var input = tx.inputs[i];
          var len = input.addresses.length;
          for (var a = 0; a < len; a++) {
            if (from.indexOf(input.addresses[a]) === -1) {
              from.push(input.addresses[a]);
            }
          }
          outputIndex[input.output_index] = true;
        }
      }
      if (angular.isArray(tx.outputs)) {
        var outputLength = tx.outputs.length;
        for (var i = 0; i < outputLength; i++) {
          if (!outputIndex[i]) {
            var output = tx.outputs[i];
            var len = output.addresses.length;
            for (var a = 0; a < len; a++) {
              if (to.indexOf(output.addresses[a]) === -1) {
                to.push(output.addresses[a]);
              }
            }
            amount += output.value / Math.pow(10,8);
          }
        }
      }
      if (address) {
        if (from.indexOf(address) > -1) {
          to = [];
          amount = 0;
          if (angular.isArray(tx.outputs)) {
            var outputLength = tx.outputs.length;
            for (var i = 0; i < outputLength; i++) {
              var output = tx.outputs[i];
              var len = output.addresses.length;
              for (var a = 0; a < len; a++) {
                if (output.addresses[a] !== address) {
                  if (to.indexOf(output.addresses[a]) === -1) {
                    to.push(output.addresses[a]);
                  }
                  amount -= output.value / Math.pow(10,8);
                }
              }
            }
          }
        } else if (to.indexOf(address) === -1) {
          to = [];
          amount = 0;
          if (angular.isArray(tx.outputs)) {
            var outputLength = tx.outputs.length;
            for (var i = 0; i < outputLength; i++) {
              var output = tx.outputs[i];
              var len = output.addresses.length;
              for (var a = 0; a < len; a++) {
                if (output.addresses[a] === address) {
                  if (to.indexOf(output.addresses[a]) === -1) {
                    to.push(output.addresses[a]);
                  }
                  amount = output.value / Math.pow(10,8);
                }
              }
            }
          }
        }
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
