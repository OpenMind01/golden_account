// - -------------------------------------------------------------------- - //

App.factory("bgSession",function($location,$window) {

  return {

    _token: null,
    _aeskey: null,
    _profile: null,
    _prefs: {},

// - -------------------------------------------------------------------- - //

    host: function() {
      var host = $location.host();
      return /localhost|test|server|^192\./.test(host)
        ? "test.bitgold.com"
        : "www.bitgold.com";
    },

    at: function(test) {
      if (test instanceof RegExp) {
        return test.test($location.path());
      } else if (angular.isString(test)) {
        return test === $location.path();
      }
    },

    back: function() {
      $window.history.back();
    },

    path: function(path) {
      var current = $location.path();
      if (path === "/") {
        path = "/summary";
      } else if (!path) {
        path = current;
      }
      if (this.requiresAuthentication(path)) {
        $location.path("/sign-in");
      } else if (current !== path) {
        $location.path(path);
      }
    },

// - -------------------------------------------------------------------- - //

    save: function() {
      try {
        $window.sessionStorage.setItem("token",this._token);
        $window.sessionStorage.setItem("aeskey",JSON.stringify(this._aeskey));
        $window.sessionStorage.setItem("prefs",JSON.stringify(this._prefs));
        $window.sessionStorage.setItem("profile",JSON.stringify(this._profile));
      } catch(e) {}
    },

    load: function() {
      try {
        this._token = $window.sessionStorage.getItem("token");
        this._aeskey = JSON.parse($window.sessionStorage.getItem("aeskey"));
        this._profile = JSON.parse($window.sessionStorage.getItem("profile"));
        this.setPrefs(JSON.parse($window.sessionStorage.getItem("prefs")));
      } catch(e) {}
      this.path();
    },

    clear: function() {
      this._token = null;
      this._aeskey = null;
      this._profile = null;
      this._prefs = {};
      try {
        $window.sessionStorage.removeItem("token");
        $window.sessionStorage.removeItem("aeskey");
        $window.sessionStorage.removeItem("profile");
        $window.sessionStorage.removeItem("prefs");
      } catch(e) {}
    },

// - -------------------------------------------------------------------- - //

    requiresAuthentication: function(path) {
      if (this.isAuthenticated()) {
        return false;
      } else {
        return !/sign\-in|sign\-up|verify\/email/.test(path);
      }
    },

    isAuthenticated: function() {
      return angular.isString(this._token) && angular.isArray(this._aeskey);
    },

// - -------------------------------------------------------------------- - //

    getAuthToken: function() {
      return this._token;
    },

    setAuthToken: function(token) {
      if (!angular.isString(token) || token.length !== 32) {
        throw new Error("invalid or missing token");
      }
      this._token = token;
    },

// - -------------------------------------------------------------------- - //

    getAESKey: function() {
      return this._aeskey;
    },

    setAESKey: function(aeskey) {
      if (!(aeskey instanceof Array) || aeskey.length !== 8) {
        throw new Error("invalid or missing key");
      }
      this._aeskey = aeskey;
    },

// - -------------------------------------------------------------------- - //

    setProfile: function(profile) {
      if (!angular.isObject(profile)) {
        throw new Error("invalid or missing profile");
      }
      this._profile = profile;
    },

    getProfile: function() {
      return this._profile;
    },

// - -------------------------------------------------------------------- - //

    setPrefs: function(prefs) {
      if (angular.isObject(prefs)) {
        Object.keys(prefs).forEach(function(key) {
          this._prefs[key] = prefs[key];
        }.bind(this));
      }
    },

    getPrefs: function() {
      if (arguments.length === 1) {
        return this._prefs[arguments[0]];
      } else {
        return this._prefs;
      }
    },

  };

});

// - -------------------------------------------------------------------- - //
