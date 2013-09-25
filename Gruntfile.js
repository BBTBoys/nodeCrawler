/*jshint devel: true, node: true */

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint : {
            options : {
                curly:true,
                eqeqeq:true,
                latedef:true,
                newcap:true,
                noarg:true,
                noempty:true,
                nonew:true,
                undef:true,
                trailing:true,
                smarttabs:true
            },
            uses_defaults : [ 'Gruntfile.js', '*/*.js', '*.js']
        }
    });

    // Load local tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    // Default task.
    grunt.registerTask('hint', ['jshint']);

};