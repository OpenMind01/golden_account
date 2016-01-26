// - -------------------------------------------------------------------- - //

describe("Bitgold.api",function() {

  beforeEach(module("Bitgold"));

  var api, crypto, session, $httpBackend;
  beforeEach(inject(function(bgApi,bgCrypto,bgSession,_$httpBackend_) {
    api = bgApi;
    crypto = bgCrypto;
    session = bgSession;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("sendTransaction success",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(crypto.generateAESKey());
    session.setAuthToken(token);
    var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
    $httpBackend.expectPOST(
      "https://test.bitgold.com/api/wallets/" + walletId + "/transactions",
      {},
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(201,{});
    api.sendTransaction(walletId,{},function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{});
      done();
    });
    $httpBackend.flush();
  });

  it("sendTransaction auth error",function(done) {
    var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
    api.sendTransaction(walletId,{},function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"must be authenticated");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("sendTransaction id error",function(done) {
    var walletId = null;
    api.sendTransaction(walletId,{},function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"invalid or missing id");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("sendTransaction tx error",function(done) {
    var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
    api.sendTransaction(walletId,null,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"invalid or missing transaction");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("sendTransaction remote error",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(crypto.generateAESKey());
    session.setAuthToken(token);
    var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
    $httpBackend.expectPOST(
      "https://test.bitgold.com/api/wallets/" + walletId + "/transactions",
      {},
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(403);
    api.sendTransaction(walletId,{},function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"403");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });


});

// - -------------------------------------------------------------------- - //
