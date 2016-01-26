// - -------------------------------------------------------------------- - //

describe("Bitgold.exchange",function() {

  this.timeout(5000);

  beforeEach(module("Bitgold"));

  var exchange;
  beforeEach(inject(function(bgExchange) {
    exchange = bgExchange;
  }));

  it("exchange load",function(done) {

    assert.ok(exchange instanceof Object);
    assert.strictEqual(Object.keys(exchange).length,1);
    assert.strictEqual(typeof exchange.load,"function");

    exchange.load(function() {
      assert.deepEqual(Object.keys(exchange),[
        "load","AED","AFN","ALL","AMD","ANG","AOA","ARS",
        "AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD",
        "BIF","BMD","BND","BOB","BRL","BSD","BTC","BTN",
        "BWP","BYR","BZD","CAD","CDF","CHF","CLF","CLP",
        "CNY","COP","CRC","CUP","CVE","CZK","DJF","DKK",
        "DOP","DZD","EEK","EGP","ERN","ETB","EUR","FJD",
        "FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF",
        "GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR",
        "ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD",
        "JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW",
        "KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL",
        "LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK",
        "MNT","MOP","MRO","MTL","MUR","MVR","MWK","MXN",
        "MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD",
        "OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG",
        "QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR",
        "SDG","SEK","SGD","SHP","SLL","SOS","SRD","STD",
        "SVC","SYP","SZL","THB","TJS","TMT","TND","TOP",
        "TRY","TTD","TWD","TZS","UAH","UGX","USD",
        "XAU.gr","UYU","UZS","VEF","VND","VUV",
        "WST","XAF","XAG","XAU","XCD","XDR","XOF","XPF",
        "YER","ZAR","ZMK","ZMW","ZWL",
      ]);
      done();
    });

  });

});

// - -------------------------------------------------------------------- - //