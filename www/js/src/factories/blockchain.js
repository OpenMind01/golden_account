// - -------------------------------------------------------------------- - //

App.factory("blockchain",["bcToshi","bcInsight","bcBlockCypher",function(toshi,insight,blockcypher) {

  return {

    toshi: toshi,
    insight: insight,
    blockcypher: blockcypher,

    createSocket: function(address) {
      return this.blockcypher.createSocket(address);
    },

    getTransactionItem: function(options,callback) {
      this.toshi.getTransactionItem(options,callback);
    },

    getTransactionList: function(options,callback) {
      this.toshi.getTransactionList(options,callback);
    },

  };

}]);

// - -------------------------------------------------------------------- - //
