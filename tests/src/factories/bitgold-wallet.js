// - -------------------------------------------------------------------- - //

describe("Bitgold.wallet",function() {

  beforeEach(module("Bitgold"));

  var wallet, crypto, session, $httpBackend, bitcoin;
  beforeEach(inject(function(bgWallet,bgCrypto,bgSession,_$httpBackend_,bgBitcoin) {
    session = bgSession;
    crypto = bgCrypto;
    bitcoin = bgBitcoin;
    wallet = bgWallet;
    $httpBackend = _$httpBackend_;
  }));

  it("before load",function() {
    assert.strictEqual(wallet.getWallet(),null);
    assert.strictEqual(wallet.isWalletLoaded(),false);
  });

  it("load wallet props success",function(done) {
    var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
    var publicKey = bitcoin.publicKeyHexToBase64(bitcoin.generateKeys().public);
    var serverPublicKey = bitcoin.publicKeyHexToBase64(bitcoin.generateKeys().public);
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    var key = crypto.generateAESKey();
    session.setAESKey(key);
    session.setAuthToken(token);
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + walletId + "/props",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{
      p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
      clientPublicKey: publicKey,
      serverPublicKey: serverPublicKey,
    });
    wallet.loadWalletProps(walletId,publicKey,function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{
        p2shAddress: "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5",
        clientPublicKey: publicKey,
        serverPublicKey: serverPublicKey,
      });
      done();
    });
    $httpBackend.flush();
  });

  it("load wallet props set public key success",function(done) {
    var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
    var publicKey = bitcoin.publicKeyHexToBase64(bitcoin.generateKeys().public);
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    var key = crypto.generateAESKey();
    session.setAESKey(key);
    session.setAuthToken(token);
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + walletId + "/props",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{});
    $httpBackend.expectPUT(
      "https://test.bitgold.com/api/wallets/" + walletId + "/props",
      { clientPublicKey: publicKey },
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{});
    wallet.loadWalletProps(walletId,publicKey,function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{});
      done();
    });
    $httpBackend.flush();
  });

  it("load wallet props remote error",function(done) {
    var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
    var publicKey = bitcoin.publicKeyHexToBase64(bitcoin.generateKeys().public);
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    var key = crypto.generateAESKey();
    session.setAESKey(key);
    session.setAuthToken(token);
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + walletId + "/props",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(403);
    wallet.loadWalletProps(walletId,publicKey,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"403");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

  it("load wallet props auth error",function(done) {
    var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
    var publicKey = bitcoin.publicKeyHexToBase64(bitcoin.generateKeys().public);
    wallet.loadWalletProps(walletId,publicKey,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"must be authenticated");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

  it("load wallet success",function(done) {
    var address = "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5";
    var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
    var keys = bitcoin.generateKeys();
    var publicKey = bitcoin.publicKeyHexToBase64(keys.public);
    var serverPublicKey = bitcoin.publicKeyHexToBase64(bitcoin.generateKeys().public);
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    var key = crypto.generateAESKey();
    session.setAESKey(key);
    session.setAuthToken(token);
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + walletId,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,JSON.stringify(keys),{ "Content-Type": "text/plain" });
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + walletId + "/props",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{
      p2shAddress: address,
      clientPublicKey: publicKey,
      serverPublicKey: serverPublicKey,
    });
    wallet.loadWallet(walletId,function(error,data) {
      assert.strictEqual(error,null);
      assert.strictEqual(wallet.getWallet(),data);
      assert.ok(wallet.isWalletLoaded());
      done();
    });
    $httpBackend.flush();
  });

  it("create wallet success",function(done) {
    var address = "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5";
    var serverPublicKey = bitcoin.publicKeyHexToBase64(bitcoin.generateKeys().public);
    var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    var key = crypto.generateAESKey();
    session.setAESKey(key);
    session.setAuthToken(token);
    var publicKey;
    var keys;
    $httpBackend.expectPOST(
      "https://test.bitgold.com/api/wallets",
      function(sent) {
        var decrypted = crypto.decryptData(key,sent);
        keys = JSON.parse(decrypted);
        publicKey = bitcoin.publicKeyHexToBase64(keys.public);
        return (bitcoin.isPublicKey(keys.public) && bitcoin.isPrivateKey(keys.private));
      },
      function(headers) { return headers["X-Auth-Token"] === token && headers["Content-Type"] === "application/binary"; }
    ).respond(200,{ walletId: walletId });
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + walletId,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(function() {
      return [200,keys,{ "Content-Type": "text/plain" }];
    });
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + walletId + "/props",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{});
    $httpBackend.expectPUT(
      "https://test.bitgold.com/api/wallets/" + walletId + "/props",
      function(got) { return JSON.parse(got).clientPublicKey === publicKey; },
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{
      p2shAddress: address,
      clientPublicKey: publicKey,
      serverPublicKey: serverPublicKey,
    });
    wallet.createWallet(function(error,data) {
      assert.strictEqual(error,null);
      assert.strictEqual(wallet.getWallet(),data);
      assert.ok(wallet.isWalletLoaded());
      done();
    });
    $httpBackend.flush();
  });

  it("create wallet auth error",function(done) {
    wallet.createWallet(function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"must be authenticated");
      assert.ok(!wallet.isWalletLoaded());
      done();
    });
  });

  it("create wallet remote error",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    var key = crypto.generateAESKey();
    session.setAESKey(key);
    session.setAuthToken(token);
    $httpBackend.expectPOST(
      "https://test.bitgold.com/api/wallets",
      function(sent) { return true; },
      function(headers) { return headers["X-Auth-Token"] === token && headers["Content-Type"] === "application/binary"; }
    ).respond(403);
    wallet.createWallet(function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"403");
      assert.ok(!wallet.isWalletLoaded());
      done();
    });
    $httpBackend.flush();
  });

  it("load new wallet success",function(done) {
    var address = "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5";
    var serverPublicKey = bitcoin.publicKeyHexToBase64(bitcoin.generateKeys().public);
    var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    var key = crypto.generateAESKey();
    session.setAESKey(key);
    session.setAuthToken(token);
    var keys = bitcoin.generateKeys();
    var publicKey = bitcoin.publicKeyHexToBase64(keys.public);
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,[{ walletId: walletId }]);
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + walletId,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,JSON.stringify(keys),{ "Content-Type": "text/plain" });
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + walletId + "/props",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{});
    $httpBackend.expectPUT(
      "https://test.bitgold.com/api/wallets/" + walletId + "/props",
      function(got) { return JSON.parse(got).clientPublicKey === publicKey; },
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{
      p2shAddress: address,
      clientPublicKey: publicKey,
      serverPublicKey: serverPublicKey,
    });
    wallet.load(function(error,data) {
      assert.strictEqual(error,null);
      assert.strictEqual(wallet.getWallet(),data);
      assert.ok(wallet.isWalletLoaded());
      done();
    });
    $httpBackend.flush();
  });

  it("load existing wallet success",function(done) {
    var address = "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5";
    var serverPublicKey = bitcoin.publicKeyHexToBase64(bitcoin.generateKeys().public);
    var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    var key = crypto.generateAESKey();
    session.setAESKey(key);
    session.setAuthToken(token);
    var publicKey;
    var keys;
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,[]);
    $httpBackend.expectPOST(
      "https://test.bitgold.com/api/wallets",
      function(sent) {
        var decrypted = crypto.decryptData(key,sent);
        keys = JSON.parse(decrypted);
        publicKey = bitcoin.publicKeyHexToBase64(keys.public);
        return (bitcoin.isPublicKey(keys.public) && bitcoin.isPrivateKey(keys.private));
      },
      function(headers) { return headers["X-Auth-Token"] === token && headers["Content-Type"] === "application/binary"; }
    ).respond(200,{ walletId: walletId });
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + walletId,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(function() {
      return [200,keys,{ "Content-Type": "text/plain" }];
    });
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + walletId + "/props",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{});
    $httpBackend.expectPUT(
      "https://test.bitgold.com/api/wallets/" + walletId + "/props",
      function(got) { return JSON.parse(got).clientPublicKey === publicKey; },
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{
      p2shAddress: address,
      clientPublicKey: publicKey,
      serverPublicKey: serverPublicKey,
    });
    wallet.load(function(error,data) {
      assert.strictEqual(error,null);
      assert.strictEqual(wallet.getWallet(),data);
      assert.ok(wallet.isWalletLoaded());
      done();
    });
    $httpBackend.flush();
  });

  it("load new wallet remote error",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    var key = crypto.generateAESKey();
    session.setAESKey(key);
    session.setAuthToken(token);
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(403);
    wallet.load(function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"403");
      assert.ok(!wallet.isWalletLoaded());
      done();
    });
    $httpBackend.flush();
  });

  it("unload wallet",function(done) {
    var address = "2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5";
    var serverPublicKey = bitcoin.publicKeyHexToBase64(bitcoin.generateKeys().public);
    var walletId = "4558fa035dc34c84b1b0b9565a9a6e5a";
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    var key = crypto.generateAESKey();
    session.setAESKey(key);
    session.setAuthToken(token);
    var publicKey;
    var keys;
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,[]);
    $httpBackend.expectPOST(
      "https://test.bitgold.com/api/wallets",
      function(sent) {
        var decrypted = crypto.decryptData(key,sent);
        keys = JSON.parse(decrypted);
        publicKey = bitcoin.publicKeyHexToBase64(keys.public);
        return (bitcoin.isPublicKey(keys.public) && bitcoin.isPrivateKey(keys.private));
      },
      function(headers) { return headers["X-Auth-Token"] === token && headers["Content-Type"] === "application/binary"; }
    ).respond(200,{ walletId: walletId });
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + walletId,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(function() {
      return [200,keys,{ "Content-Type": "text/plain" }];
    });
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/wallets/" + walletId + "/props",
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{});
    $httpBackend.expectPUT(
      "https://test.bitgold.com/api/wallets/" + walletId + "/props",
      function(got) { return JSON.parse(got).clientPublicKey === publicKey; },
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{
      p2shAddress: address,
      clientPublicKey: publicKey,
      serverPublicKey: serverPublicKey,
    });
    wallet.load(function(error,data) {
      assert.strictEqual(error,null);
      assert.strictEqual(wallet.getWallet(),data);
      assert.ok(wallet.isWalletLoaded());
      wallet.unload();
      assert.strictEqual(wallet.getWallet(),null);
      assert.ok(!wallet.isWalletLoaded());
      done();
    });
    $httpBackend.flush();
  });

});

// - -------------------------------------------------------------------- - //
