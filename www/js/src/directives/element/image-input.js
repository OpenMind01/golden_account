// - -------------------------------------------------------------------- - //

App.directive("imageInput",function(Bitgold,bgclsSocket) {
  return {
    require: "ngModel",
    restrict: "E",
    scope: {},
    templateUrl: "tpl/directives/image_input.html",
    link: function($scope,element,attrs,ctrl) {

      $scope.lang = $scope.$root.lang;
      $scope.features = $scope.$root.features;

// - -------------------------------------------------------------------- - //
// - PLUpload stuff

      var queued = [];
      var uploaders = [];

      function clearQueue() {
        uploaders.forEach(function(uploader,idx) {
          while (queued[idx].length > 0) {
            uploader.removeFile(queued[idx].shift());
          }
        });
      }

      function initUploader(button,drop) {
        var idx = uploaders.length;
        var uploader = new plupload.Uploader({
          browse_button: button,
          drop_element: drop,
          flash_swf_url: "flash/Moxie.swf",
          silverlight_xap_url: "flash/Moxie.xap",
          multi_selection: false,
          filters: {
            mime_types: [{title : "Image files", extensions : "jpg,jpeg,png"}],
            max_file_size: 5 * 1024 * 1024,
          },
          url: "temp/upload/url",
        });
        uploader.init();
        uploader.bind("FilesAdded",function(up,files) {
          if (files[0]) {
            clearQueue();
            queued[idx].push(files);
            resizeImage(files[0].getSource(),function(preloader) {
              showPreview(preloader.getAsDataURL());
              clearQueue();
            },function(preloader) {
              setOriginal(preloader.getAsDataURL());
            });
          }
        });
        uploaders.push(uploader);
        queued.push([]);
      }

      function resizeImage(source,callback,original) {
        var preloader = new mOxie.Image();
        preloader.onload = function() {
          original && original(preloader);
          preloader.downsize(320,240);
          callback(preloader);
          $scope.$apply();
        };
        preloader.load(source);
      }

      libz("plupload",function() {
        initUploader("upload-attach","drop-attach");
        if (!$scope.features.flash && !$scope.features.getUserMedia) {
          initUploader("upload-webcam-attach");
        }
      });

// - -------------------------------------------------------------------- - //
// - WebcamJS stuff

      function initWebcam() {
        libz("webcam",function() {
          Webcam.setSWFLocation("flash/webcam.swf");
          Webcam.set({
            width: 640,
            height: 480,
            dest_width: 1280,
            dest_height: 960,
            image_format: 'jpeg',
            jpeg_quality: 90,
            force_flash: false
          });
          Webcam.on("load",function() {

          });
          Webcam.on("error",function(error) {
            $scope.webcam.error = error;
            $scope.$apply();
          });
          Webcam.attach("#webcam-attach");
        });
      }

      function resetWebcam() {
        libz("webcam",function() {
          Webcam.reset();
        });
      }

      function snapWebcam(callback) {
        libz("webcam",function() {
          Webcam.snap(callback);
        });
      }

// - -------------------------------------------------------------------- - //
// - DOM stuff

      var rootElement = element.children().eq(1);
      var webcamElement = angular.element(document.getElementById("webcam-modal"));
      var imgs = element.find("img");
      var previewImage = imgs.eq(0);
      var originalImage = imgs.eq(1);

      function setOriginal(dataUri) {
        if (dataUri) {
          originalImage[0].src = dataUri;
        } else {
          originalImage[0].removeAttribute("src");
        }
      }

      function showPreview(dataUri) {
        if (dataUri) {
          previewImage[0].src = dataUri
          $scope.preview.display = true;
          $scope.preview.buttons = true;
        } else {
          previewImage[0].removeAttribute("src");
          $scope.preview.display = false;
        }
      }

// - -------------------------------------------------------------------- - //
// - Scope stuff

      $scope.webcam = {
        display: false,
        error: null,
      };

      $scope.preview = {
        drop: true,
        email: false,
        display: false,
        progress: false,
      };

      // Starts the webcam and shows overlay.
      $scope.openWebcam = function() {
        if ($scope.features.flash || $scope.features.getUserMedia) {
          $scope.webcam.display = true;
          initWebcam();
        }
      };

      // Stops the webcam and close overlay.
      $scope.closeWebcam = function() {
        if ($scope.features.flash || $scope.features.getUserMedia) {
          $scope.webcam.display = false;
          resetWebcam();
        }
      };

      // Takes a picture with the webcam.
      $scope.takePicture = function() {
        if ($scope.features.flash || $scope.features.getUserMedia) {
          snapWebcam(function(dataUri) {
            setOriginal(dataUri);
            resizeImage(dataUri,function(preloader) {
              showPreview(preloader.getAsDataURL());
            });
            $scope.closeWebcam();
          });
        }
      };

// - -------------------------------------------------------------------- - //
// - Email stuff

      var socket;

      function createSocket() {
        var host = Bitgold.session.host();
        var url = "wss://" + host + "/ws/user/" + $scope.userid + "/validation/document/" + $scope.pin;
        if (socket) {
          socket.disconnect();
        }
        socket = new bgclsSocket(url);
        socket.on("connect",function(data) {
          socket.send({ token: Bitgold.session.getAuthToken() });
        });
        socket.on("message",function(data) {
          if (data.imagePin == $scope.pin) {
            if (data.imageBase64.length > 0) {
              var dataUri = "data:image/jpeg;base64," + data.imageBase64;
              setOriginal(null);
              showPreview(dataUri);
              $scope.preview.email = false;
              if (!$scope.$$phase) {
                $scope.$apply();
              }
            }
          }
        });
        socket.connect();
      }

      $scope.sendEmail = function() {
        Bitgold.api.uploadPin(function(error,data) {
          if (error) {
          } else {
            $scope.preview.drop = false;
            $scope.preview.email = true;
            $scope.pin = data.documentName;
            $scope.userid = data.userId;
            createSocket();
          }
        });
      },

// - -------------------------------------------------------------------- - //
// - Upload stuff

      // Confirms image upload.
      $scope.confirmImage = function() {
        $scope.preview.drop = false;
        $scope.preview.email = false;
        $scope.preview.buttons = false;
        $scope.preview.progress = true;
        if (originalImage[0].hasAttribute("src")) {
          Bitgold.api.uploadDocument(originalImage[0].src,function(error,data) {
            if (error) {
            } else {
              setOriginal(null);
              ctrl.$setViewValue(data.documentName);
            }
          });
        } else {
          ctrl.$setViewValue(true);
        }
      };

      // Discard the image.
      $scope.cancelImage = function() {
        if (socket) {
          socket.disconnect();
        }
        $scope.preview.drop = true;
        $scope.preview.email = false;
        $scope.preview.buttons = false;
        showPreview(null);
        setOriginal(null);
      };

// - -------------------------------------------------------------------- - //

    },
  };
});

// - -------------------------------------------------------------------- - //
