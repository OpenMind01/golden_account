// - -------------------------------------------------------------------- - //
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON("./package.json"),
    dist: "./dist/web/<%= pkg.name %>-<%= pkg.version %>",

    // Concatenates script and style files to be used in production.
    concat: {
      options: {
        separator: ";",
      },
      scripts: {
        src: ["./www/js/lib/**/*.js","./www/js/src/**/*.js"],
        dest: "./www/js/index.js",
        filter: function(src) { return !/index/.test(src) },
      },
      styles: {
        src: ["./www/css/**/*.css"],
        dest: "./www/css/index.css",
        filter: function(src) { return !/index/.test(src) },
      },
    },

    "file-creator": {

      // Generate LanguageTexts factory.
      lang: {
        "./www/js/src/constants/language.js": function(fs,fd,done) {
          var langs = {};
          var path = require("path");
          fs.readdirSync("./lang/").forEach(function(langDir) {
            langs[langDir] = {};
            fs.readdirSync("./lang/" + langDir).forEach(function(langFile) {
              langs[langDir][path.basename(langFile,path.extname(langFile))] = grunt.file.readJSON("./lang/" + langDir + "/" + langFile);
            });
          });
          var content = 'App.constant("Language",' + JSON.stringify(langs,null,2) + '["default"]);';
          fs.writeSync(fd,content);
          done();
        }
      },

    },

    // Joins all html files recursivelly into index.html.
    html: {
      dev: {
        dest: "./www/index.html",
        path: "./www/html",
      },
      prod: {
        dest: "./www/index.html",
        path: "./www/html",
      },
    },

    html2js: {
      dev: {
        options: {
          singleModule: true,
          rename: function(name) {
            return name.replace(/\.\.\/www\//,"");
          },
        },
        //  base: "www",
        src: ["www/tpl/**/*.html"],
        dest: "www/js/src/app-templates.js",
        module: "bgTemplates",
      },
    },

    // Lists js and css files and generates assets.html file.
    list: {
      dev: {
        cwd: "./www",
        src: ["css/**/*.css","js/lib/**/*.js","js/src/**/*.js"],
        dest: "./www/html/assets.html",
        filter: function(src) { return !/index/.test(src) },
      },
      prod: {
        cwd: "./www",
        src: ["css/index.css","js/index.js"],
        dest: "./www/html/assets.html",
      },
    },

    // Compiles all files from ./www/scss into ./www/css.
    sass: {
      dev: {
        options: {
          style: "expanded",
          sourcemap: "none",
          loadPath: require("node-neat").includePaths,
        },
        expand: true,
        cwd: "./www/scss",
        src: ["main.scss","temp/*.scss"],
        dest: "./www/css/",
        ext: ".css",
      },
      prod: {
        options: {
          style: "compressed",
          sourcemap: "none",
          loadPath: require("node-neat").includePaths,
        },
        files: {
          "./www/css/index.css": "./www/css/index.css",
        },
      },
    },

    // Compresses the index.js file to be used in production.
    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
      },
      prod: {
        src: "./www/js/index.js",
        dest: "./www/js/index.js",
      },
      libz: {
        cwd: "./www/js/libx/",
        src: "*.js",
        dest: "./www/js/libz/",
        expand: true,
      },
    },

    // Compresses the index.html file to be used in production.
    htmlmin: {
      prod: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: {
          "./www/index.html": "./www/index.html",
        },
      },
    },

    browserify: {
      dev: {
        src: "node_modules/bitcoinjs-lib/src/index.js",
        dest: "./www/js/lib/bitcoin.js",
        options: {
          browserifyOptions: {
            standalone: "Bitcoin",
          },
        },
      },
    },

    // Processes the index.js file to prepare angularjs for compression.
    ngAnnotate: {
      prod: {
        files: {
          "./www/js/index.js": "./www/js/index.js",
        },
      },
    },

    // Deletes files from production when changing to dev mode.
    clean: {
      dev: [
        "./www/js/index.js",
        "./www/css/*.*",
      ],
    },

    // Copy the files for each type of distribution.
    copy: {

      // Web distribution.
      web: {
        expand: true,
        cwd: "./www",
        src: [
          "index.html",
          "robots.txt",
          "js/index.js",
          "js/libz/*.js",
          "css/index.css",
          "img/**/*.*",
          "flash/**/*.*",
          "audio/*.*",
        ],
        dest: "<%= dist %>/",
        filter: function(name) { return name.indexOf("Thumbs.db") === -1 },
      },

    },

    // Run dev tasks when files change.
    watch: {

      tpl: {
        files: ["./www/tpl/**/*.html"],
        tasks: ["html2js:dev"],
        options: {
          spawn: false,
        },
      },

      lang: {
        files: ["./lang/**/*.json"],
        tasks: ["file-creator:lang"],
        options: {
          spawn: false,
        },
      },

      scss: {
        files: ["./www/**/*.scss"],
        tasks: ["sass:dev"],
        options: {
          spawn: false,
        },
      },

      html: {
        files: ["./www/**/*.html","./www/**/*.css","./www/**/*.js"],
        tasks: ["list:dev","html:dev"],
        options: {
          spawn: false,
        },
      },

    },

  });

  grunt.loadTasks("tasks");

  grunt.loadNpmTasks("grunt-html2js");
  grunt.loadNpmTasks("grunt-file-creator");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-ng-annotate");
  grunt.loadNpmTasks("grunt-browserify");

  grunt.registerTask("dev",[
    "clean:dev",
    "sass:dev",
    "html2js:dev",
    "list:dev",
    "html:dev",
    "file-creator:lang",
  ]);

  grunt.registerTask("prod",[
    "sass:dev",
    "concat:scripts",
    "ngAnnotate:prod",
    "uglify:prod",
    "concat:styles",
    "sass:prod",
    "list:prod",
    "html:prod",
    "htmlmin:prod",
  ]);

  grunt.registerTask("dist",[
    "prod",
    "copy:web",
  ]);

};
// - -------------------------------------------------------------------- - //
