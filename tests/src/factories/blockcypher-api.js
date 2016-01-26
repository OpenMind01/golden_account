// - -------------------------------------------------------------------- - //

describe("Blockcypher.api",function() {

  beforeEach(module("Bitgold"));

  var api, $httpBackend;
  beforeEach(inject(function(bcyApi,_$httpBackend_) {
    api = bcyApi;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("newTransaction success",function(done) {
    $httpBackend
      .expectPOST("https://api.blockcypher.com/v1/btc/test3/txs/new")
      .respond(200,{});
    var tx = {
      "inputs": [{
        addresses: ["2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5"],
      }],
      "outputs": [{
        addresses: ["2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5"],
        value: Math.floor(0.001 * Math.pow(10,8)),
      }],
    };
    api.newTransaction(tx,function(error,data) {
      assert.strictEqual(error,null);
      assert.deepEqual(data,{});
      done();
    });
    $httpBackend.flush();
  });

  it("newTransaction tx error",function(done) {
    api.newTransaction({},function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"invalid or missing tx");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
  });

  it("newTransaction remote error",function(done) {
    $httpBackend
      .expectPOST("https://api.blockcypher.com/v1/btc/test3/txs/new")
      .respond(503,{});
    var tx = {
      "inputs": [{
        addresses: ["2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5"],
      }],
      "outputs": [{
        addresses: ["2NDfyTiQMKkrN4hiFwGUe5o3cegj41hBck5"],
        value: Math.floor(0.001 * Math.pow(10,8)),
      }],
    };
    api.newTransaction(tx,function(error,data) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"503");
      assert.strictEqual(typeof data,"undefined");
      done();
    });
    $httpBackend.flush();
  });

});

// - -------------------------------------------------------------------- - //
