// - -------------------------------------------------------------------- - //

App.factory("bgclsWallet",["bgclsEventEmitter","Blockcypher","bgBitcoin","bgApi","blockchain",function(EventEmitter,Blockcypher,bitcoin,api,blockchain) {

  // Information to be included on stored blob.
  var DATA_KEYS = [
    "walletId",
    "p2shAddress",
    "serverPublicKey",
    "public",
    "private",
    "clientPrivateKey",
    "contacts",
    "label",
  ];

  // Class to deal with one wallet.
  function Wallet(data) {
    EventEmitter.call(this);

    // Initial data.
    this.balance = { value: 0, change: { daily: 0 } };
    this.transactions = [];
    this.contacts = [];

    // Loads previously stored data.
    this.setData(data);

  }

  Wallet.prototype = angular.extend({},EventEmitter.prototype,{

// - -------------------------------------------------------------------- - //

    // Loads the wallet.
    load: function() {
      if (!bitcoin.isP2SH(this.p2shAddress)) {
        throw new Error("invalid or missing wallet address");
      }

      // Saves wallet's blob upon changes.
      this.on("change",function() {
        var id = this.getWalletId();
        var blob = JSON.stringify(this.getData());
        api.updateWallet(id,blob,function() {
          this.emit("update");
        }.bind(this));
      });

      this.emit("load");
    },

    // Unloads the wallet.
    unload: function() {
      try {
        var keys = Object.keys(this);
        var length = keys.length;
        for (var i = 0; i < length; i++) {
          delete this[keys[i]];
        }
      } catch(e) {}
    },

// - -------------------------------------------------------------------- - //

    // Loads wallet's data.
    setData: function(data) {
      if (angular.isObject(data)) {
        var length = DATA_KEYS.length;
        for (var i = 0; i < length; i++) {
          var key = DATA_KEYS[i];
          if (angular.isDefined(data[key])) {
            if (key === "contacts") {
              this.setContacts(data[key]);
            } else if (key === "p2shAddress") {
              this.setAddress(data[key]);
            } else if (key === "private") {
              var key = Bitcoin.ECKey.fromWIF(data[key]);
              this.clientPrivateKey = key.toWIF(bitcoin.network);
            } else {
              this[key] = data[key];
            }
          }
        }
      }
    },

    // Returns wallet's blob to be encrypted and stored.
    getData: function() {
      var data = {};
      var length = DATA_KEYS.length;
      for (var i = 0; i < length; i++) {
        var key = DATA_KEYS[i];
        if (angular.isDefined(this[key])) {
          data[key] = angular.copy(this[key]);
        }
      }
      return data;
    },

// - -------------------------------------------------------------------- - //

    // Returns wallet's id.
    getWalletId: function() {
      return this.walletId;
    },

    // Defines wallet's p2sh address.
    setAddress: function(address) {
      if (!bitcoin.isAddress(address)) {
        throw new Error("invalid or missing address");
      }
      this.p2shAddress = address;
      this.network = bitcoin.getNetwork(address);
    },

    // Returns wallet's address.
    getAddress: function() {
      return this.p2shAddress;
    },

    // Defines wallet's label.
    setLabel: function(label) {
      if (this.label !== label) {
        this.label = label;
        this.emit("change");
      }
    },

    // Returns wallet's label.
    getLabel: function() {
      return this.label;
    },

// - -------------------------------------------------------------------- - //

    // Sets wallet's contact list.
    setContacts: function(contacts) {
      if (angular.isArray(contacts)) {
        var length = contacts.length
        for (var i = 0; i < length; i++) {
          this.contacts[i] = contacts[i];
        }
      }
    },

    // Returns contact list.
    getContacts: function() {
      return this.contacts;
    },

    // Finds contact by its address.
    getContact: function(address) {
      var contact;
      var length = this.contacts.length;
      for (var i = 0; i < length; i++) {
        var item = this.contacts[i];
        if (item.address === address) {
          contact = item;
          break;
        }
      }
      return contact;
    },

    // Adds a contact to wallet's contact list.
    addContact: function(data) {
      if (angular.isObject(data)) {
        var contact = {};
        Object.keys(data).forEach(function(key) {
          if (angular.isString(data[key])) {
            contact[key] = data[key];
          }
        });
        this.contacts.push(contact);
        this.emit("change");
      }
    },

    // Deletes a contact from wallet's contact list.
    deleteContact: function(contact) {
      var length = this.contacts.length;
      for (var i = 0; i < length; i++) {
        var item = this.contacts[i];
        if (item === contact) {
          this.contacts.splice(i,1);
          break;
        }
      }
      if (length > this.contacts.length) {
        this.emit("change");
      }
    },

    // Edits a contact info or adds new if does not exists.
    saveContact: function(data) {
      if (angular.isObject(data)) {
        var contact = this.getContact(data.address);
        if (contact) {
          Object.keys(data).forEach(function(key) {
            if (angular.isString(data[key])) {
              contact[key] = data[key];
            }
          });
        } else {
          this.addContact(data);
        }
        this.emit("change");
      }
    },

// - -------------------------------------------------------------------- - //

    // Creates a bitcoin URI to receive a payment.
    createURI: function(amount,callback) {
      if (!bitcoin.isAddress(this.p2shAddress)) {
        throw new Error("invalid or missing wallet address");
      }
      var uri = "bitcoin:";
      uri += this.p2shAddress;
      if (angular.isNumber(amount)) {
        uri += "?amount=" + amount;
      }
      return uri;
    },

// - -------------------------------------------------------------------- - //

    // Creates a new bitcoin transaction.
    createTransaction: function(address,amount,callback) {
      var error = null;
      if (!bitcoin.isAddress(address)) {
        error = new Error("invalid or missing address");
      }
      if (!error && !bitcoin.isP2SH(this.p2shAddress)) {
        error = new Error("invalid or missing wallet address");
      }
      if (!error && bitcoin.getNetwork(address) !== this.network) {
        error = new Error("network does not match");
      }
      if (!error && !angular.isNumber(amount) || amount < 0.00001) {
        error = new Error("invalid or missing amount");
      }
      if (!error && !bitcoin.isPublicKey(this.public)) {
        error = new Error("invalid or missing wallet public key");
      }
      if (!error && !bitcoin.isPrivateKey(this.clientPrivateKey)) {
        error = new Error("invalid or missing wallet private key");
      }
      if (!error && !this.serverPublicKey || !bitcoin.isPublicKey(bitcoin.publicKeyBase64ToHex(this.serverPublicKey))) {
        error = new Error("invalid or missing server public key");
      }
      if (error) {
        angular.isFunction(callback) && callback.call(this,error);
      } else {
        var newTx = this._newTx(address,amount,true);
        Blockcypher.api.newTransaction(newTx,function(error,data) {
          if (!error && data && data.errors) {
            if (data.errors[0] && data.errors[0].error && /has an input referencing an unknown transaction|transaction to spend for address/.test(data.errors[0].error)) {
              error = new Error("not enough funds");
            } else {
              error = new Error("invalid transaction input");
            }
          }
          if (!error && data && data.tx && data.tx.addresses[0] !== this.p2shAddress) {
            error = new Error("received address does not match");
          }
          if (error) {
            angular.isFunction(callback) && callback.call(this,error);
          } else {
            var tx = this._signedTx(data,address,amount);
            callback.call(this,null,tx);
          }
        }.bind(this));
      }
    },

    // Sends transaction to server.
    sendTransaction: function(tx,callback) {
      api.sendTransaction(this.walletId,tx,function(error,data) {
        if (!error && data && /Included fees too low at 0/.test(data.message)) {
          error = new Error("fees too low");
        }
        if (!error && data && /\"error\"/.test(data.message)) {
          error = new Error(data.message);
        }
        if (!error) {
          try {
            data = JSON.parse(data.message).tx;
          } catch(e) { error = e; }
        }
        if (error) {
          angular.isFunction(callback) && callback.call(this,error);
        } else {
          var tx = blockchain.blockcypher.readTransactionItem(data,this.p2shAddress)
          angular.isFunction(callback) && callback.call(this,null,tx);
        }
      }.bind(this));
    },

// - -------------------------------------------------------------------- - //

    _newTx: function(address,amount,unconfirmed) {
      var serverHexPubKey = bitcoin.publicKeyBase64ToHex(this.serverPublicKey);
      var newTx = {
        inputs: [{
          addresses : [this.public,serverHexPubKey],
          script_type: "multisig-2-of-2"
        }],
        outputs: [{
          addresses: [address],
          value: Math.floor(amount * Math.pow(10,8)),
        }]
      };
      if (unconfirmed === true) {
        newTx.confirmations = -1;
      }
      if (bitcoin.isP2SH(address)) {
        newTx.outputs[0].script_type = "pay-to-script-hash";
      }
      return newTx;
    },

    _signedTx: function(data,address,amount) {
      var value = Math.floor(amount * Math.pow(10,8));
      var tx = new Bitcoin.Transaction();
      var sumInputs = 0;
      data.tx.inputs.forEach(function(input) {
        sumInputs += input.output_value;
        tx.addInput(input.prev_hash,input.output_index);
      });
      var sumOutputs = 0;
      data.tx.outputs.forEach(function(output) {
        sumOutputs += output.value;
      });
      var changeAmount = data.tx.total - value;
      tx.addOutput(address,value);
      if (changeAmount > 0) {
        tx.addOutput(this.p2shAddress,changeAmount);
      }
      var userPubKey = Bitcoin.ECPubKey.fromHex(this.public);
      var serverHexPubKey = bitcoin.publicKeyBase64ToHex(this.serverPublicKey);
      var serverPubKey = Bitcoin.ECPubKey.fromHex(serverHexPubKey);
      var redeemScript = Bitcoin.scripts.multisigOutput(2,[userPubKey,serverPubKey]);
      var userKey = Bitcoin.ECKey.fromWIF(this.clientPrivateKey,bitcoin.network);
      var signedTx = {
        inputs: [],
        changeAmount: changeAmount,
        destination: {
          amount: value,
          address: address,
        },
      };
      data.tx.inputs.forEach(function(input,i) {
        var hash = tx.hashForSignature(i,redeemScript,Bitcoin.Transaction.SIGHASH_ALL);
        var signature = userKey.sign(hash);
        signedTx.inputs[i] = {
          previousTransactionHash: input.prev_hash,
          outputIndex: input.output_index,
          signature: signature.toDER().toString("base64"),
        };
      });
      return signedTx;
    },

// - -------------------------------------------------------------------- - //

  });

  return Wallet;
}]);

// - -------------------------------------------------------------------- - //
