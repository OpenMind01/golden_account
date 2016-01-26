// - -------------------------------------------------------------------- - //

App.factory("bgApi",["$http","bgCrypto","bgSession",function($http,crypto,session) {

  return {

    // Performs an api call considering encryption/authentication options.
    _call: function(options,callback) {
      var error = null;
      if (angular.isString(options)) {
        options = { url: options };
      }
      options.url = "https://" + session.host() + options.url;
      if (!angular.isString(options.method)) {
        options.method = "GET";
      }
      if (!angular.isObject(options.headers)) {
        options.headers = {};
      }

      // Includes credentials if required.
      if (options.auth === true) {
        if (session.isAuthenticated()) {
          options.headers["X-Auth-Token"] = session.getAuthToken();

          // Encrypts blob if enabled.
          if (options.encrypt === true) {
            options.headers["Content-Type"] = "application/binary";
            options.data = crypto.encryptData(session.getAESKey(),options.data);
            options.transformRequest = function(data) { return data; };
          }

          // Sets response type for binary content.
          if (options.decrypt === true) {
            options.responseType = "blob";
          }
        } else {
          error = new Error("must be authenticated");
        }
      }

      if (error) {
        angular.isFunction(callback) && callback(error);
      } else {
        $http(options)
          .error(function(data,status) {
            angular.isFunction(callback) && callback(new Error(status));
          })
          .success(function(data,status,headers) {

            // Extracts auth token if expected.
            if (!error && options.token === true) {
              var token = headers("x-auth-token");
              if (angular.isString(token) && token.length == 32) {
                session.setAuthToken(token);
              } else {
                error = new Error("invalid or missing auth token");
              }
            }

            // Decrypts AES Key if expected.
            if (!error && angular.isString(options.aeskey)) {
              if (angular.isString(data.key) && data.key.length === 140) {
                try {
                  var decrypted = crypto.decryptAESKey(data.key,options.aeskey);
                  session.setAESKey(decrypted);
                } catch(e) {
                  error = e;
                }
              } else {
                error = new Error("invalid or missing aes key");
              }
            }

            // Updates user profile if expected.
            if (!error && options.profile === true) {
              session.setProfile({
                email: data.email,
                phone: data.phone,
                firstName: data.firstName,
                lastName: data.lastName,
              });

              // Loads user's preferences.
              session.setPrefs(data.preferences);
            }

            // Decrypts binary blob if expected.
            if (!error && options.decrypt === true) {
              if (session.isAuthenticated()) {
                if (headers("content-type") === "application/binary") {
                  crypto.decryptBlob(session.getAESKey(),data,callback);
                  callback = null;
                }
              } else {
                error = new Error("must be authenticated");
              }
            }
            if (error) {
              angular.isFunction(callback) && callback(error);
            } else {
              angular.isFunction(callback) && callback(null,data);
            }
          });
      }
    },

// - -------------------------------------------------------------------- - //

    // Gets geo information.
    geoIP: function(callback) {
      this._call("/api/geo",callback);
    },

    // Authenticates an user account.
    signIn: function(params,callback) {
      this._call({
        method: "POST",
        url: "/api/login",
        profile: true,
        token: true,
        aeskey: params.password,
        data: {
          email: params.email,
          password: crypto.truncatedSHA512(params.password),
        },
      },callback);
    },

    // Creates a new user account.
    signUp: function(params,callback) {
      this._call({
        method: "POST",
        url: "/api/signup",
        profile: true,
        token: true,
        aeskey: params.password,
        data: {
          email: params.email,
          password: crypto.truncatedSHA512(params.password),
          key: crypto.encryptedAESKey(params.password),
        },
      },callback);
    },

    // Verifies user's email with passed token.
    verifyEmail: function(token,callback) {
      this._call({
        method: "GET",
        url: "/api/verify/email/" + token,
        // profile: true,
      },callback);
    },

    // Verifies user's mobile with passed code.
    verifyPhone: function(token,callback) {
      this._call({
        method: "GET",
        url: "/api/verify/phone/" + token,
        auth: true,
        profile: true,
      },callback);
    },

    // Defines user's mobile phone number.
    updateProfile: function(params,callback) {
      this._call({
        method: "POST",
        url: "/api/profile",
        data: params,
        auth: true,
        profile: true,
      },callback);
    },

    // Re-sends email verification token.
    resendEmail: function(callback) {
      this._call({
        method: "PUT",
        url: "/api/verify/resend/email",
        auth: true,
      },callback);
    },

    // Re-sends mobile verification code.
    resendPhone: function(callback) {
      this._call({
        method: "PUT",
        url: "/api/verify/resend/phone",
        auth: true,
      },callback);
    },

    // Creates new upload pin for current user.
    uploadPin: function(callback) {
      this._call({
        method: "GET",
        url: "/api/user/validation/document/mail/pin",
        auth: true,
      },callback);
    },

    // Uploads document's image for validation process.
    uploadDocument: function(dataUri,callback) {
      var pos = dataUri.indexOf(",");
      this._call({
        method: "POST",
        url: "/api/user/validation/document",
        data: dataUri.substr(pos + 1),
        auth: true,
        headers: {
          "Content-Type": dataUri.substr(5,pos-12),
          // "Content-Transfer-Encoding": "base64",
        },
      },callback);
    },

    // Sends identity information for validation.
    validateIdentity: function(data,callback) {
      this._call({
        method: "POST",
        url: "/api/user/validation/data",
        data: data,
        auth: true,
      },callback);
    },

    // Updates user's preferences.
    updatePreferences: function(prefs,callback) {
      var params = {
        preferences: session.getPrefs(),
      };
      if (angular.isObject(prefs)) {
        Object.keys(prefs).forEach(function(key) {
          params.preferences[key] = prefs[key];
        });
      }
      this._call({
        method: "POST",
        url: "/api/profile",
        data: params,
        auth: true,
        profile: true,
      },callback);
    },

// - -------------------------------------------------------------------- - //

    // Lists all wallets from user.
    listWallets: function(callback) {
      this._call({
        url: "/api/wallets",
        method: "GET",
        auth: true,
      },callback);
    },

    // Adds a new wallet.
    // Encrypts data with user's AES key.
    addWallet: function(data,callback) {
      var error = null;
      if (!angular.isString(data) || data.length === 0) {
        error = new Error("invalid or missing data");
      }
      if (error) {
        angular.isFunction(callback) && callback(error);
      } else {
        this._call({
          method: "POST",
          url: "/api/wallets",
          data: data,
          auth: true,
          encrypt: true,
        },callback);
      }
    },

    // Updates wallet's blob.
    // Encrypts data with user's AES key.
    updateWallet: function(id,data,callback) {
      var error = null;
      if (!angular.isString(id) || id.length !== 32) {
        error = new Error("invalid or missing id");
      }
      if (!angular.isString(data) || data.length === 0) {
        error = new Error("invalid or missing data");
      }
      if (error) {
        angular.isFunction(callback) && callback(error);
      } else {
        this._call({
          method: "PUT",
          url: "/api/wallets/" + id,
          data: data,
          auth: true,
          encrypt: true,
        },callback);
      }
    },

    // Retrieves a wallet's blob by it's id.
    // Decrypts the binary with user's AES key.
    getWallet: function(id,callback) {
      this._call({
        method: "GET",
        url: "/api/wallets/" + id,
        auth: true,
        decrypt: true,
      },callback);
    },

    // Retrieves wallet's props.
    getWalletProps: function(id,callback) {
      this._call({
        method: "GET",
        url: "/api/wallets/" + id + "/props",
        auth: true,
      },callback);
    },

    // Updates wallet's props.
    setWalletProps: function(id,props,callback) {
      this._call({
        method: "PUT",
        url: "/api/wallets/" + id + "/props",
        data: props,
        auth: true,
      },callback);
    },

// - -------------------------------------------------------------------- - //

    // Sends a transaction to server.
    sendTransaction: function(walletId,tx,callback) {
      var error = null;
      if (!angular.isString(walletId) || walletId.length !== 32) {
        error = new Error("invalid or missing id");
      }
      if (!angular.isObject(tx)) {
        error = new Error("invalid or missing transaction");
      }
      if (error) {
        angular.isFunction(callback) && callback(error);
      } else {
        this._call({
          method: "POST",
          url: "/api/wallets/" + walletId + "/transactions",
          data: tx,
          auth: true,
        },callback);
      }
    },

// - -------------------------------------------------------------------- - //

    // Sends payment uri by email.
    sendPaymentRequest: function(request,callback) {
      var error = null;
      if (!angular.isObject(request)) {
        error = new Error("invalid or missing request");
      }
      if (!error && !angular.isString(request.email)) {
        error = new Error("invalid or missing request email");
      }
      if (!error && !angular.isString(request.paymentUri)) {
        error = new Error("invalid or missing request uri");
      }
      if (error) {
        angular.isFunction(callback) && callback(error);
      } else {
        this._call({
          method: "POST",
          url: "/api/messaging/email/payment",
          data: request,
          auth: true,
        },callback);
      }
    },

  };

}]);

// - -------------------------------------------------------------------- - //
