// - -------------------------------------------------------------------- - //

App.factory("bgBitcoin",function() {

  var network = Bitcoin.networks.testnet;

  function publicKeyHexToBase64(public) {
    if (!isPublicKey(public)) {
      throw new Error("invalid or missing public key");
    }
    var pubKey = Bitcoin.ECPubKey.fromHex(public);
    var buffer = pubKey.toBuffer();
    var base64 = buffer.toString("base64");
    return base64;
  }

  function publicKeyBase64ToHex(base64) {
    var hex;
    try {
      var words = CryptoJS.enc.Base64.parse(base64);
      hex = CryptoJS.enc.Hex.stringify(words);
    } catch(e) {}
    if (!isPublicKey(hex)) {
      throw new Error("invalid or missing public key");
    }
    return hex;
  }

  function generateKeys() {
    var key = Bitcoin.ECKey.makeRandom();
    return {
      public: key.pub.toHex(),
      private: key.toWIF(network),
    };
  }

  function getNetwork(address) {
    if (!isAddress(address)) {
      throw new Error("invalid or missing address");
    }
    var addr = Bitcoin.Address.fromBase58Check(address);
    var version = addr.version;
    if (version === 5 || version === 0) {
      return "main";
    } else if (version === 196 || version === 111) {
      return "test";
    } else {
      throw new Error("invalid or missing network");
    }
  }

  function isAddress(address) {
    var valid = false;
    try {
      Bitcoin.Address.fromBase58Check(address);
      valid = true;
    } catch(e) {}
    return valid;
  }

  function isP2SH(address) {
    return isAddress(address) && address.length === 35;
  }

  function isP2PKH(address) {
    return isAddress(address) && address.length === 34;
  }

  function isPublicKey(public) {
    var valid = false;
    try {
      Bitcoin.ECPubKey.fromHex(public);
      valid = true;
    } catch(e) {}
    return valid;
  }

  function isPrivateKey(private) {
    var valid = false;
    try {
      Bitcoin.ECKey.fromWIF(private,network);
      valid = true;
    } catch(e) {}
    return valid;
  }

  return {
    network: network,
    networkTest: network === Bitcoin.networks.testnet,
    networkMain: network === Bitcoin.networks.bitcoin,
    getNetwork: getNetwork,
    isAddress: isAddress,
    isP2SH: isP2SH,
    isP2PKH: isP2PKH,
    isPublicKey: isPublicKey,
    isPrivateKey: isPrivateKey,
    generateKeys: generateKeys,
    publicKeyHexToBase64: publicKeyHexToBase64,
    publicKeyBase64ToHex: publicKeyBase64ToHex,
  };

});

// - -------------------------------------------------------------------- - //
