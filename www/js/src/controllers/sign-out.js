// - -------------------------------------------------------------------- - //

App.controller("SignOutController",function(Bitgold) {
  Bitgold.session.clear();
  Bitgold.session.path("/");
});

// - -------------------------------------------------------------------- - //
