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

  it("listWallets success",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(crypto.generateAESKey());
    session.setAuthToken(token);
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,[]);
    api.listWallets(function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,[]);
      done();
    });
    $httpBackend.flush();
  });

  it("listWallets auth error",function(done) {
    api.listWallets(function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"must be authenticated");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("listWallets remote error",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(crypto.generateAESKey());
    session.setAuthToken(token);
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(403,{});
    api.listWallets(function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"403");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

  it("addWallet success",function(done) {
    var key = crypto.generateAESKey();
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(key);
    session.setAuthToken(token);
    var wallet = JSON.stringify({ public: "public", private: "private", address: "address" });
    $httpBackend.expectPOST(
      "https://test.bitgold.com/api/wallets",
      function(sent) { return wallet === crypto.decryptData(key,sent) },
      function(headers) { return headers["X-Auth-Token"] === token && headers["Content-Type"] === "application/binary"; }
    ).respond(200,{});
    api.addWallet(wallet,function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{});
      done();
    });
    $httpBackend.flush();
  });

  it("addWallet auth error",function(done) {
    var wallet = JSON.stringify({ public: "public", private: "private", address: "address" });
    api.addWallet(wallet,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"must be authenticated");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("addWallet data error",function(done) {
    api.addWallet(null,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"invalid or missing data");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("addWallet remote error",function(done) {
    var key = crypto.generateAESKey();
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(key);
    session.setAuthToken(token);
    var wallet = JSON.stringify({ public: "public", private: "private", address: "address" });
    $httpBackend.expectPOST(
      "https://test.bitgold.com/api/wallets",
      function(sent) { return wallet === crypto.decryptData(key,sent) },
      function(headers) { return headers["X-Auth-Token"] === token && headers["Content-Type"] === "application/binary"; }
    ).respond(403,{});
    api.addWallet(wallet,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"403");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

  it("updateWallet success",function(done) {
    var key = crypto.generateAESKey();
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(key);
    session.setAuthToken(token);
    var id = "4558fa035dc34c84b1b0b9565a9a6e5a";
    var wallet = JSON.stringify({ public: "public", private: "private", address: "address" });
    $httpBackend.expectPUT(
      "https://test.bitgold.com/api/wallets/" + id,
      function(sent) { return wallet === crypto.decryptData(key,sent) },
      function(headers) { return headers["X-Auth-Token"] === token && headers["Content-Type"] === "application/binary"; }
    ).respond(200,{});
    api.updateWallet(id,wallet,function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{});
      done();
    });
    $httpBackend.flush();
  });

  it("updateWallet auth error",function(done) {
    var id = "4558fa035dc34c84b1b0b9565a9a6e5a";
    var wallet = JSON.stringify({ public: "public", private: "private", address: "address" });
    api.updateWallet(id,wallet,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"must be authenticated");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("updateWallet id error",function(done) {
    var wallet = JSON.stringify({ public: "public", private: "private", address: "address" });
    api.updateWallet(null,wallet,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"invalid or missing id");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("updateWallet data error",function(done) {
    var id = "4558fa035dc34c84b1b0b9565a9a6e5a";
    api.updateWallet(id,null,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"invalid or missing data");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("updateWallet remote error",function(done) {
    var key = crypto.generateAESKey();
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(key);
    session.setAuthToken(token);
    var id = "4558fa035dc34c84b1b0b9565a9a6e5a";
    var wallet = JSON.stringify({ public: "public", private: "private", address: "address" });
    $httpBackend.expectPUT(
      "https://test.bitgold.com/api/wallets/" + id,
      function(sent) { return wallet === crypto.decryptData(key,sent) },
      function(headers) { return headers["X-Auth-Token"] === token && headers["Content-Type"] === "application/binary"; }
    ).respond(403,{});
    api.updateWallet(id,wallet,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"403");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

  it("getWallet success",function(done) {
    var key = crypto.generateAESKey();
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(key);
    session.setAuthToken(token);
    var id = "4558fa035dc34c84b1b0b9565a9a6e5a";
    var wallet = JSON.stringify({ public: "public", private: "private", address: "address" });
    var encrypted = crypto.encryptData(key,wallet);
    var blob = new Blob([encrypted.buffer]);
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + id,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,blob,{ "Content-Type": "application/binary" });
    api.getWallet(id,function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,wallet);
      done();
    });
    $httpBackend.flush();
  });

  it("getWallet auth error",function(done) {
    var id = "4558fa035dc34c84b1b0b9565a9a6e5a";
    api.getWallet(id,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"must be authenticated");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("getWallet remote error",function(done) {
    var key = crypto.generateAESKey();
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(key);
    session.setAuthToken(token);
    var id = "4558fa035dc34c84b1b0b9565a9a6e5a";
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + id,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(403);
    api.getWallet(id,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"403");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

  it("getWalletProps success",function(done) {
    var key = crypto.generateAESKey();
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(key);
    session.setAuthToken(token);
    var id = "4558fa035dc34c84b1b0b9565a9a6e5a";
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + id + "/props",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{});
    api.getWalletProps(id,function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{});
      done();
    });
    $httpBackend.flush();
  });

  it("getWalletProps auth error",function(done) {
    var id = "4558fa035dc34c84b1b0b9565a9a6e5a";
    api.getWalletProps(id,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"must be authenticated");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("getWalletProps remote error",function(done) {
    var key = crypto.generateAESKey();
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(key);
    session.setAuthToken(token);
    var id = "4558fa035dc34c84b1b0b9565a9a6e5a";
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + id + "/props",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(403);
    api.getWalletProps(id,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"403");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

  it("setWalletProps success",function(done) {
    var key = crypto.generateAESKey();
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(key);
    session.setAuthToken(token);
    var id = "4558fa035dc34c84b1b0b9565a9a6e5a";
    $httpBackend.expectPUT(
      "https://test.bitgold.com/api/wallets/" + id + "/props",
      function() { return true },
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{});
    api.setWalletProps(id,{},function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{});
      done();
    });
    $httpBackend.flush();
  });

  it("setWalletProps auth error",function(done) {
    var id = "4558fa035dc34c84b1b0b9565a9a6e5a";
    api.setWalletProps(id,{},function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"must be authenticated");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("setWalletProps remote error",function(done) {
    var key = crypto.generateAESKey();
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(key);
    session.setAuthToken(token);
    var id = "4558fa035dc34c84b1b0b9565a9a6e5a";
    $httpBackend.expectPUT(
      "https://test.bitgold.com/api/wallets/" + id + "/props",
      function() { return true },
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(403);
    api.setWalletProps(id,{},function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"403");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

});

// - -------------------------------------------------------------------- - //
