// - -------------------------------------------------------------------- - //
module.exports = function(grunt) {

  var path = require("path");

  grunt.registerMultiTask("html",function() {
    var data = { pkg: grunt.config.get("pkg") };
    grunt.file.recurse(this.data.path,function(file) {
      var name = path.basename(file,path.extname(file));
      data[name] = grunt.file.read(file);
    });
    var html = grunt.template.process(data.main,{ data: data });
    html = grunt.template.process(html,{ data: data });
    grunt.file.write(this.data.dest,html);
  });

};
// - -------------------------------------------------------------------- - //
