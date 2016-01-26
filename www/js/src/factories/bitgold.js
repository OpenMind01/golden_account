// - -------------------------------------------------------------------- - //

App.factory("Bitgold",["bgCrypto","bgSession","bgApi","bgWallet","bgExchange","bgLocation","bgBitcoin","bgVault","bgSummary",function(crypto,session,api,wallet,exchange,location,bitcoin,vault,summary) {

  return window.Bitgold = {
    api: api,
    crypto: crypto,
    bitcoin: bitcoin,
    session: session,
    wallet: wallet,
    exchange: exchange,
    location: location,
    vault: vault,
    summary: summary,
  };

}]);

// - -------------------------------------------------------------------- - //
