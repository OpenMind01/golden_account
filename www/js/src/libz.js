// -------------------------------------------------------------------- - //

var _libz = {};
var _prefix;

window.libz = function(name,callback) {
  if (_libz[name]) {
    callback();
  } else {
    var script = document.createElement("SCRIPT");
    var src = "js/libz/" + name + ".js";
    script.src = _prefix ? _prefix + src : src;
    script.async = true;
    script.onload = function() {
      _libz[name] = true;
      callback();
    };
    document.body.appendChild(script);
  }
};

window.libz.prefix = function(prefix) {
  _prefix = prefix;
};

// -------------------------------------------------------------------- - //
