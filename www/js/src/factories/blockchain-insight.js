// - -------------------------------------------------------------------- - //

App.factory("bcInsight",["$http","bgBitcoin","bcInsightSocket","bcToshi",function($http,bitcoin,InsightSocket,Toshi) {

  return {

    // Creates new websocket for the given address.
    createSocket: function(address) {
      return new InsightSocket(address,Toshi.getTransactionItem.bind(Toshi));
    },

    getTransactionList: function(address,callback) {
    },

    readTransactionList: function(data,address) {
    },

    getTransactionItem: function(options,callback) {
    },

    readTransactionItem: function(tx,address) {

      // { "blockhash" : "000000006b44c25c72f08ff000e6c303bdb6139b1a5746d5beaff451df1fdd45",
      //   "blocktime" : 1414008060,
      //   "confirmations" : 2005,
      //   "fees" : 0.0001,
      //   "locktime" : 0,
      //   "size" : 224,
      //   "time" : 1414008060,
      //   "txid" : "5a740ec0bc6d726cd47f45db16563631bcb42be96269c806c787813b69c58930",
      //   "valueIn" : 0.35949999999999999,
      //   "valueOut" : 0.3594,
      //   "version" : 1,
      //   "vin" : [ { "addr" : "mkbgd8yzDTAGwY3zhohMdPh5SFCPRpzjcL",
      //         "doubleSpentTxID" : null,
      //         "n" : 0,
      //         "scriptSig" : { "asm" : "3045022100e8c90da3ccd746b1aad8b4e73b2747dfbbe2779cc32f4ff77ca12f5cd7501c9002206ffad86abdf456041dad0330b1ace8eda5ebaa3b3c5b4609c530db73f8d88b7f01 0224f10c208c39d77f93e2e46a8c918be27dc23b77bce7d4140f692ee53cb41367" },
      //         "sequence" : 4294967295,
      //         "txid" : "82c076859c51ee240131d6adf6eea59fe2ada347a350972dd3730a611393d1fa",
      //         "value" : 0.35949999999999999,
      //         "valueSat" : 35950000,
      //         "vout" : 0
      //       } ],
      //   "vout" : [ { "n" : 0,
      //         "scriptPubKey" : { "addresses" : [ "2N3ccQQtsvEo6VDfzcJqcKGgQQCszym9CTp" ],
      //             "asm" : "OP_HASH160 71bcb479b1430425d18662458bb9ddfb40653056 OP_EQUAL",
      //             "reqSigs" : 1,
      //             "type" : "scripthash"
      //           },
      //         "spentIndex" : 0,
      //         "spentTs" : 1414004163,
      //         "spentTxId" : "688de7ffa437a3a625c99a6d8f08144a14217e0729f2425e59713c01dabee65a",
      //         "value" : "0.21000000"
      //       },
      //       { "n" : 1,
      //         "scriptPubKey" : { "addresses" : [ "n1pvcXbGuY7KFonbPKYoo1hNMZCRGK8RBw" ],
      //             "asm" : "OP_DUP OP_HASH160 dec8996fa640046359f48e69dbcb64ccb027251d OP_EQUALVERIFY OP_CHECKSIG",
      //             "reqSigs" : 1,
      //             "type" : "pubkeyhash"
      //           },
      //         "spentIndex" : 2,
      //         "spentTs" : 1414003343,
      //         "spentTxId" : "cedc121757430ebd44109dfa0f283389927a684fcad7ae59eac072b7af60cfe1",
      //         "value" : "0.14940000"
      //       }
      //     ]
      // }
      
    },

  };

}]);

// - -------------------------------------------------------------------- - //
