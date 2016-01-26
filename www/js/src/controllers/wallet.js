// - -------------------------------------------------------------------- - //

App.controller("WalletController",function($scope,$routeParams,Bitgold,blockchain) {

  // Redirects to sign-in if not authenticated.
  if (!Bitgold.session.isAuthenticated()) {
    Bitgold.session.path("/sign-in");
    return;
  }

  // Redirects to overview if there's no module defined.
  if (!$routeParams.module) {
    Bitgold.session.path("/wallet/overview");
    return;
  }

  // Globals.
  $scope.lang = $scope.$root.lang;
  $scope.features = $scope.$root.features;

  // Displays error message.
  $scope.showError = function(error) {
    if (error.message === "403") {
      Bitgold.session.clear();
      Bitgold.session.path("/sign-in");
    } else {
      alert(error.message);
    }
  };

  // Initializes view data.
  $scope.view = {};
  $scope.view[$routeParams.module] = true;
  $scope.loading = true;

// - -------------------------------------------------------------------- - //

  // Loads beep audio.
  var beep = new Audio("audio/beep-07.mp3");

  // Initializes wallet data.
  $scope.wallet = {};

  // Initializes blockchain data.
  $scope.balance = Bitgold.wallet.getBalance();
  $scope.transactions = Bitgold.wallet.getTransactions();

  // Transactions view values.
  $scope.tx = {
    list: $scope.view.overview,
    view: false,
    more: $scope.view.transactions,
    size: $scope.view.transactions ? 10 : 5,
    hash: $scope.view.transactions ? $routeParams.identifier : null,
  };

  // Contacts view values.
  $scope.ct = {
    form: false,
    view: false,
    list: false,
    address: $scope.view.contacts ? $routeParams.identifier : null,
  };

  // Loads user's wallet.
  Bitgold.wallet.load(function(error,wallet) {
    if (error) {
      $scope.showError(error);
    } else {

      // Binds wallet's data to scope.
      $scope.wallet.label = wallet.getLabel() || Bitgold.session.getProfile().firstName + "`s Wallet";
      $scope.wallet.address = wallet.getAddress();
      $scope.wallet.contacts = wallet.getContacts();

      // Watches label changes.
      watchLabel();

      // Loads wallet's balance.
      Bitgold.wallet.loadBalance(function(error,balance) {
        if (error) {
          $scope.showError(error);
        } else {

          $scope.loading = false;

          // Gets currency switch preference.
          $scope.currencySwitch = Bitgold.session.getPrefs("walletCurrencySwitch");

          // Notifies new transactions.
          watchTransactions();

          // Notifies balance changes.
          watchBalance();
        }
      });

      // Loads remaining transactions for tx list page.
      if ($scope.view.transactions) {
        if ($scope.tx.hash) {
          Bitgold.wallet.loadTransaction($scope.tx.hash,function(error,tx) {
            if (error) {
              $scope.showError(error);
            } else {
              tx.toContact = wallet.getContact(tx.to[0]);
              tx.fromContact = wallet.getContact(tx.from[0]);
              $scope.tx.item = tx;
              $scope.tx.view = true;
              $scope.tx.list = false;
              $scope.loading = false;
            }
          });
        } else {
          $scope.tx.list = true;
          if ($scope.transactions.length < $scope.tx.size) {
            $scope.loadTransactions(function() {
              $scope.loading = false;
            });
          } else {
            $scope.loading = false;
          }
        }

      } else {

        $scope.send = {
          to: $scope.view.send ? $routeParams.identifier : null,
        };

        $scope.receive = {
          email: $scope.view.receive ? $routeParams.identifier : null,
        };
      }

      // Loads selected contact for contact view page.
      if ($scope.view.contacts) {
        if ($scope.ct.address) {
          var contact = wallet.getContact($scope.ct.address);
          if (contact) {
            $scope.contact = contact;
            $scope.ct.view = true;
            $scope.ct.list = false;
          } else {
            $scope.ct.list = false;
            $scope.ct.form = true;
            $scope.contact = { address: $scope.ct.address };
          }
        } else {
          $scope.ct.list = true;
        }
      }

    }
  });

// - -------------------------------------------------------------------- - //

  // Executes callback when finished loading
  function watchLoading(callback) {
    var stop = $scope.$watch(function() {
      return $scope.loading;
    },function(loading) {
      if (!loading) {
        callback();
        stop();
      }
    });
  }

  // Watches wallet's label for changes.
  function watchLabel() {
    $scope.$watch(function() {
      return $scope.wallet.label || Bitgold.session.getProfile().firstName + "`s Wallet";
    },function(label) {
      var wallet = Bitgold.wallet.getWallet();
      if (wallet) {
        wallet.setLabel(label);
      }
    });
  }

  // Plays a sound and refresh UI upon new tx.
  function watchBalance() {
    var changed = false;
    $scope.$watch(function() {
      return $scope.balance.value;
    },function() {
      if (changed) {
        if (!$scope.$$phase) {
          $scope.$apply();
        }
        beep.play();
      }
      changed = true;
    });
  }

  // Plays a sound and refresh UI upon new tx.
  function watchTransactions() {
    var changed = false;
    $scope.$watch(function() {
      return $scope.transactions.length;
    },function() {
      if (changed) {
        if (!$scope.$$phase) {
          $scope.$apply();
        }
        if ($scope.tx.loading) {
          $scope.tx.loading = false;
        } else {
          beep.play();
        }
      }
      changed = true;
    });
  }

// - -------------------------------------------------------------------- - //

  // Saves currency switch to preferences.
  $scope.applyCurrencySwitch = function() {
    $scope.currencySwitch = !$scope.currencySwitch;
    Bitgold.api.updatePreferences({
      walletCurrencySwitch: $scope.currencySwitch,
    },function(error) {
      if (error) {
        $scope.showError(error);
      }
    });
  };

  // Loads more transactions.
  $scope.loadTransactions = function(callback) {
    var limit = 10;
    var length = $scope.transactions.length;
    $scope.tx.loading = true;
    Bitgold.wallet.loadTransactions(limit,function(error) {
      if (error) {
        $scope.showError(error);
      } else {
        $scope.tx.size += limit;
        $scope.tx.more = length < $scope.transactions.length;
      }
      angular.isFunction(callback) && callback();
    });
  };

  // Loads all transactions.
  $scope.loadAllTransactions = function(callback) {
    if ($scope.tx.more) {
      $scope.tx.loading = true;
      Bitgold.wallet.loadTransactions(0,function(error,length) {
        if (error) {
          $scope.showError(error);
        } else {
          $scope.tx.size = $scope.transactions.length;
          $scope.tx.more = false;
        }
        angular.isFunction(callback) && callback();
      });
    } else {
      angular.isFunction(callback) && callback();
    }
  };

// - -------------------------------------------------------------------- - //

  // Sends a payment.
  $scope.sendPayment = function() {
    var wallet = Bitgold.wallet.getWallet();
    if (wallet) {
      if ($scope.formSend.$valid) {
        wallet.createTransaction($scope.send.to,$scope.send.amount,function(error,tx) {
          if (error) {
            $scope.showError(error);
          } else {
            wallet.sendTransaction(tx,function(error,data) {
              if (error) {
                $scope.showError(error);
              } else {
                $scope.send = {};
                Bitgold.wallet.addTransaction(data);
              }
            });
          }
        });
      }
    } else {
      $scope.showError(new Error("wallet is not loaded"));
    }
  };

// - -------------------------------------------------------------------- - //

  // Gets contact for tx list.
  $scope.getTxContact = function(tx) {
    var wallet = Bitgold.wallet.getWallet();
    if (wallet) {
      var address = tx.amount < 0 ? tx.to[0] : tx.from[0];
      if (address) {
        return wallet.getContact(address);
      }
    }
  };

// - -------------------------------------------------------------------- - //

  // Displays add contact form.
  $scope.addContact = function() {
    $scope.formContact.$setPristine();
    $scope.contact = {};
    $scope.ct.form = true;
    $scope.ct.edit = false;
  };

  // Displays edit contact form.
  $scope.editContact = function(contact) {
    $scope.formContact.$setPristine();
    $scope.contact = angular.copy(contact);
    $scope.ct.form = true;
    $scope.ct.edit = true;
    $scope.ct.view = false;
  };

  // Cancels add or edit contact action.
  $scope.cancelContact = function() {
    if ($scope.ct.address) {
      Bitgold.session.back();
    } else {
      $scope.formContact.$setPristine();
      $scope.contact = {};
      $scope.ct.form = false;
      $scope.ct.edit = false;
    }
  };

  // Saves a contact.
  $scope.saveContact = function() {
    var wallet = Bitgold.wallet.getWallet();
    if (wallet) {
      if ($scope.formContact.$valid) {
        wallet.saveContact($scope.contact);
        if (Bitgold.session.at("/wallet/contacts")) {
          $scope.contact = {};
          $scope.ct.list = true;
          $scope.ct.form = false;
        } else {
          Bitgold.session.back();
        }
      }
    } else {
      $scope.showError(new Error("wallet is not loaded"));
    }
  };

  // Deletes a contact.
  $scope.deleteContact = function(contact) {
    var wallet = Bitgold.wallet.getWallet();
    if (wallet) {
      wallet.deleteContact(contact);
      if (!Bitgold.session.at("/wallet/contacts")) {
        Bitgold.session.back();
      }
    } else {
      $scope.showError(new Error("wallet is not loaded"));
    }
  };

// - -------------------------------------------------------------------- - //

  // Creates bitcoin URI to receive payments.
  $scope.showQRCode = function() {
    var wallet = Bitgold.wallet.getWallet();
    if (wallet) {
      if (!$scope.receive) {
        $scope.receive = {};
      }
      $scope.receive.uri = wallet.createURI($scope.receive.amount);
      $scope.receive.qrcode = true;
    } else {
      $scope.showError(new Error("wallet is not loaded"));
    }
  };

  // Hides qrcode and resets receive payment form.
  $scope.hideQRCode = function() {
    $scope.receive.qrcode = false;
    $scope.receive = {};
  };

  // Sends a payment request by email.
  $scope.requestPayment = function() {
    Bitgold.api.sendPaymentRequest({
      email: $scope.receive.email,
      paymentUri: $scope.receive.uri,
    },function(error) {
      if (error) {
        $scope.showError(error);
      } else {
        $scope.hideQRCode();
      }
    });
  }

// - -------------------------------------------------------------------- - //

  $scope.$root.convertGold = function(convert) {
    if ($scope.formConvert.amount.$valid) {
      var amount = convert.amount;
      var usd = $scope.$root.exchange["USD"];
      var grams = (amount * usd.BTC) / usd["XAU.gr"];
      convert.grams = grams;
    }
  };

});

// - -------------------------------------------------------------------- - //
