// - -------------------------------------------------------------------- - //

App.factory("bgCrypto",function() {

  function wordArray(words) {
    return CryptoJS.lib.WordArray.create(words);
  }

  function randomWords(length) {
    while (!sjcl.random.isReady()) {
      var rand = CryptoJS.lib.WordArray.random(128/8);
      sjcl.random.addEntropy(rand.words);
    }
    return sjcl.random.randomWords(length);
  }

  function wordsToCipher(words) {
    var params = {};
    params.salt = wordArray(words.slice(0,2));
    params.iv = wordArray(words.slice(2,6));
    params.ciphertext = wordArray(words.slice(6));
    var cipherParams = CryptoJS.lib.CipherParams.create(params);
    return cipherParams;
  }

  function truncatedSHA512(text) {
    var hash = CryptoJS.SHA512(text);
    var full = hash.toString(CryptoJS.enc.Hex);
    var truncated = full.substr(0,32);
    return truncated;
  }

  function generateAESKey() {
    var key = wordArray(randomWords(8));
    return key.words;
  }

  function encryptAESKey(words,secret) {
    if (!(words instanceof Array) || words.length != 8) {
      throw new Error("invalid or missing key");
    }
    var key = wordArray(words);
    var salt = wordArray(randomWords(8));
    var password = CryptoJS.PBKDF2(secret,salt,{ keySize: 8 });
    var encrypted = CryptoJS.AES.encrypt(key,password.toString());
    var buffer = wordArray();
    buffer.concat(salt);
    buffer.concat(encrypted.salt);
    buffer.concat(encrypted.iv);
    buffer.concat(encrypted.ciphertext);
    return CryptoJS.enc.Base64.stringify(buffer);
  }

  function encryptedAESKey(secret) {
    return encryptAESKey(generateAESKey(),secret);
  }

  function decryptAESKey(key,secret) {
    if (typeof key !== "string" || key.length !== 140) {
      throw new Error("invalid or missing key");
    }
    var buffer = CryptoJS.enc.Base64.parse(key);
    var salt = wordArray(buffer.words.slice(0,8));
    var cipherParams = wordsToCipher(buffer.words.slice(8,22));
    var password = CryptoJS.PBKDF2(secret,salt,{ keySize: 256/32 });
    var decrypted = CryptoJS.AES.decrypt(cipherParams,password.toString());
    return decrypted.words;
  }

  function wordToByteArray(words) {
    var byteArray = [];
    var len = words.length;
    for (var i = 0; i < len; ++i) {
      var word = words[i];
      for (var j = 3; j >= 0; --j) {
        byteArray.push((word >> 8 * j) & 0xFF);
      }
    }
    var int8array = new Int8Array(byteArray.length);
    int8array.set(byteArray);
    return int8array;
  }

  function byteToWordArray(array) {
    if (array instanceof ArrayBuffer) {
      array = new Int8Array(array);
    }
    var len = array.length;
    var words = [];
    for (var i = 0; i < len; i++) {
      words[i >>> 2] |= (array[i] & 0xff) << (24 - (i % 4) * 8);
    }
    return words;
  }

  function encryptData(words,data) {
    if (!(words instanceof Array) || words.length != 8) {
      throw new Error("invalid or missing key");
    }
    var key = wordArray(words);
    var encrypted = CryptoJS.AES.encrypt(data,key.toString());
    var buffer = wordArray();
    buffer.concat(encrypted.salt);
    buffer.concat(encrypted.iv);
    buffer.concat(encrypted.ciphertext);
    return wordToByteArray(buffer.words);
  }

  function decryptData(words,data) {
    if (!(words instanceof Array) || words.length != 8) {
      throw new Error("invalid or missing key");
    }
    var key = wordArray(words);
    var cipherWords = byteToWordArray(data);
    var cipherParams = wordsToCipher(cipherWords);
    var decrypted = CryptoJS.AES.decrypt(cipherParams,key.toString());
    var text;
    try { text = decrypted.toString(CryptoJS.enc.Utf8) } catch(e) {}
    return text;
  }

  function decryptBlob(key,blob,callback) {
    var error = null;
    if (!(key instanceof Array) || key.length != 8) {
      error = new Error("invalid or missing key");
    }
    if (blob instanceof ArrayBuffer) {
      blob = new Blob([blob],{ type: "application/binary" });
    } else if (blob instanceof Blob) {
      blob = new Blob([blob],{ type: "application/binary" });
    }
    if (!(blob instanceof Blob)) {
      error = new Error("invalid or missing blob");
    }
    if (error) {
      callback(error);
    } else {
      var fileReader = new FileReader();
      fileReader.onload = function() {
        var result = this.result;
        var data;
        try { data = decryptData(key,result) } catch(e) { error = e }
        callback(error,data);
      };
      fileReader.readAsArrayBuffer(blob);
    }
  }

  return {
    randomWords: randomWords,
    encryptData: encryptData,
    decryptData: decryptData,
    decryptBlob: decryptBlob,
    decryptAESKey: decryptAESKey,
    encryptAESKey: encryptAESKey,
    generateAESKey: generateAESKey,
    encryptedAESKey: encryptedAESKey,
    truncatedSHA512: truncatedSHA512,
  };

});

// - -------------------------------------------------------------------- - //
