// - -------------------------------------------------------------------- - //

describe("Bitgold.classes.Wallet",function() {

  beforeEach(module("Bitgold"));

  var Wallet, session, crypto, $httpBackend;
  beforeEach(inject(function(bgclsWallet,bgSession,bgCrypto,_$httpBackend_) {
    Wallet = bgclsWallet;
    session = bgSession;
    crypto = bgCrypto;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("empty wallet",function() {
    var wallet = new Wallet();
    assert.deepEqual(wallet.getContacts(),[]);
    assert.strictEqual(typeof wallet.getWalletId(),"undefined");
    assert.strictEqual(typeof wallet.getAddress(),"undefined");
  });

  it("contacts",function() {
    var wallet = new Wallet();
    var contacts = wallet.getContacts();
    var onchange = false;
    wallet.on("change",function() { onchange = true });
    assert.strictEqual(contacts.length,0);
    wallet.addContact({});
    assert.strictEqual(contacts.length,1);
    assert.strictEqual(onchange,true);
    onchange = false;
    wallet.deleteContact(contacts[0]);
    assert.strictEqual(contacts.length,0);
    assert.strictEqual(onchange,true);
  });

  it("set data",function() {
    var wallet = new Wallet();
    var data = {
      walletId: "4558fa035dc34c84b1b0b9565a9a6e5a",
      p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
      contacts: [],
    };
    wallet.setData(data);
    assert.strictEqual(wallet.getWalletId(),data.walletId);
    assert.strictEqual(wallet.getAddress(),data.p2shAddress);
    assert.deepEqual(wallet.getContacts(),data.contacts);
    assert.deepEqual(wallet.getData(),data);
  });

  it("constructor data",function() {
    var data = {
      walletId: "4558fa035dc34c84b1b0b9565a9a6e5a",
      p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
      contacts: [],
    };
    var wallet = new Wallet(data);
    assert.strictEqual(wallet.getWalletId(),data.walletId);
    assert.strictEqual(wallet.getAddress(),data.p2shAddress);
    assert.deepEqual(wallet.getContacts(),data.contacts);
    assert.deepEqual(wallet.getData(),data);
  });

  it("invalid address",function() {
    var wallet = new Wallet();
    assert.throws(function() {
      wallet.setAddress("2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck");
    },/invalid or missing address/);
    assert.strictEqual(typeof wallet.getAddress(),"undefined");
    assert.throws(function() {
      wallet.setAddress(null);
    },/invalid or missing address/);
    assert.strictEqual(typeof wallet.getAddress(),"undefined");
    assert.throws(function() {
      wallet.setData({ p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck" });
    },/invalid or missing address/);
    assert.strictEqual(typeof wallet.getAddress(),"undefined");
    assert.throws(function() {
      wallet.setData({ p2shAddress: null });
    },/invalid or missing address/);
    assert.strictEqual(typeof wallet.getAddress(),"undefined");
  });

  it("load wallet address error",function() {
    var wallet = new Wallet();
    assert.throws(function() {
      wallet.load();
    },/invalid or missing wallet address/);
  });

  it("create uri success",function() {
    var wallet = new Wallet({
      p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
    });
    assert.strictEqual(wallet.createURI(0.001),"bitcoin:2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5?amount=0.001");
    assert.strictEqual(wallet.createURI(),"bitcoin:2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5");
  });

  it("create uri invalid amount should be ignored",function() {
    var wallet = new Wallet({
      p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
    });
    assert.strictEqual(wallet.createURI("aaa"),"bitcoin:2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5");
    assert.strictEqual(wallet.createURI(null),"bitcoin:2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5");
    assert.strictEqual(wallet.createURI("1,000"),"bitcoin:2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5");
  });

  it("create uri address error",function() {
    var wallet = new Wallet();
    assert.throws(function() {
      wallet.createURI();
    },/invalid or missing wallet address/);
  });

  // it("create transaction success",function(done) {
  //   var wallet = new Wallet({
  //     public: "02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c",
  //     private: "KwXFxRapDj8SrZZgkMbNmnBV8bfUdfG6wjhyvDQ8hpCTzSmPyNVa",
  //     p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
  //     serverPublicKey: "A7RJsLKeWsracXqC4VWh4fS6c2wB9mZ9kMnE9b85AL3X"
  //   });
  //   var newTx = {
  //     "inputs": [{
  //       "addresses"   : ["02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c","03b449b0b29e5acada717a82e155a1e1f4ba736c01f6667d90c9c4f5bf3900bdd7"],
  //       "script_type":"multisig-2-of-2",
  //     }],
  //     "outputs": [{
  //       "addresses" : ["mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"],
  //       "value"     : 10000000,
  //     }],
  //     "confirmations": -1,
  //   };
  //   $httpBackend
  //     .expectPOST("https://api.blockcypher.com/v1/btc/test3/txs/new",JSON.stringify(newTx))
  //     .respond(200,{
  //       "tx": {
  //           "block_height": -1,
  //           "hash": "d740680a6e9d0cd003ad8b3ca4ffa4eec7302821a9c53efee3c14a0713cb7b28",
  //           "addresses": [
  //               "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
  //               "mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE",
  //               "n1whmV4ryRTtYrrtrcAYs8uk9opsaWF797"
  //           ],
  //           "total": 26990000,
  //           "fees": 10000,
  //           "preference": "high",
  //           "relayed_by": "127.0.0.1:49255",
  //           "confirmed": "0001-01-01T00:00:00Z",
  //           "received": "2014-10-21T15:59:30.498315781Z",
  //           "ver": 1,
  //           "lock_time": 0,
  //           "double_spend": false,
  //           "vin_sz": 1,
  //           "vout_sz": 2,
  //           "confirmations": 0,
  //           "inputs": [
  //               {
  //                   "prev_hash": "4cfd24e67e484e2eebd4f7a772be4b49d238194ff15d2b96386ea79ee2097075",
  //                   "output_index": 1,
  //                   "script": "",
  //                   "output_value": 27000000,
  //                   "addresses": [
  //                       "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5"
  //                   ],
  //                   "script_type": ""
  //               }
  //           ],
  //           "outputs": [
  //               {
  //                   "value": 1000000,
  //                   "script": "76a9147da74d13600657ea2263fa28e017c0d6433b775888ac",
  //                   "spent_by": "",
  //                   "addresses": [
  //                       "mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"
  //                   ],
  //                   "script_type": "pay-to-pubkey-hash"
  //               },
  //               {
  //                   "value": 16990000,
  //                   "script": "76a914e010c9c3cc965a36a57c5b6d1af9a925240a779188ac",
  //                   "spent_by": "",
  //                   "addresses": [
  //                       "n1whmV4ryRTtYrrtrcAYs8uk9opsaWF797"
  //                   ],
  //                   "script_type": "pay-to-pubkey-hash"
  //               }
  //           ]
  //       },
  //       "tosign": [
  //           "3baea73ccb80d3d42dc914637f4fa9f53fc4bc3a9ad6b1de6aad7f49e75b52b1"
  //       ]
  //   });
  //   wallet.createTransaction("mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE",0.1,function(error,data) {
  //     assert.strictEqual(error,null);
  //     assert.deepEqual(data,{
  //       "inputs": [
  //         {
  //           "previousTransactionHash": "4cfd24e67e484e2eebd4f7a772be4b49d238194ff15d2b96386ea79ee2097075",
  //           "outputIndex": 1,
  //           "signature": "MEQCIE2io2qzM8FruzFbZV9N3/VAefJFRaVCd9y3PadG41EQAiB5NbZBqUES3T+joGQIarau9TmIMsZY3iWd1x6csoqKYg=="
  //         }
  //       ],
  //       "changeAmount": 16990000,
  //       "destination": {
  //         "amount": 10000000,
  //         "address": "mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"
  //       }
  //     });
  //     done();
  //   });
  //   $httpBackend.flush();
  // });
  //
  // it("create transaction p2sh success",function(done) {
  //   var wallet = new Wallet({
  //     public: "02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c",
  //     private: "KwXFxRapDj8SrZZgkMbNmnBV8bfUdfG6wjhyvDQ8hpCTzSmPyNVa",
  //     p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
  //     serverPublicKey: "A7RJsLKeWsracXqC4VWh4fS6c2wB9mZ9kMnE9b85AL3X"
  //   });
  //   var newTx = {
  //     "inputs": [{
  //       "addresses"   : ["02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c","03b449b0b29e5acada717a82e155a1e1f4ba736c01f6667d90c9c4f5bf3900bdd7"],
  //       "script_type":"multisig-2-of-2",
  //     }],
  //     "outputs": [{
  //       "addresses" : ["2N3ccQQtsvEo6VDfzcJqcKGgQQCszym9CTp"],
  //       "value"     : 10000000,
  //       "script_type": "pay-to-script-hash",
  //     }],
  //     "confirmations": -1,
  //   };
  //   $httpBackend
  //     .expectPOST("https://api.blockcypher.com/v1/btc/test3/txs/new",JSON.stringify(newTx))
  //     .respond(200,{
  //       "tx": {
  //           "block_height": -1,
  //           "hash": "d740680a6e9d0cd003ad8b3ca4ffa4eec7302821a9c53efee3c14a0713cb7b28",
  //           "addresses": [
  //               "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
  //               "2N3ccQQtsvEo6VDfzcJqcKGgQQCszym9CTp",
  //               "n1whmV4ryRTtYrrtrcAYs8uk9opsaWF797"
  //           ],
  //           "total": 26990000,
  //           "fees": 10000,
  //           "preference": "high",
  //           "relayed_by": "127.0.0.1:49255",
  //           "confirmed": "0001-01-01T00:00:00Z",
  //           "received": "2014-10-21T15:59:30.498315781Z",
  //           "ver": 1,
  //           "lock_time": 0,
  //           "double_spend": false,
  //           "vin_sz": 1,
  //           "vout_sz": 2,
  //           "confirmations": 0,
  //           "inputs": [
  //               {
  //                   "prev_hash": "4cfd24e67e484e2eebd4f7a772be4b49d238194ff15d2b96386ea79ee2097075",
  //                   "output_index": 1,
  //                   "script": "",
  //                   "output_value": 27000000,
  //                   "addresses": [
  //                       "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5"
  //                   ],
  //                   "script_type": ""
  //               }
  //           ],
  //           "outputs": [
  //               {
  //                   "value": 1000000,
  //                   "script": "76a9147da74d13600657ea2263fa28e017c0d6433b775888ac",
  //                   "spent_by": "",
  //                   "addresses": [
  //                       "2N3ccQQtsvEo6VDfzcJqcKGgQQCszym9CTp"
  //                   ],
  //                   "script_type": "pay-to-pubkey-hash"
  //               },
  //               {
  //                   "value": 25990000,
  //                   "script": "76a914e010c9c3cc965a36a57c5b6d1af9a925240a779188ac",
  //                   "spent_by": "",
  //                   "addresses": [
  //                       "n1whmV4ryRTtYrrtrcAYs8uk9opsaWF797"
  //                   ],
  //                   "script_type": "pay-to-pubkey-hash"
  //               }
  //           ]
  //       },
  //       "tosign": [
  //           "3baea73ccb80d3d42dc914637f4fa9f53fc4bc3a9ad6b1de6aad7f49e75b52b1"
  //       ]
  //   });
  //   wallet.createTransaction("2N3ccQQtsvEo6VDfzcJqcKGgQQCszym9CTp",0.1,function(error,data) {
  //     assert.strictEqual(error,null);
  //     assert.deepEqual(data,{
  //       "inputs": [
  //         {
  //           "previousTransactionHash": "4cfd24e67e484e2eebd4f7a772be4b49d238194ff15d2b96386ea79ee2097075",
  //           "outputIndex": 1,
  //           "signature": "MEUCIQC7KPyvpO4VWU5cg6Pht6Pb8VDQ2mYNbC6YRBBA6vDcfgIgQkahAUk5x1ne73idBC6HAVjHRz6U1q71ufHqluiwDL4="
  //         }
  //       ],
  //       "changeAmount": 16990000,
  //       "destination": {
  //         "amount": 10000000,
  //         "address": "2N3ccQQtsvEo6VDfzcJqcKGgQQCszym9CTp"
  //       }
  //     });
  //     done();
  //   });
  //   $httpBackend.flush();
  // });
  //
  // it("create transaction out of funds error",function(done) {
  //   var wallet = new Wallet({
  //     public: "02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c",
  //     private: "KwXFxRapDj8SrZZgkMbNmnBV8bfUdfG6wjhyvDQ8hpCTzSmPyNVa",
  //     p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
  //     serverPublicKey: "A7RJsLKeWsracXqC4VWh4fS6c2wB9mZ9kMnE9b85AL3X"
  //   });
  //   var newTx = {
  //     "inputs": [{
  //       "addresses"   : ["02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c","03b449b0b29e5acada717a82e155a1e1f4ba736c01f6667d90c9c4f5bf3900bdd7"],
  //       "script_type":"multisig-2-of-2",
  //     }],
  //     "outputs": [{
  //       "addresses" : ["mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"],
  //       "value"     : 10000000,
  //     }],
  //     "confirmations": -1,
  //   };
  //   $httpBackend
  //     .expectPOST("https://api.blockcypher.com/v1/btc/test3/txs/new",JSON.stringify(newTx))
  //     .respond(200,{
  //       "errors": [
  //         {
  //           "error": "Unable to find a transaction to spend for address 2N9c1JWFnAy7XZdhxq9ZNZgfE6jW53sv1fF."
  //         },
  //       ],
  //   });
  //   wallet.createTransaction("mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE",0.1,function(error,data) {
  //     assert.ok(error instanceof Error);
  //     assert.strictEqual(error.message,"not enough funds");
  //     assert.strictEqual(typeof data,"undefined");
  //     done();
  //   });
  //   $httpBackend.flush();
  // });
  //
  //
  // it("create transaction address error",function(done) {
  //   var wallet = new Wallet({
  //     public: "02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c",
  //     private: "KwXFxRapDj8SrZZgkMbNmnBV8bfUdfG6wjhyvDQ8hpCTzSmPyNVa",
  //     p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
  //     serverPublicKey: "A7RJsLKeWsracXqC4VWh4fS6c2wB9mZ9kMnE9b85AL3X"
  //   });
  //   wallet.createTransaction("",0.1,function(error,data) {
  //     assert.ok(error instanceof Error);
  //     assert.strictEqual(error.message,"invalid or missing address");
  //     assert.strictEqual(typeof data,"undefined");
  //     done();
  //   });
  // });
  //
  // it("create transaction amount error",function(done) {
  //   var wallet = new Wallet({
  //     public: "02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c",
  //     private: "KwXFxRapDj8SrZZgkMbNmnBV8bfUdfG6wjhyvDQ8hpCTzSmPyNVa",
  //     p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
  //     serverPublicKey: "A7RJsLKeWsracXqC4VWh4fS6c2wB9mZ9kMnE9b85AL3X"
  //   });
  //   wallet.createTransaction("mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE",0.00000001,function(error,data) {
  //     assert.ok(error instanceof Error);
  //     assert.strictEqual(error.message,"invalid or missing amount");
  //     assert.strictEqual(typeof data,"undefined");
  //     done();
  //   });
  // });
  //
  // it("create transaction network error",function(done) {
  //   var wallet = new Wallet({
  //     public: "02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c",
  //     private: "KwXFxRapDj8SrZZgkMbNmnBV8bfUdfG6wjhyvDQ8hpCTzSmPyNVa",
  //     p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
  //     serverPublicKey: "A7RJsLKeWsracXqC4VWh4fS6c2wB9mZ9kMnE9b85AL3X"
  //   });
  //   wallet.createTransaction("1DRnurMWfTWXL9oG8iVED8r6qubqPKw7Vj",0.1,function(error,data) {
  //     assert.ok(error instanceof Error);
  //     assert.strictEqual(error.message,"network does not match");
  //     assert.strictEqual(typeof data,"undefined");
  //     done();
  //   });
  // });
  //
  // it("create transaction wallet public key error",function(done) {
  //   var wallet = new Wallet({
  //     private: "KwXFxRapDj8SrZZgkMbNmnBV8bfUdfG6wjhyvDQ8hpCTzSmPyNVa",
  //     p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
  //     serverPublicKey: "A7RJsLKeWsracXqC4VWh4fS6c2wB9mZ9kMnE9b85AL3X"
  //   });
  //   wallet.createTransaction("mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE",0.1,function(error,data) {
  //     assert.ok(error instanceof Error);
  //     assert.strictEqual(error.message,"invalid or missing wallet public key");
  //     assert.strictEqual(typeof data,"undefined");
  //     done();
  //   });
  // });
  //
  // it("create transaction wallet private key error",function(done) {
  //   var wallet = new Wallet({
  //     public: "02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c",
  //     p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
  //     serverPublicKey: "A7RJsLKeWsracXqC4VWh4fS6c2wB9mZ9kMnE9b85AL3X"
  //   });
  //   wallet.createTransaction("mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE",0.1,function(error,data) {
  //     assert.ok(error instanceof Error);
  //     assert.strictEqual(error.message,"invalid or missing wallet private key");
  //     assert.strictEqual(typeof data,"undefined");
  //     done();
  //   });
  // });
  //
  // it("create transaction wallet address error",function(done) {
  //   var wallet = new Wallet({
  //     public: "02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c",
  //     private: "KwXFxRapDj8SrZZgkMbNmnBV8bfUdfG6wjhyvDQ8hpCTzSmPyNVa",
  //     serverPublicKey: "A7RJsLKeWsracXqC4VWh4fS6c2wB9mZ9kMnE9b85AL3X"
  //   });
  //   wallet.createTransaction("mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE",0.1,function(error,data) {
  //     assert.ok(error instanceof Error);
  //     assert.strictEqual(error.message,"invalid or missing wallet address");
  //     assert.strictEqual(typeof data,"undefined");
  //     done();
  //   });
  // });
  //
  // it("create transaction server public key error",function(done) {
  //   var wallet = new Wallet({
  //     public: "02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c",
  //     p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
  //     private: "KwXFxRapDj8SrZZgkMbNmnBV8bfUdfG6wjhyvDQ8hpCTzSmPyNVa",
  //   });
  //   wallet.createTransaction("mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE",0.1,function(error,data) {
  //     assert.ok(error instanceof Error);
  //     assert.strictEqual(error.message,"invalid or missing server public key");
  //     assert.strictEqual(typeof data,"undefined");
  //     done();
  //   });
  // });
  //
  // it("send transaction success",function(done) {
  //   var token = "51228c1dd7c34a62b4683eb4bce5c235";
  //   session.setAESKey(crypto.generateAESKey());
  //   session.setAuthToken(token);
  //   var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
  //   var wallet = new Wallet({
  //     walletId: walletId,
  //   });
  //   var sendTx = {
  //     "inputs": [
  //       {
  //         "hash": "koK/wJH2qys82NP2B9nIRvB95bOTSRqSghMdBKk+XOo=",
  //         "outputIndex": 1,
  //         "signature": "MEUCIQCEY/NCJF5Jhzwe55TSZoSQdfSHMOYrLLqpOOc/6BNm7gIgBMcbm/wzFoEUqvOfUChIQxGqCmCH8oAH6DgAZGGoOjE="
  //       }
  //     ],
  //     "changeAmount": 25990000,
  //     "destination": {
  //       "amount": 10000000,
  //       "address": "mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"
  //     }
  //   };
  //   $httpBackend.expectPOST(
  //       "http://test.bitgold.com/api/wallets/" + walletId + "/transactions",
  //       sendTx,
  //       function(headers) { return headers["X-Auth-Token"] === token; }
  //     ).respond(201,{
  //       "transactionId":61,
  //       "published":1414151538175,
  //       "message":"{\"tx\":{ \"inputs\": [], \"outputs\": [] } }",
  //     });
  //   wallet.sendTransaction(sendTx,function(error,data) {
  //     assert.strictEqual(error,null);
  //     assert.deepEqual(data,{
  //       inputs: [],
  //       outputs: [],
  //     });
  //     done();
  //   });
  //   $httpBackend.flush();
  // });
  //
  // it("send transaction auth error",function(done) {
  //   var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
  //   var wallet = new Wallet({
  //     walletId: walletId,
  //   });
  //   wallet.sendTransaction({},function(error,data) {
  //     assert.ok(error instanceof Error);
  //     assert.strictEqual(error.message,"must be authenticated");
  //     assert.strictEqual(typeof data,"undefined");
  //     done();
  //   });
  //   $httpBackend.flush();
  // });
  //
  // it("send transaction remote error",function(done) {
  //   var token = "51228c1dd7c34a62b4683eb4bce5c235";
  //   session.setAESKey(crypto.generateAESKey());
  //   session.setAuthToken(token);
  //   var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
  //   var wallet = new Wallet({
  //     walletId: walletId,
  //   });
  //   var sendTx = {
  //     "inputs": [
  //       {
  //         "hash": "koK/wJH2qys82NP2B9nIRvB95bOTSRqSghMdBKk+XOo=",
  //         "outputIndex": 1,
  //         "signature": "MEUCIQCEY/NCJF5Jhzwe55TSZoSQdfSHMOYrLLqpOOc/6BNm7gIgBMcbm/wzFoEUqvOfUChIQxGqCmCH8oAH6DgAZGGoOjE="
  //       }
  //     ],
  //     "changeAmount": 25990000,
  //     "destination": {
  //       "amount": 10000000,
  //       "address": "mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"
  //     }
  //   };
  //   $httpBackend.expectPOST(
  //       "http://test.bitgold.com/api/wallets/" + walletId + "/transactions",
  //       sendTx,
  //       function(headers) { return headers["X-Auth-Token"] === token; }
  //     ).respond(403);
  //   wallet.sendTransaction(sendTx,function(error,data) {
  //     assert.ok(error instanceof Error);
  //     assert.strictEqual(error.message,"403");
  //     assert.strictEqual(typeof data,"undefined");
  //     done();
  //   });
  //   $httpBackend.flush();
  // });
  //
  // it("load success",function(done) {
  //   var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
  //   var address = "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5";
  //   var token = "51228c1dd7c34a62b4683eb4bce5c235";
  //   session.setAESKey(crypto.generateAESKey());
  //   session.setAuthToken(token);
  //   var wallet = new Wallet({
  //     p2shAddress: address,
  //     walletId: walletId,
  //   });
  //   $httpBackend
  //     .expectGET("https://api.blockcypher.com/v1/btc/test3/addrs/" + address)
  //     .respond(200,{
  //       "address": "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
  //       "balance": 1751842187,
  //       "unconfirmed_balance": 0,
  //       "final_balance": 1751842187,
  //       "n_tx": 0,
  //       "tx_url": "https://api.blockcypher.com/v1/btc/test3/txs/"
  //     });
  //   $httpBackend.expectPUT(
  //     "http://test.bitgold.com/api/wallets/" + walletId,
  //     function() { return true; },
  //     function(headers) { return headers["X-Auth-Token"] === token && headers["Content-Type"] === "application/binary"; }
  //   ).respond(200,{});
  //   var loaded = false;
  //   var changed = false;
  //   wallet.on("load",function() { loaded = true });
  //   wallet.on("change",function() { changed = true });
  //   wallet.on("update",function() {
  //     assert.ok(loaded);
  //     assert.ok(changed);
  //     done();
  //   });
  //   wallet.load();
  //   $httpBackend.flush();
  // });

  // it("update data empty",function(done) {
  //   var address = "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5";
  //   var wallet = new Wallet();
  //   wallet.setAddress(address);
  //   $httpBackend
  //     .expectGET("https://api.blockcypher.com/v1/btc/test3/addrs/" + address)
  //     .respond(200,{
  //       "address": "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
  //       "balance": 1751842187,
  //       "unconfirmed_balance": 0,
  //       "final_balance": 1751842187,
  //       "n_tx": 0,
  //       "tx_url": "https://api.blockcypher.com/v1/btc/test3/txs/"
  //     });
  //   wallet.updateData(function(error) {
  //     assert.strictEqual(error,null);
  //     assert.deepEqual(wallet.getBalance(),{ value: 17.51842187, change: { daily: 0 } });
  //     assert.deepEqual(wallet.getTransactions(),[]);
  //     done();
  //   });
  //   $httpBackend.flush();
  // });
  //
  // it("update data wallet address error",function(done) {
  //   var wallet = new Wallet();
  //   wallet.updateData(function(error) {
  //     assert.ok(error instanceof Error);
  //     assert.strictEqual(error.message,"invalid or missing wallet address");
  //     done();
  //   });
  //   $httpBackend.flush();
  // });
  //
  // it("update data address error",function(done) {
  //   var address = "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5";
  //   var wallet = new Wallet();
  //   wallet.setAddress(address);
  //   $httpBackend
  //     .expectGET("https://api.blockcypher.com/v1/btc/test3/addrs/" + address)
  //     .respond(200,{
  //       "address": "15qx9ug952GWGTNn7Uiv6vode4RcGrRemh",
  //       "balance": 0,
  //       "unconfirmed_balance": 0,
  //       "final_balance": 0,
  //       "n_tx": 0,
  //       "tx_url": "https://api.blockcypher.com/v1/btc/test3/txs/"
  //     });
  //   wallet.updateData(function(error) {
  //     assert.ok(error instanceof Error);
  //     assert.strictEqual(error.message,"received address does not match");
  //     done();
  //   });
  //   $httpBackend.flush();
  // });
  //
  // it("balance changed",function() {
  //   var wallet = new Wallet({
  //     balance: { value: 1.6, change: { daily: 0.1, } },
  //     transactions: {
  //       "4f25a21eaf581d51c89338e69e970a2ec5cb3078b3ee2bcf0ba0cf93d4a3b424": {
  //         amount: 0.00106741,
  //         confirmations: 2,
  //         date: moment().format(),
  //         from: ["mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAc"],
  //         to: ["mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"],
  //       },
  //       "aa5f10b030b23c9cb7c04e55b493402a22df0deeace39dc341151dc196fe16fa": {
  //         amount: 0.00106741,
  //         confirmations: 2,
  //         date: moment().format(),
  //         from: ["mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAc"],
  //         to: ["mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"],
  //       },
  //       "76f67579a62838ba73c53549cfb0620f9ed49ffbad2fd8c776f0ea15d84e8bbd": {
  //         amount: 0.00106741,
  //         confirmations: 2,
  //         date: "2014-08-22T13:47:27Z",
  //         from: ["mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAc"],
  //         to: ["mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"],
  //       },
  //     }
  //   });
  //   assert.deepEqual(wallet.getBalance(),{ value: 1.6, change: { daily: 0.1, } });
  //   wallet.updateBalanceChange();
  //   assert.deepEqual(wallet.getBalance(),{ value: 1.6, change: { daily: 0.00213482, } });
  // });
  //
  // it("balance not changed",function() {
  //   var wallet = new Wallet({
  //     balance: { value: 1.6, change: { daily: 0.1, } },
  //     transactions: {
  //       "76f67579a62838ba73c53549cfb0620f9ed49ffbad2fd8c776f0ea15d84e8bbd": {
  //         amount: 0.00106741,
  //         confirmations: 2,
  //         date: "2014-08-22T13:47:27Z",
  //         from: ["mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAc"],
  //         to: ["mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"],
  //       },
  //     }
  //   });
  //   assert.deepEqual(wallet.getBalance(),{ value: 1.6, change: { daily: 0.1, } });
  //   wallet.updateBalanceChange();
  //   assert.deepEqual(wallet.getBalance(),{ value: 1.6, change: { daily: 0, } });
  // });
  //
  // it("complete data",function(done) {
  //   var wallet = new Wallet({
  //     transactions: {
  //       "4f25a21eaf581d51c89338e69e970a2ec5cb3078b3ee2bcf0ba0cf93d4a3b424": {
  //         amount: 0,
  //         confirmations: 2,
  //         date: moment().format(),
  //         from: null,
  //         to: null,
  //       },
  //       "aa5f10b030b23c9cb7c04e55b493402a22df0deeace39dc341151dc196fe16fa": {
  //         amount: 0.00106741,
  //         confirmations: 2,
  //         date: moment().format(),
  //         from: null,
  //         to: null,
  //       },
  //       "76f67579a62838ba73c53549cfb0620f9ed49ffbad2fd8c776f0ea15d84e8bbd": {
  //         amount: 0.00106741,
  //         confirmations: 2,
  //         date: "2014-08-22T13:47:27Z",
  //         from: ["mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAc"],
  //         to: ["mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"],
  //       },
  //     }
  //   });
  //   $httpBackend
  //     .expectGET("https://api.blockcypher.com/v1/btc/test3/txs/4f25a21eaf581d51c89338e69e970a2ec5cb3078b3ee2bcf0ba0cf93d4a3b424")
  //     .respond(200,{
  //       hash: "4f25a21eaf581d51c89338e69e970a2ec5cb3078b3ee2bcf0ba0cf93d4a3b424",
  //     });
  //   $httpBackend
  //     .expectGET("https://api.blockcypher.com/v1/btc/test3/txs/aa5f10b030b23c9cb7c04e55b493402a22df0deeace39dc341151dc196fe16fa")
  //     .respond(200,{
  //       hash: "aa5f10b030b23c9cb7c04e55b493402a22df0deeace39dc341151dc196fe16fa",
  //     });
  //   wallet.completeData(function() {
  //     done();
  //   });
  //   $httpBackend.flush();
  // });
  //
  // it("add transaction",function() {
  //   var wallet = new Wallet();
  //   var balance = wallet.getBalance();
  //   var transactions = wallet.getTransactions();
  //   assert.deepEqual(balance,{ value: 0, change: { daily: 0, } });
  //   assert.deepEqual(transactions,[]);
  //   wallet.addTransaction({
  //     "block_hash": "000000000000182cb2d5941d4985d9969709d7abbb1d250c11c5cf66badc1a72",
  //     "block_height": 302571,
  //     "hash": "4f25a21eaf581d51c89338e69e970a2ec5cb3078b3ee2bcf0ba0cf93d4a3b424",
  //     "addresses": [
  //       "mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAc",
  //       "mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"
  //     ],
  //     "total": 868997329,
  //     "fees": 0,
  //     "preference": "low",
  //     "relayed_by": "177.131.60.138",
  //     "confirmed": moment().format(),
  //     "received": "2014-10-20T13:28:53.030421318Z",
  //     "ver": 1,
  //     "lock_time": 0,
  //     "double_spend": false,
  //     "vin_sz": 1,
  //     "vout_sz": 2,
  //     "confirmations": 2,
  //     "inputs": [
  //       {
  //         "prev_hash": "29f7d83afbce7502b5ead1d2ea5255d54789d750313d65d0344ebc768a4c2b24",
  //         "output_index": 1,
  //         "script": "473044022053589ad9668fb2173d02fb469438435db91e17bb246052ac7659e96aceb9ef41022011b55ecb31876c0b531c9bbde9dd13ac06c8fbdbfda4931e3238d4b88c5218f1012102cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c",
  //         "output_value": 868997329,
  //         "addresses": [
  //           "mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAc"
  //         ],
  //         "script_type": "pay-to-pubkey-hash"
  //       }
  //     ],
  //     "outputs": [
  //       {
  //         "value": 106741,
  //         "script": "76a9147da74d13600657ea2263fa28e017c0d6433b775888ac",
  //         "spent_by": "",
  //         "addresses": [
  //           "mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"
  //         ],
  //         "script_type": "pay-to-pubkey-hash"
  //       },
  //       {
  //         "value": 868890588,
  //         "script": "76a91449eee8f4d96e60d8bbfcc9f82747c4496ce33b9888ac",
  //         "spent_by": "",
  //         "addresses": [
  //           "mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAc"
  //         ],
  //         "script_type": "pay-to-pubkey-hash"
  //       }
  //     ],
  //     "change_address": ""
  //   });
  //   assert.deepEqual(balance,{ value: 0.00106741, change: { daily: 0.00106741 } });
  //   assert.deepEqual(transactions,[{
  //     hash: "4f25a21eaf581d51c89338e69e970a2ec5cb3078b3ee2bcf0ba0cf93d4a3b424",
  //     amount: 0.00106741,
  //     confirmations: 2,
  //     date: moment().format(),
  //     from: ["mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAc"],
  //     to: ["mryMBKFNToxsoNAVHi6Ek2dmuDFYoEGanE"],
  //   }]);
  // });


});

// - -------------------------------------------------------------------- - //
