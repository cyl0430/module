Grunt + Require + Sass + Watch 模板

此模板执行的命令 :

step1 : 每次新建.sass 文件后,均需执行 grunt sass 来创建相对应的 .css 文件

step2 : 每次在 src 目录下新建完 .JS 文件后,均需执行 grunt require 在js目录下创建相对应的js文件

step3 : grunt watch 开启监听,即可开始编译


Gruntfile.js模板

module.exports = function(grunt) {
    // 配置项
    var AppConfig = {
        name: 'app',
        //源文件目录
        src: 'app/src',
        //生产文件目录
        dist: 'app/assets'
    };

    //加载所有的任务
    require('load-grunt-tasks')(grunt);
    //显示每一个任务所花的时间和百分比
    require('time-grunt')(grunt);

    grunt.initConfig({
        config: AppConfig,

        // 加载外部包列表
        pkg: grunt.file.readJSON('package.json'),

        // Js文件压缩
        uglify: {
            options: {
                // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/*! <%= pkg.author.name %>-<%=pkg.verson%> 最后修改于：<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                options: {
                    // 不混淆变量名
                    mangle: false,
                    // 不删除注释，还可以为 false（删除全部注释）
                    preserveComments: 'false',
                    // 输出压缩率，可选的值有 false(不输出信息)
                    report: "min"
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/script',
                    src: ['**/*.js'],
                    dest: '<%= config.dist %>/script',
                    ext: '.min.js'
                }, {
                    expand: true,
                    cwd: '<%= config.dist %>/plugins',
                    src: ['**/*.js'],
                    dest: '<%= config.dist %>/plugins',
                    ext: '.min.js'
                }]
            }
        },

        // 代码质量检查工具
        jshint: {
            files: ['Gruntfile.js', '<%= config.src %>/script/*.js', '<%= config.dist %>/script/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Less编译
        less: {
            build: {
                options: {
                    compress: false,
                    yuicompress: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/less',
                    src: ['**/*.less'],
                    dest: '<%= config.dist %>/css',
                    ext: '.css'
                }]
            }
        },

        // Sass编译
        sass: {
            build: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/sass',
                    src: ['**/*.scss'],
                    dest: '<%= config.dist %>/css',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: '<%= config.src %>/plugins/bootstrap-sass/assets/stylesheets',
                    src: ['**/*.scss'],
                    dest: '<%= config.dist %>/plugins/bootstrap/css/',
                    ext: '.css'
                }]
            }
        },

        //css压缩插件
        cssmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: ['**/*.css', '!*.min.css'],
                    dest: '<%= config.dist %>',
                    ext: '.min.css'
                }]
            }
        },

        // 图片压缩
        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        // Autoprefixer解析CSS文件并且添加浏览器前缀到CSS规则里,保证CSS兼容性
        autoprefixer: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.dist %>/css',
                    ext: '.css'
                }]
            }
        },

        // 依赖库自动注入
        wiredep: {
            build: {
                // 依赖注入的页面
                devDependencies: true,
                src: ['<%= config.name %>/index.html'],
                ignorePath: /^(\.\.\/)*\.\./,
                directory: '<%= config.dist %>/script/plugins'
            }
        },
        // 合并文件
        concat: {
            bootstrap: {
                src: [
                    '<%= config.src %>/plugins/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
                    '<%= config.src %>/plugins/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
                    '<%= config.src %>/plugins/bootstrap-sass/assets/javascripts/bootstrap/button.js',
                    '<%= config.src %>/plugins/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
                    '<%= config.src %>/plugins/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
                    '<%= config.src %>/plugins/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
                    '<%= config.src %>/plugins/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
                    '<%= config.src %>/plugins/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
                    '<%= config.src %>/plugins/bootstrap-sass/assets/javascripts/bootstrap/popover.js',
                    '<%= config.src %>/plugins/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
                    '<%= config.src %>/plugins/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
                    '<%= config.src %>/plugins/bootstrap-sass/assets/javascripts/bootstrap/affix.js'
                ],
                dest: '<%= config.dist %>/plugins/bootstrap/bootstrap.js'
            }
        },
        // 文件复制
        copy: {
            build: {
                files: [{
                    //font-awesome fonts
                    expand: true,
                    flatten: true,
                    cwd: '<%= config.src %>/plugins/font-awesome/fonts/',
                    src: ['**'],
                    dest: '<%= config.dist %>/plugins/font-awesome/fonts/',
                    filter: 'isFile'
                }, {
                    //font-awesome css
                    expand: true,
                    flatten: true,
                    cwd: '<%= config.src %>/plugins/font-awesome/css/',
                    src: ['font-awesome.css'],
                    dest: '<%= config.dist %>/plugins/font-awesome/css/',
                    filter: 'isFile'
                }, {
                    //bootstrap fonts
                    expand: true,
                    flatten: true,
                    cwd: '<%= config.src %>/plugins/bootstrap-sass/assets/fonts/',
                    src: ['**'],
                    dest: '<%= config.dist %>/plugins/bootstrap/fonts/bootstrap/',
                    filter: 'isFile'
                }, {
                    //bootstrap
                    expand: true,
                    cwd: '<%= config.src %>/plugins/bootstrap-sass/assets/javascripts/',
                    src: ['bootstrap.js'],
                    dest: '<%= config.dist %>/plugins/bootstrap/',
                    filter: 'isFile'
                }, {
                    //Jquery
                    expand: true,
                    cwd: '<%= config.src %>/plugins/jquery/dist/',
                    src: ['jquery.js'],
                    dest: '<%= config.dist %>/plugins/',
                    filter: 'isFile'
                }]
            }
        },
        // 清理文件
        clean: {
            build: {
                files: [{
                    dot: true,
                    src: ['.sass-cache']
                }]
            }
        },
        // 本地代理服务器
        connect: {
            options: {
                port: 9000,
                // 默认就是这个值，可配置为本机某个 IP，localhost 或域名
                hostname: 'localhost',
                // 声明给 watch 监听的端口
                livereload: 35729
            },
            proxies: [{
                port: 8090,
                host: '192.168.0.111',
                context: '/webapi'
            }],
            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: [
                        '<%= config.name %>' //主目录
                    ]
                }
            }
        },

        // watch插件的配置信息(监控js,css文件,如改变自动压缩,语法检查)
        watch: {
            // 监听bower包的变化
            bower: {
                files: ['bower.json', 'package.json']
            },
            // 用于监听sass文件
            sass: {
                files: ['<%= config.src %>/sass/**/*.scss'],
                tasks: ['sass:build', 'cssmin:build']
            },
            // 用于监听css文件
            css: {
                files: ['<%= config.dist %>/css/*.css'],
                tasks: ['autoprefixer']
            },
            // 用于监听JS文件
            js: {
                files: ['<%= config.src %>/script/**/*.js'],
                tasks: ['jshint', 'uglify:build'],
            },

            livereload: {
                options: {
                    livereload: '<%=connect.options.livereload%>' //监听前面声明的端口  35729
                },
                files: [ //下面文件的改变就会实时刷新网页
                    '<%= config.name %>/*.html',
                    '<%= config.dist %>/css/{,*/}*.css',
                    '<%= config.dist %>/script/{,*/}*.js',
                    '<%= config.dist %>/images/{,*/}*.{png,jpg,gif}'
                ]
            }
        }
    });

    // 默认被执行的任务列表
    grunt.registerTask('default', [
        'dev',
        'connect:server',
        'watch'
    ]);

    //发布
    grunt.registerTask('build', [
        'sass',
        'copy',
        'autoprefixer',
        'cssmin',
        'uglify',
        'imagemin',
        'clean'
    ]);

    grunt.registerTask('dev', [
        'sass',
        'copy',
        'autoprefixer',
        'clean'
    ]);

};


