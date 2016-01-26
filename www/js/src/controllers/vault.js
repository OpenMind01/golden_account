// - -------------------------------------------------------------------- - //

App.controller("VaultController",function($scope,Bitgold,$routeParams) {

  // Redirects to sign-in if not authenticated.
  if (!Bitgold.session.isAuthenticated()) {
    Bitgold.session.path("/sign-in");
    return;
  }

  // Redirects to overview if there's no module defined.
  if (!$routeParams.module) {
    Bitgold.session.path("/vault/overview");
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
  $scope.loading = false;

// - -------------------------------------------------------------------- - //

  $scope.tx = {
    size: $scope.view.overview ? 5 : 10,
  };

  // Initilizes vault data.
  $scope.balance = Bitgold.vault.getBalance();
  $scope.transactions = Bitgold.vault.getTransactions();

});

// - -------------------------------------------------------------------- - //
