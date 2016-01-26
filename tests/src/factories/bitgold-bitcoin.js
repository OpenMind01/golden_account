// - -------------------------------------------------------------------- - //

describe("Bitgold.bitcoin",function() {

  beforeEach(module("Bitgold"));

  var bitcoin;
  beforeEach(inject(function(bgBitcoin) {
    bitcoin = bgBitcoin;
  }));

  it("libs",function() {
    assert.ok(!!Bitcoin);
  });

  it("isAddress",function() {
    assert.ok(bitcoin.isAddress("2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5"));
    assert.ok(bitcoin.isAddress("mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAc"));
    assert.ok(bitcoin.isAddress("1DRnurMWfTWXL9oG8iVED8r6qubqPKw7Vj"));
    assert.ok(!bitcoin.isAddress("2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck"));
    assert.ok(!bitcoin.isAddress("mnFsppCCLGGXn5B17w268LHGQ5wu7V9YA"));
    assert.ok(!bitcoin.isAddress("1DRnurMWfTWXL9oG8iVED8r6qubqPKw7V"));
    assert.ok(!bitcoin.isAddress("2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5x"));
    assert.ok(!bitcoin.isAddress("mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAcx"));
    assert.ok(!bitcoin.isAddress("1DRnurMWfTWXL9oG8iVED8r6qubqPKw7Vjx"));
    assert.ok(!bitcoin.isAddress(null));
    assert.ok(!bitcoin.isAddress(""));
    assert.ok(!bitcoin.isAddress(123));
  });

  it("isP2SH",function() {
    assert.ok(bitcoin.isP2SH("2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5"));
    assert.ok(!bitcoin.isP2SH("mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAc"));
    assert.ok(!bitcoin.isP2SH("1DRnurMWfTWXL9oG8iVED8r6qubqPKw7Vj"));
  });

  it("isP2PKH",function() {
    assert.ok(!bitcoin.isP2PKH("2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5"));
    assert.ok(bitcoin.isP2PKH("mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAc"));
    assert.ok(bitcoin.isP2PKH("1DRnurMWfTWXL9oG8iVED8r6qubqPKw7Vj"));
  });

  it("getNetwork",function() {
    assert.strictEqual(bitcoin.getNetwork("3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC"),"main");
    assert.strictEqual(bitcoin.getNetwork("2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5"),"test");
    assert.strictEqual(bitcoin.getNetwork("1DRnurMWfTWXL9oG8iVED8r6qubqPKw7Vj"),"main");
    assert.strictEqual(bitcoin.getNetwork("mnFsppCCLGGXn5B17w268LHGQ5wu7V9YAc"),"test");
    assert.throws(function() { bitcoin.getNetwork("") },/invalid or missing address/);
  });

  it("isPublicKey",function() {
    assert.ok(bitcoin.isPublicKey("02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c"));
    assert.ok(!bitcoin.isPublicKey("02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1"));
    assert.ok(!bitcoin.isPublicKey("02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1cx"));
    assert.ok(!bitcoin.isPublicKey("KwXFxRapDj8SrZZgkMbNmnBV8bfUdfG6wjhyvDQ8hpCTzSmPyNVa"));
    assert.ok(!bitcoin.isPublicKey(null));
    assert.ok(!bitcoin.isPublicKey(""));
    assert.ok(!bitcoin.isPublicKey(123));
  });

  it("isPrivateKey",function() {
    assert.ok(bitcoin.isPrivateKey("KwXFxRapDj8SrZZgkMbNmnBV8bfUdfG6wjhyvDQ8hpCTzSmPyNVa"));
    assert.ok(!bitcoin.isPrivateKey("KwXFxRapDj8SrZZgkMbNmnBV8bfUdfG6wjhyvDQ8hpCTzSmPyNV"));
    assert.ok(!bitcoin.isPrivateKey("KwXFxRapDj8SrZZgkMbNmnBV8bfUdfG6wjhyvDQ8hpCTzSmPyNVax"));
    assert.ok(!bitcoin.isPrivateKey("02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c"));
    assert.ok(!bitcoin.isPrivateKey(null));
    assert.ok(!bitcoin.isPrivateKey(""));
    assert.ok(!bitcoin.isPrivateKey(123));
  });

  it("generateKeys",function() {
    var keys = bitcoin.generateKeys();
    assert.ok(bitcoin.isPublicKey(keys.public));
    assert.ok(bitcoin.isPrivateKey(keys.private));
  });

  it("publicKeyHexToBase64",function() {
    assert.throws(function() { bitcoin.publicKeyHexToBase64(null) },/invalid or missing public key/);
    assert.deepEqual(bitcoin.publicKeyHexToBase64("02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c"),"AsrQ7AtMULi2G0+42owLKB4oY+PExFwVClsWZ8IzAc4c");
  });

  it("publicKeyBase64ToHex",function() {
    assert.throws(function() { bitcoin.publicKeyBase64ToHex(null) },/invalid or missing public key/);
    assert.deepEqual(bitcoin.publicKeyBase64ToHex("AsrQ7AtMULi2G0+42owLKB4oY+PExFwVClsWZ8IzAc4c"),"02cad0ec0b4c50b8b61b4fb8da8c0b281e2863e3c4c45c150a5b1667c23301ce1c");
  });

});

// - -------------------------------------------------------------------- - //
