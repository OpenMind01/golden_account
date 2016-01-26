// - -------------------------------------------------------------------- - //

App.controller("SummaryController",function($scope,$routeParams) {

  // Redirects to sign-in if not authenticated.
  if (!Bitgold.session.isAuthenticated()) {
    Bitgold.session.path("/sign-in");
    return;
  }

  // Redirects to overview if there's no module defined.
  if (!$routeParams.module) {
    Bitgold.session.path("/summary/overview");
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

  $scope.tx = {
    size: $scope.view.transactions ? 10 : 5,
    list: $scope.view.overview || $scope.view.transactions,
    sort: "-date",
  };

  // Loads beep audio.
  var beep = new Audio("audio/beep-07.mp3");

  // Initilizes summary data.
  $scope.balance = Bitgold.summary.getBalance();
  $scope.transactions = Bitgold.summary.getTransactions();

  Bitgold.summary.loadBalance(function() {

    $scope.loading = false;

    // Notifies balance changes.
    watchBalance();

    // Updates chart when currency changes.
    watchCurrency();

    // Notifies new transactions.
    watchTransactions();

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

  // Plays a sound and refresh UI upon new tx.
  function watchBalance() {
    var changed = false;
    $scope.$watch(function() {
      var value = "";
      if ($scope.$root.currency && $scope.$root.exchange[$scope.$root.currency]) {
        var length = $scope.balance.sources.length;
        for (var i = 0; i < length; i++) {
          var item = $scope.balance.sources[i];
          value += "_" + item.value.toString();
        }
      }
      return value;
    },function(value) {
      if (value) {
        makePieChart();
        if (changed) {
          beep.play();
        }
        changed = true;
      }
    });
  }

  // Updates pie chart.
  function watchCurrency() {
    $scope.$watch(function() {
      return $scope.$root.currency;
    },function(value) {
      makePieChart();
    });
  }

  // Plays a sound and refresh UI upon new tx.
  function watchTransactions() {
    var changed = false;
    $scope.$watch(function() {
      return $scope.transactions.wallet.length.toString()
        + "_" + $scope.transactions.vault.length.toString()
        + "_" + $scope.transactions.investments.length.toString();
    },function() {
      joinTransactions();
      if (changed) {
        if (!$scope.$$phase) {
          $scope.$apply();
        }
        beep.play();
      }
      changed = true;
    });
  }

  function joinTransactions() {
    while ($scope.transactions.all.length > 0) {
      $scope.transactions.all.shift();
    }
    Object.keys($scope.transactions).forEach(function(key) {
      if (key !== "all") {
        var length = $scope.transactions[key].length;
        for (var i = 0; i < length; i++) {
          var tx = $scope.transactions[key][i];
          $scope.transactions.all.push(tx);
        }
      }
    });
  }

  // Generates pie chart data.
  function makePieChart() {
    var piechart = [];
    $scope.balance.value = 0;
    $scope.balance.change.daily = 0;
    var length = $scope.balance.sources.length;
    for (var i = 0; i < length; i++) {
      var item = $scope.balance.sources[i];
      var value = item.value * $scope.$root.exchange[$scope.$root.currency][item.currency];
      var change = item.change.daily * $scope.$root.exchange[$scope.$root.currency][item.currency];
      $scope.balance.value += value;
      $scope.balance.change.daily += change;
    }
    for (var i = 0; i < length; i++) {
      var item = $scope.balance.sources[i];
      var value = item.value * $scope.$root.exchange[$scope.$root.currency][item.currency];
      item.share = (value / $scope.balance.value) * 100;
      piechart.push({
        value: value,
        color: $scope.lang.summary.colors[item.source],
        highlight: $scope.lang.summary.colors[item.source],
        label: $scope.lang.currencySymbol[$scope.$root.currency] + " " + value.toFixed(2) + " (" + item.share.toFixed(0) + "%)",
      });
    }
    $scope.balance.piechart = piechart;
  }

// - -------------------------------------------------------------------- - //

  $scope.displayPrefs = false;

  $scope.showPrefs = function() {
    $scope.displayPrefs = true;
  };

  $scope.savePrefs = function() {
    if ($scope.formPrefs.$valid) {
      Bitgold.api.updatePreferences($scope.prefs,function(error) {
        if (error) {
          $scope.showError(error);
        } else {
          $scope.displayPrefs = false;
        }
      });
    }
  };

  $scope.cancelPrefs = function() {
    $scope.displayPrefs = false;
  };

// - -------------------------------------------------------------------- - //

});

// - -------------------------------------------------------------------- - //
