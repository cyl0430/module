module.exports = function (grunt) {
  var files = grunt.file.expand('public/static/src/**/*.js');
  var requireOptions = {};
  var cacheOptions ={};
  files.forEach(function (file) {
    var filenamelist = file.split('/');
    var num = filenamelist.length;
    var foldername = filenamelist[num - 2];
    var filename = filenamelist[num - 1].replace(/\.js$/,'');
    requireOptions[filename] = {
        options: {
            baseUrl: 'public/static/',
            paths: {
              'jquery':'jquery',
              'base':'base',
              'layer':'layer',
              'bootstrap':'bootstrap.min'
            },
            shim: {
                jquery:{
                    exports: '$'
                },
                layer:{
                  deps:['jquery'],
                  exports:"layer"
                },
                base:{
                    deps:['jquery'],
                  	exports:"base"
                },
                bootstrap:{
                    deps:['jquery'],
                  	exports:"Bootstrap"
                }
            },
            waitSeconds: 0,
            optimizeAllPluginResources: true,
            name: 'src/' + foldername + '/' + filename,
            out: 'public/static/js/'+ foldername + '/' + filename + '.js'
        }
    };
    cacheOptions[filename] = {
      assetUrl: 'dist/' + filename +'.js',
      files: {
        'tmp': [filename+'.php']
      }
    }
  });
  // 这里定义我们需要的任务
  grunt.initConfig({
    meta: { 
      basePath: 'public/static/scss/',
      srcPath: 'public/static/scss/', 
      deployPath: 'public/static/css/'
    },
    requirejs: requireOptions,
    cache: cacheOptions,
    sass: {
        dist: {
            files: [{
                expand: true,
                cwd: 'public/static/scss/',
                src: ['**/*.scss'],
                dest: 'public/static/css',
                ext: '.css'
            }]
        }
      },
    watch: {
      scripts:{
        files: ['public/static/src/**/*.js','public/static/lib/*.js'],
        tasks: ['requirejs'],
        options: {
          spawn: false
        }
      },
      styles:{
        files: ['public/static/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
            spawn: false
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('asset-cache-control'); 
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch:styles', 'watch:scripts']);
  grunt.registerTask('require', ['requirejs','cache'])
};