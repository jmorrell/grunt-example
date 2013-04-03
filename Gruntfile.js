var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};


module.exports = function(grunt) {
  
  grunt.initConfig({

    applicationFiles: [
      "js/TodoMVC.js",
      "js/TodoMVC.Todos.js",
      "js/TodoMVC.Layout.js",
      "js/TodoMVC.TodoList.Views.js",
      "js/TodoMVC.TodoList.js"
    ],

    jshint: {
      options: {
        globalstrict: true,
        globals: {
          'JST': true
        }
      },
      dist: [
        "js/TodoMVC.js",
        "js/TodoMVC.Todos.js",
        "js/TodoMVC.Layout.js",
        "js/TodoMVC.TodoList.Views.js",
        "js/TodoMVC.TodoList.js"
      ]
    },

    stylus: {
      dist: {
        files: {
          "dist/debug/css/app.css": [ "styles/base.styl", "styles/app.styl" ]
        }
      }
    },

    jst: {
      dist: {
        files: {
          "dist/debug/js/templates.js": [ "templates/**/*" ]
        }
      }
    },

    concat: {
      dist: {
        files: {
          "dist/debug/js/app.js": [

            // Vendor libraries
            "components/todomvc-common/base.js",
            "components/jquery/jquery.js",
            "components/underscore/underscore.js",
            "components/backbone/backbone.js",
            "components/backbone.localStorage/backbone.localStorage.js",
            "components/backbone.marionette/lib/backbone.marionette.js",

            // Templates
            "dist/debug/js/templates.js",
            
            // Application
            "js/TodoMVC.js",
            "js/TodoMVC.Todos.js",
            "js/TodoMVC.Layout.js",
            "js/TodoMVC.TodoList.Views.js",
            "js/TodoMVC.TodoList.js"
          ]
        }
      }
    },

    jade: {
      dist: {
        files: {
          "dist/debug/index.html": [ "index.jade" ]
        }
      }
    },

    copy: {
      bgImage: {
        files: [
          { expand: true, cwd: 'components/todomvc-common', src: [ '*.png' ], dest: 'dist/debug/images/' }
        ]
      }
    },

    clean: {
      beforeBuild: {
        src: [ 'dist/debug' ]
      },
      afterBuild: {
        src: [ 'dist/debug/js/templates.js' ]
      }
    },

    jasmine: {
      src: 'dist/debug/app.js',
      options: {
        specs: 'specs/spec/**/*.js'
      }
    },

    regarde: {
      dist: {
        files: [
          'js/**/*', 
          'styles/*', 
          'Gruntfile.js', 
          'index.jade', 
          'components/**/*',
          'templates/**/*'
        ],
        tasks: [ 'reload' ]
      }
    },

    connect: {
      livereload: {
        options: {
          base: 'dist/debug',
          port: 9001,
          middleware: function(connect, options) {
            return [ lrSnippet, folderMount(connect, options.base) ];
          }
        }
      }
    },

    livereload: {
      port: 4000
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');


  grunt.registerTask('build', [ 
    'clean:beforeBuild', 
    'jshint', 
    'jst', 
    'stylus', 
    'concat', 
    'jade', 
    'copy', 
    'clean:afterBuild'
    //, 'jasmine' 
  ]);

  grunt.registerTask('default', [ 'build' ]);

  grunt.registerTask('reload', [ 'build', 'livereload' ]);

  grunt.registerTask('live', [ 
    'build', 
    'livereload-start', 
    'connect', 
    'regarde' 
  ]);
    
};
