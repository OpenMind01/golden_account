// - -------------------------------------------------------------------- - //

describe("Bitgold.session",function() {

  beforeEach(module("Bitgold"));

  var session, crypto, $location;
  beforeEach(inject(function(bgSession,bgCrypto,_$location_) {
    session = bgSession;
    crypto = bgCrypto;
    $location = _$location_;
  }));

  it("before auth",function() {
    assert.strictEqual(session.isAuthenticated(),false);
    assert.strictEqual(session.getAESKey(),null);
    assert.strictEqual(session.getAuthToken(),null);
  });

  it("routes for unauthenticated users",function() {
    assert.ok(!session.requiresAuthentication("/sign-in"));
    session.path("/sign-in");
    assert.strictEqual($location.path(),"/sign-in");
    assert.ok(!session.requiresAuthentication("/sign-up"));
    session.path("/sign-up");
    assert.strictEqual($location.path(),"/sign-up");
    assert.ok(!session.requiresAuthentication("/verify\/email"));
    session.path("/verify/email");
    assert.strictEqual($location.path(),"/verify/email");
  });

  it("routes for authenticated users before authentication",function() {
    assert.ok(session.requiresAuthentication("/sign-out"));
    session.path("/sign-out");
    assert.strictEqual($location.path(),"/sign-in");
    assert.ok(session.requiresAuthentication("/wallet"));
    session.path("/wallet");
    assert.strictEqual($location.path(),"/sign-in");
    assert.ok(session.requiresAuthentication("/verify/mobile"));
    session.path("/verify/mobile");
    assert.strictEqual($location.path(),"/sign-in");
  });

  it("profile",function() {
    var profile = {
      firstName: "first",
      lastName: "last",
    };
    session.setProfile(profile);
    assert.deepEqual(session.getProfile(),profile);
  });

  it("profile invalid",function() {
    assert.throws(function() {
      session.setProfile(null);
    },/invalid or missing profile/);
  });

  it("aes key",function() {
    var key = crypto.generateAESKey();
    session.setAESKey(key);
    assert.deepEqual(session.getAESKey(),key);
  });

  it("aes key invalid",function() {
    assert.throws(function() {
      session.setAESKey(null);
    },/invalid or missing key/);
  });

  it("auth token",function() {
    var token = "dd19877028a5454c8085cca8f0a51e7a";
    session.setAuthToken(token);
    assert.deepEqual(session.getAuthToken(),token);
  });

  it("auth token invalid",function() {
    assert.throws(function() {
      session.setAuthToken(null);
    },/invalid or missing token/);
    assert.throws(function() {
      session.setAuthToken("sadsdsda");
    },/invalid or missing token/);
  });

  it("after auth",function() {
    var key = crypto.generateAESKey();
    var token = "dd19877028a5454c8085cca8f0a51e7a";
    session.setAESKey(key);
    session.setAuthToken(token);
    assert.strictEqual(session.isAuthenticated(),true);
    assert.strictEqual(session.getAESKey(),key);
    assert.strictEqual(session.getAuthToken(),token);
  });

  it("routes for authenticated users after authentication",function() {
    var key = crypto.generateAESKey();
    var token = "dd19877028a5454c8085cca8f0a51e7a";
    session.setAESKey(key);
    session.setAuthToken(token);
    assert.ok(!session.requiresAuthentication("/sign-out"));
    session.path("/sign-out");
    assert.strictEqual($location.path(),"/sign-out");
    assert.ok(!session.requiresAuthentication("/wallet"));
    session.path("/wallet");
    assert.strictEqual($location.path(),"/wallet");
    assert.ok(!session.requiresAuthentication("/verify/mobile"));
    session.path("/verify/mobile");
    assert.strictEqual($location.path(),"/verify/mobile");
  });

  it("routes default route before auth",function() {
    session.path("/");
    assert.strictEqual($location.path(),"/sign-in");
  });

  it("routes default route after auth",function() {
    var key = crypto.generateAESKey();
    var token = "dd19877028a5454c8085cca8f0a51e7a";
    session.setAESKey(key);
    session.setAuthToken(token);
    session.path("/");
    assert.strictEqual($location.path(),"/summary");
  });

});

// - -------------------------------------------------------------------- - //
