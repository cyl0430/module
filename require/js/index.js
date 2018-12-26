//配置
require.config({
    baseUrl: '../plug',//公共路径
    paths: {
　　　　"jquery": "jquery",
        "weui": "weui",
        "base": "base"
　　},
　　shim: {
　　　　 'jquery':{
　　　　　　exports: '$'//输出的变量名
　　　　 },
        'weui':{
            deps: ['jquery'],//依赖
            exports: 'weui'
    　　},
        'base':{
            deps: ['jquery'],
            exports: 'base'
    　　}
　　}
});

require(['jquery','weui','base'], function (){
　　$(function(){
        ({
            title:'require',
            run:function(){
                var cyl = this;
                cyl.init();
                cyl.listen();
            },
            init:function(){
                var cyl = this;
                cyl.btn = $('.btn');
            },
            listen:function(){
                var cyl = this;
                //调用插件 base
                base();
                //添加事件
                cyl.btn.on('click',cyl.btnFun);
            },
            btnFun:function(){
                var cyl = this,
                    btnObj = $('.btn');
                btnObj.toggleClass('active');
            }
        }).run()
    })
});