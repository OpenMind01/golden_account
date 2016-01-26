// -------------------------------------------------------------------- - //

App.run(function($rootScope,$window) {

  var document = $window.document;
  var navigator = $window.navigator;


  var features = $rootScope.features = {};

  features.ArrayBuffer = "ArrayBuffer" in $window;

  features.Blob = "Blob" in $window;

  features.WebSocket = "WebSocket" in $window && $window.WebSocket.CLOSING === 2;

  features.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

  features.CORS =  "XMLHttpRequest" in $window && "withCredentials" in new XMLHttpRequest();

  features.download = !$window.externalHost && "download" in document.createElement("a");

  features.canvas = (function() {
    var elem = document.createElement("canvas");
    return !!(elem.getContext && elem.getContext("2d"));
  })();

  features.flash = (function() {
    var hasFlash = false;
    try {
      var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      if (fo) {
        hasFlash = true;
      }
    } catch (e) {
      if (navigator.mimeTypes
            && navigator.mimeTypes['application/x-shockwave-flash'] != undefined
            && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
        hasFlash = true;
      }
    }
    return hasFlash;
  })();
  
});

// - -------------------------------------------------------------------- - //
