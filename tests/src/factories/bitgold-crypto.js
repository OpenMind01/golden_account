// - -------------------------------------------------------------------- - //

describe("Bitgold.crypto",function() {

  beforeEach(module("Bitgold"));

  var crypto;
  beforeEach(inject(function(bgCrypto) {
    crypto = bgCrypto;
  }));

  it("libs",function() {
    assert.ok(!!CryptoJS);
    assert.ok(!!sjcl);
  });

  it("randomWords",function() {
    var rand = crypto.randomWords(8);
    assert.ok(rand instanceof Array);
    assert.strictEqual(rand.length,8);
  });

  it("truncatedSHA512",function() {
    var text = String(Math.random());
    var hash = crypto.truncatedSHA512(text);
    assert.strictEqual(typeof hash,"string");
    assert.strictEqual(hash.length,32);
  });

  it("generateAESKey",function() {
    var key = crypto.generateAESKey();
    assert.ok(key instanceof Array);
    assert.strictEqual(key.length,8);
  });

  it("encryptAESKey ok",function() {
    var key = crypto.generateAESKey();
    var pwd = String(Math.random());
    var encrypted = crypto.encryptAESKey(key,pwd);
    assert.strictEqual(typeof encrypted,"string");
    assert.strictEqual(encrypted.length,140);
  });

  it("encryptAESKey missing key",function() {
    var pwd = String(Math.random());
    assert.throws(function() {
      var encrypted = crypto.encryptAESKey(null,pwd);
    },/invalid or missing key/);
  });

  it("decryptAESKey ok",function() {
    var pwd = String(Math.random());
    var key = crypto.generateAESKey();
    var encrypted = crypto.encryptAESKey(key,pwd);
    var decrypted = crypto.decryptAESKey(encrypted,pwd);
    assert.deepEqual(decrypted,key);
  });

  it("decryptAESKey missing key",function() {
    var pwd = String(Math.random());
    assert.throws(function() {
      var decrypted = crypto.decryptAESKey(null,pwd);
    },/invalid or missing key/);
  });

  it("decryptAESKey wrong pwd",function() {
    var pwd = String(Math.random());
    var wrongpwd = String(Math.random());
    var key = crypto.generateAESKey();
    var encrypted = crypto.encryptAESKey(key,pwd);
    var decrypted = crypto.decryptAESKey(encrypted,wrongpwd);
    assert.notDeepEqual(decrypted,key);
  });

  it("encryptData ok",function() {
    var data = String(Math.random());
    var key = crypto.generateAESKey();
    var encrypted = crypto.encryptData(key,data);
    assert.ok(encrypted instanceof Int8Array);
    assert.strictEqual(encrypted.length,56);
  });

  it("decryptData ok",function() {
    var data = String(Math.random());
    var key = crypto.generateAESKey();
    var encrypted = crypto.encryptData(key,data);
    var decrypted = crypto.decryptData(key,encrypted);
    assert.deepEqual(decrypted,data);
  });

  it("decryptData missing key",function() {
    var data = String(Math.random());
    var key = crypto.generateAESKey();
    var encrypted = crypto.encryptData(key,data);
    assert.throws(function() {
      var decrypted = crypto.decryptData(null,encrypted);
    },/invalid or missing key/);
  });

  it("decryptData wrong key",function() {
    var data = String(Math.random());
    var key = crypto.generateAESKey();
    var wrongkey = crypto.generateAESKey();
    var encrypted = crypto.encryptData(key,data);
    var decrypted = crypto.decryptData(wrongkey,encrypted);
    assert.notDeepEqual(decrypted,data);
  });

  it("decryptBlob ok",function(done) {
    var data = String(Math.random());
    var key = crypto.generateAESKey();
    var encrypted = crypto.encryptData(key,data);
    var blob = new Blob([encrypted.buffer]);
    crypto.decryptBlob(key,blob,function(error,decrypted) {
      assert.deepEqual(decrypted,data);
      done();
    });
  });

  it("decryptBlob array buffer",function(done) {
    var data = String(Math.random());
    var key = crypto.generateAESKey();
    var encrypted = crypto.encryptData(key,data);
    crypto.decryptBlob(key,encrypted.buffer,function(error,decrypted) {
      assert.deepEqual(decrypted,data);
      done();
    });
  });

  it("decryptBlob wrong key",function(done) {
    var data = String(Math.random());
    var key = crypto.generateAESKey();
    var wrongkey = crypto.generateAESKey();
    var encrypted = crypto.encryptData(key,data);
    var blob = new Blob([encrypted.buffer]);
    crypto.decryptBlob(wrongkey,blob,function(error,decrypted) {
      assert.notDeepEqual(decrypted,data);
      done();
    });
  });

  it("decryptBlob missing key",function(done) {
    var data = String(Math.random());
    var key = crypto.generateAESKey();
    var wrongkey = crypto.generateAESKey();
    var encrypted = crypto.encryptData(key,data);
    var blob = new Blob([encrypted.buffer]);
    crypto.decryptBlob(null,blob,function(error,decrypted) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"invalid or missing key");
      done();
    });
  });

  it("decryptBlob missing blob",function(done) {
    var key = crypto.generateAESKey();
    crypto.decryptBlob(key,null,function(error,decrypted) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"invalid or missing blob");
      done();
    });
  });

});

// - -------------------------------------------------------------------- - //
