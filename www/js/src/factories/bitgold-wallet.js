// - -------------------------------------------------------------------- - //

App.factory("bgWallet",["bgclsWallet","bgApi","bgSession","bgBitcoin","$timeout","blockchain",function(Wallet,api,session,bitcoin,$timeout,blockchain) {

  return {

    _wallet: null,
    _websocket: null,

    _balance: {
      loaded: false,
      source: "wallet",
      currency: "BTC",
      value: 0,
      change: { daily: 0 },
      unconfirmed: 0,
    },

    _transactions: [],

// - -------------------------------------------------------------------- - //

    // Sets current wallet.
    setWallet: function(wallet) {
      this._wallet = wallet;
    },

    // Gets current wallet.
    getWallet: function() {
      return this._wallet;
    },

    isWalletLoaded: function() {
      return this._wallet instanceof Wallet;
    },

    // Gets wallet's balance.
    getBalance: function() {
      return this._balance;
    },

    // Gets wallet's transactions.
    getTransactions: function() {
      return this._transactions;
    },

// - -------------------------------------------------------------------- - //

    // Loads users wallet.
    load: function(callback) {
      if (this.isWalletLoaded()) {
        $timeout(function() {
          callback(null,this.getWallet());
        }.bind(this));
      } else {
        api.listWallets(function(error,list) {
          if (error) {
            callback(error);
          } else if (list.length === 0) {
            this.createWallet(callback);
          } else {
            var walletId = list[list.length - 1].walletId;
            this.loadWallet(walletId,callback);
          }
        }.bind(this));
      }
    },

    // Unloads current wallet.
    unload: function() {
      if (this.isWalletLoaded()) {
        this.getWallet().unload();
        this.setWallet(null);
        this.destroySocket();
      }
    },

    // Loads a wallet by its id.
    loadWallet: function(walletId,callback) {
      api.getWallet(walletId,function(error,blob) {
        if (error) {
          angular.isFunction(callback) && callback(error);
        } else {
          var data;
          if (angular.isObject(blob)) {
            data = blob;
          } else if (angular.isString(blob)) {
            try { data = JSON.parse(blob) } catch(e) { error = e };
          } else {
            error = new Error("unkown error");
          }
          if (error) {
            angular.isFunction(callback) && callback(error);
          } else {
            var publicKey = bitcoin.publicKeyHexToBase64(data.public);
            if (bitcoin.isP2PKH(data.address)) {
              data.transactions = {};
              data.balance = { value: 0, change: { daily: 0 } };
            }
            this.loadWalletProps(walletId,publicKey,function(error,props) {
              if (error) {
                angular.isFunction(callback) && callback(error);
              } else {
                data.walletId = walletId;
                data.p2shAddress = props.p2shAddress;
                data.serverPublicKey = props.serverPublicKey;
                var wallet = new Wallet(data);
                wallet.load();
                this.setWallet(wallet);
                this.createSocket();
                angular.isFunction(callback) && callback(null,wallet);
              }
            }.bind(this));
          }
        }
      }.bind(this));
    },

    // Loads wallet's props.
    loadWalletProps: function(walletId,publicKey,callback) {
      api.getWalletProps(walletId,function(error,props) {
        if (error) {
          angular.isFunction(callback) && callback(error);
        } else {
          if (props.clientPublicKey === publicKey && props.serverPublicKey && props.p2shAddress) {
            callback(null,props);
          } else {
            api.setWalletProps(walletId,{ clientPublicKey: publicKey },callback);
          }
        }
      });
    },

    // Creates new wallet and stores its blob.
    createWallet: function(callback) {
      var keys = bitcoin.generateKeys();
      var blob = JSON.stringify(keys);
      api.addWallet(blob,function(error,data) {
        if (error) {
          angular.isFunction(callback) && callback(error);
        } else {
          this.loadWallet(data.walletId,callback);
        }
      }.bind(this));
    },

// - -------------------------------------------------------------------- - //

    // Loads initial wallet's balance.
    loadBalance: function(callback) {
      this.load(function(error,wallet) {
        if (error) {
          angular.isFunction(callback) && callback(error);
        } else {
          if (this._balance.loaded) {
            angular.isFunction(callback) && callback(null,this._balance);
          } else {
            var options = {
              address: wallet.getAddress(),
              limit: 5,
              offset: 0,
            };
            blockchain.getTransactionList(options,function(error,data) {
              if (error) {
                angular.isFunction(callback) && callback(error);
              } else {
                this._balance.loaded = true;
                this._balance.value = data.balance;
                this._balance.unconfirmed = data.unconfirmed;
                this.pushTransactions(data.transactions);
                this.loadBalanceChange(callback);
              }
            }.bind(this));
          }
        }
      }.bind(this));
    },

    // Loads wallet's balance change.
    loadBalanceChange: function(callback,force) {
      if (this.updateBalanceChange(force)) {
        angular.isFunction(callback) && callback(null,this._balance);
      } else {
        var before = this._transactions.length;
        this.loadTransactions(10,function(error,transactions) {
          if (error) {
            angular.isFunction(callback) && callback(error);
          } else {
            var loaded = transactions.length - before;
            this.loadBalanceChange(callback,loaded < 10);
          }
        }.bind(this));
      }
    },

    // Updates wallet's balance daily change.
    updateBalanceChange: function(force) {
      var success = !!force;
      var today = new Date().toISOString().split("T").shift();
      var change = 0;
      this._transactions.forEach(function(tx) {
        if (tx.date) {
          var date = tx.date.split("T").shift();
          if (date === today) {
            change += tx.amount;
          } else {
            success = true;
          }
        }
      });
      if (this._transactions.length < 5) {
        success = true;
      }
      if (success) {
        this._balance.change.daily = change;
      }
      return success;
    },

    // Pushes more transactions to the bound list.
    pushTransactions: function(transactions) {
      if (angular.isArray(transactions)) {
        var length = transactions.length;
        for (var i = 0; i < length; i++) {
          var tx = transactions[i];
          if (!this.getTransaction(tx.hash)) {
            this._transactions.push(tx);
          }
        }
      }
    },

    // Returns the transaction of given hash.
    getTransaction: function(hash) {
      var tx;
      var length = this._transactions.length;
      for (var i = 0; i < length; i++) {
        if (this._transactions[i].hash === hash) {
          tx = this._transactions[i];
          break;
        }
      }
      return tx;
    },

    // Adds a new transaction and computes balance change.
    addTransaction: function(tx) {
      var exists = this.getTransaction(tx.hash);
      var emit = false;
      if (exists) {
        Object.keys(tx).forEach(function(key) {
          if (tx[key] !== exists[key]) {
            if (key === "confirmations") {
              if (exists[key] === 0) {
                emit = true;
              }
            }
            exists[key] = tx[key];
          }
        });
      } else {
        emit = true;
        this._transactions.unshift(tx);
      }
      if (emit) {
        if (tx.confirmations === 0) {
          this._balance.unconfirmed += tx.amount;
        } else {
          this._balance.unconfirmed -= tx.amount;
          this._balance.value += tx.amount;
        }
      }
      if (tx.confirmations > 0) {
        this.updateBalanceChange(true);
      }
    },

    // Load one transaction.
    loadTransaction: function(hash,callback) {
      this.load(function(error,wallet) {
        if (error) {
          angular.isFunction(callback) && callback(error);
        } else {
          var options = {
            address: wallet.getAddress(),
            hash: hash,
          };
          blockchain.getTransactionItem(options,function(error,data) {
            if (error) {
              angular.isFunction(callback) && callback(error);
            } else {
              angular.isFunction(callback) && callback(null,data);
            }
          }.bind(this));
        }
      }.bind(this));
    },

    // Load more transactions.
    loadTransactions: function(limit,callback) {
      this.load(function(error,wallet) {
        if (error) {
          angular.isFunction(callback) && callback(error);
        } else {
          var options = {
            address: wallet.getAddress(),
          };
          if (limit > 0) {
            var offset = this._transactions.length;
            var mod = offset % limit;
            if (mod > 0) {
              limit = limit - mod;
            }
            options.limit = limit;
            options.offset = offset;
          }
          blockchain.getTransactionList(options,function(error,data) {
            if (error) {
              angular.isFunction(callback) && callback(error);
            } else {
              this.pushTransactions(data.transactions);
              angular.isFunction(callback) && callback(null,this._transactions);
            }
          }.bind(this));
        }
      }.bind(this));
    },

    // Connects websocket for live updates.
    createSocket: function(callback) {
      this.load(function(error,wallet) {
        if (error) {
          angular.isFunction(callback) && callback(error);
        } else {
          var ws = this._websocket = blockchain.createSocket(wallet.getAddress());
          ws.on("error",function(error) {
            console.log(error);
          });
          ws.on("transaction",function(tx) {
            this.addTransaction(tx);
          }.bind(this));
          ws.connect();
        }
      }.bind(this));
    },

    // Disconnects websocket.
    destroySocket: function() {
      if (this._websocket) {
        this._websocket.disconnect();
        this._websocket = null;
      }
    },

  };

}]);
