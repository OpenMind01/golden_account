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

  it("signUp success",function(done) {
    var token = "dd19877028a5454c8085cca8f0a51e7a";
    var pwd = "#@!321EWQewq";
    var key = crypto.generateAESKey();
    var encrypted = crypto.encryptAESKey(key,pwd);
    assert.strictEqual(session.isAuthenticated(),false);
    $httpBackend
      .expectPOST("https://test.bitgold.com/api/signup")
      .respond(200,{
        "key": encrypted,
        "email": "test@test.com",
      },{
        "X-Auth-Token": token,
      });
    api.signUp({
      email: "test@test.com",
      password: pwd,
    },function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{
        "key": encrypted,
        "email": "test@test.com",
      });
      assert.strictEqual(session.isAuthenticated(),true);
      assert.deepEqual(session.getAESKey(),key);
      assert.deepEqual(session.getAuthToken(),token);
      assert.deepEqual(session.getProfile(),{
        email: "test@test.com",
        phone: undefined,
        firstName: undefined,
        lastName: undefined,
      });
      done();
    });
    $httpBackend.flush();
  });

  it("signUp remote error",function(done) {
    $httpBackend
      .expectPOST("https://test.bitgold.com/api/signup")
      .respond(400,{});
    api.signUp({
      email: "test",
      password: "test",
    },function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"400");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

  it("signUp conflict error",function(done) {
    $httpBackend
      .expectPOST("https://test.bitgold.com/api/signup")
      .respond(409,{});
    api.signUp({
      email: "test",
      password: "test",
    },function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"409");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

  it("signUp token error",function(done) {
    var token = null;
    var pwd = "#@!321EWQewq";
    assert.strictEqual(session.isAuthenticated(),false);
    $httpBackend
      .expectPOST("https://test.bitgold.com/api/signup")
      .respond(200,{
        "key": "sadsdasadasd",
      },{
        "X-Auth-Token": token,
      });
    api.signUp({
      email: "test@test.com",
      password: pwd,
    },function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"invalid or missing auth token");
      assert.strictEqual(typeof data,"undefined");
      assert.strictEqual(session.isAuthenticated(),false);
      done();
    });
    $httpBackend.flush();
  });

  it("signIn error",function(done) {
    assert.strictEqual(session.isAuthenticated(),false);
    $httpBackend
      .expectPOST("https://test.bitgold.com/api/signup")
      .respond(401,{});
    api.signUp({
      email: "test",
      password: "test",
    },function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"401");
      assert.strictEqual(typeof data,"undefined");
      assert.strictEqual(session.isAuthenticated(),false);
      done();
    });
    $httpBackend.flush();
  });

  it("signIn success",function(done) {
    var token = "dd19877028a5454c8085cca8f0a51e7a";
    var pwd = "#@!321EWQewq";
    var key = crypto.generateAESKey();
    var encrypted = crypto.encryptAESKey(key,pwd);
    assert.strictEqual(session.isAuthenticated(),false);
    $httpBackend
      .expectPOST("https://test.bitgold.com/api/login")
      .respond(200,{
        "key": encrypted,
        "firstName": "first",
        "lastName": "last",
      },{
        "X-Auth-Token": token,
      });
    api.signIn({
      email: "test@test.com",
      password: pwd,
    },function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{
        "key": encrypted,
        "firstName": "first",
        "lastName": "last",
      });
      assert.strictEqual(session.isAuthenticated(),true);
      assert.deepEqual(session.getAESKey(),key);
      assert.deepEqual(session.getAuthToken(),token);
      assert.deepEqual(session.getProfile(),{
        email: undefined,
        phone: undefined,
        firstName: "first",
        lastName: "last",
      });
      done();
    });
    $httpBackend.flush();
  });

  it("signIn key error",function(done) {
    var token = "dd19877028a5454c8085cca8f0a51e7a";
    var pwd = "#@!321EWQewq";
    assert.strictEqual(session.isAuthenticated(),false);
    $httpBackend
      .expectPOST("https://test.bitgold.com/api/login")
      .respond(200,{
        "key": "sadsdasadasd",
      },{
        "X-Auth-Token": token,
      });
    api.signIn({
      email: "test@test.com",
      password: pwd,
    },function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"invalid or missing aes key");
      assert.strictEqual(typeof data,"undefined");
      assert.strictEqual(session.isAuthenticated(),false);
      done();
    });
    $httpBackend.flush();
  });

  it("signIn token error",function(done) {
    var token = null;
    var pwd = "#@!321EWQewq";
    assert.strictEqual(session.isAuthenticated(),false);
    $httpBackend
      .expectPOST("https://test.bitgold.com/api/login")
      .respond(200,{
        "key": "sadsdasadasd",
      },{
        "X-Auth-Token": token,
      });
    api.signIn({
      email: "test@test.com",
      password: pwd,
    },function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"invalid or missing auth token");
      assert.strictEqual(typeof data,"undefined");
      assert.strictEqual(session.isAuthenticated(),false);
      done();
    });
    $httpBackend.flush();
  });

  it("verifyEmail success",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    $httpBackend
      .expectGET("https://test.bitgold.com/api/verify/email/" + token)
      .respond(200,{});
    api.verifyEmail(token,function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{});
      done();
    });
    $httpBackend.flush();
  });

  it("verifyEmail error",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    $httpBackend
      .expectGET("https://test.bitgold.com/api/verify/email/" + token)
      .respond(400);
    api.verifyEmail(token,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"400");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

  it("verifyPhone success",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(crypto.generateAESKey());
    session.setAuthToken(token);
    var code = 1234;
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/verify/phone/" + code,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{});
    api.verifyPhone(code,function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{});
      done();
    });
    $httpBackend.flush();
  });

  it("verifyPhone auth error",function(done) {
    var code = 1234;
    api.verifyPhone(code,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"must be authenticated");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("verifyPhone code error",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(crypto.generateAESKey());
    session.setAuthToken(token);
    var code = 1234;
    $httpBackend.expectGET(
      "https://test.bitgold.com/api/verify/phone/" + code,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(400,{});
    api.verifyPhone(code,function(error,data) {
      assert.strictEqual(error.message,"400");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

  it("updateProfile success",function(done) {
    var send = { phone: "+5511988888888" };
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(crypto.generateAESKey());
    session.setAuthToken(token);
    $httpBackend.expectPOST(
      "https://test.bitgold.com/api/profile",
      send,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{});
    api.updateProfile(send,function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{});
      done();
    });
    $httpBackend.flush();
  });

  it("updateProfile auth error",function(done) {
    api.updateProfile({ phone: "+5511988888888" },function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"must be authenticated");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("updateProfile remote error",function(done) {
    var send = { phone: "+5511988888888" };
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(crypto.generateAESKey());
    session.setAuthToken(token);
    $httpBackend.expectPOST(
      "https://test.bitgold.com/api/profile",
      send,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(403,{});
    api.updateProfile(send,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"403");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

  it("resendEmail success",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(crypto.generateAESKey());
    session.setAuthToken(token);
    $httpBackend.expectPUT(
      "https://test.bitgold.com/api/verify/resend/email",
      null,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{});
    api.resendEmail(function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{});
      done();
    });
    $httpBackend.flush();
  });

  it("resendEmail auth error",function(done) {
    api.resendEmail(function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"must be authenticated");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("resendEmail remote error",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(crypto.generateAESKey());
    session.setAuthToken(token);
    $httpBackend.expectPUT(
      "https://test.bitgold.com/api/verify/resend/email",
      null,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(403,{});
    api.resendEmail(function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"403");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

  it("resendPhone success",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(crypto.generateAESKey());
    session.setAuthToken(token);
    $httpBackend.expectPUT(
      "https://test.bitgold.com/api/verify/resend/phone",
      null,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(200,{});
    api.resendPhone(function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{});
      done();
    });
    $httpBackend.flush();
  });

  it("resendPhone auth error",function(done) {
    api.resendPhone(function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"must be authenticated");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("resendPhone remote error",function(done) {
    var token = "51228c1dd7c34a62b4683eb4bce5c235";
    session.setAESKey(crypto.generateAESKey());
    session.setAuthToken(token);
    $httpBackend.expectPUT(
      "https://test.bitgold.com/api/verify/resend/phone",
      null,
      function(headers) { return headers["X-Auth-Token"] === token; }
    ).respond(403,{});
    api.resendPhone(function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"403");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

});

// - -------------------------------------------------------------------- - //
