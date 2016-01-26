// - -------------------------------------------------------------------- - //
// - Libs

var lib = {
  http: require("http"),
  https: require("https"),
  express: require("express"),
  basicAuth: require("basic-auth"),
  bodyParser: require("body-parser"),
  compression: require("compression"),
  querystring: require("querystring"),
};

// - -------------------------------------------------------------------- - //
// - App

var app = lib.express();
app.use(lib.compression());

// - -------------------------------------------------------------------- - //
// - Auth

app.use(function(req,res,next) {
  var credentials = lib.basicAuth(req);
  if (!credentials || credentials.name !== 'bit' || credentials.pass !== 'gold') {
    res.writeHead(401,{
      "WWW-Authenticate": "Basic realm=\"enter your password\"",
    });
    res.end()
  } else {
    next();
  }
});

// - -------------------------------------------------------------------- - //
// - Static

app.use( lib.express.static("./www") );

app.use("/verify/email",function(req,res) {
  res.redirect("/#/verify/email" + req.path);
});

// - -------------------------------------------------------------------- - //
// - BodyParser

app.use( lib.bodyParser.json({}) );
app.use( lib.bodyParser.urlencoded({ extended: true }) );

// - -------------------------------------------------------------------- - //
// - Subscribe

app.post("/subscribe",function(req,res) {
  var apiKey = new Buffer("api:key-6363cd05a2b8ca5ecae9e99cd288f120").toString("base64");
  var data = lib.querystring.stringify({
    address: req.body.email,
    upsert: "yes",
    subscribed: "yes",
    vars: "{}",
    name: "",
    description: "",
  });
  console.log(data);
  var request = lib.https.request({
    host: "api.mailgun.net",
    port: 443,
    method: "POST",
    path: "/v2/lists/contact@bitgold.com/members",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(data),
      "Authorization": "Basic " + apiKey,
    }
  },function(response) {
    res.writeHeader(200,{});
    res.end();
  });
  request.write(data);
  request.end();
});

// - -------------------------------------------------------------------- - //

app.listen(8999);

// - -------------------------------------------------------------------- - //
