// - -------------------------------------------------------------------- - //
module.exports = function(grunt) {

  var path = require("path");

  var templates = {
    ".js": "<script src=\"<%= file %>\"></script>",
    ".css": "<link rel=\"stylesheet\" href=\"<%= file %>\" />",
    ".html": "<script type=\"text/ng-template\" id=\"<%= file %>\" ><%= content %></script>",
  };

  grunt.registerMultiTask("list",function() {
    var cwd = this.data.cwd;
    var files = grunt.file.expand({
      cwd: this.data.cwd,
      filter: this.data.filter,
    },this.data.src);
    var html = files.map(function(file) {
      var ext = path.extname(file);
      var template = templates[ext];
      var data = { file: file };
      if (ext === ".html") {
        var filepath = path.resolve(cwd,file);
        data.content = grunt.file.read(filepath);
      }
      return grunt.template.process(template,{ data: data });
    }).join("\n");
    grunt.file.write(this.data.dest,html);
  });

};
// - -------------------------------------------------------------------- - //
