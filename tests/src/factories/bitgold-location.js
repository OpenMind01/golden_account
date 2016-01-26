// - -------------------------------------------------------------------- - //

describe("Bitgold.location",function() {

  beforeEach(module("Bitgold"));
  beforeEach(module("ngMockE2E"));

  var location, $httpBackend;
  beforeEach(inject(function(bgLocation,_$httpBackend_) {
    location = bgLocation;
    $httpBackend = _$httpBackend_;
  }));

  it("location load success",function(done) {
    $httpBackend
      .expectGET("https://test.bitgold.com/api/geo")
      .respond(200,{
        country: "Brazil",
        countryCode: "BR",
      });
    assert.ok(location instanceof Object);
    assert.strictEqual(Object.keys(location).length,1);
    assert.strictEqual(typeof location.load,"function");
    location.load(function(error) {
      assert.strictEqual(location.country,"Brazil");
      assert.strictEqual(location.countryCode,"BR");
      done(error);
    });
    $httpBackend.flush();
  });

  it("location load error",function(done) {
    $httpBackend
      .expectGET("https://test.bitgold.com/api/geo")
      .respond(503);
    assert.ok(location instanceof Object);
    assert.strictEqual(Object.keys(location).length,1);
    assert.strictEqual(typeof location.load,"function");
    location.load(function(error) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"503");
      assert.strictEqual(location.countryCode,"US");
      done();
    });
    $httpBackend.flush();
  });

});

// - -------------------------------------------------------------------- - //
