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

  it("geoIP success",function(done) {
    $httpBackend
      .expectGET("https://test.bitgold.com/api/geo")
      .respond(200,{
        country: "Brazil",
        countryCode: "BR",
      });
    api.geoIP(function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{
        country: "Brazil",
        countryCode: "BR",
      });
      done();
    });
    $httpBackend.flush();
  });

  it("geoIP remote error",function(done) {
    $httpBackend
      .expectGET("https://test.bitgold.com/api/geo")
      .respond(503);
    api.geoIP(function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"503");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

});

// - -------------------------------------------------------------------- - //
