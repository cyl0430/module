注 : require 不支持和 vue 同时使用

1.引入 require.js 

src="plug/require.js" data-main='js/index'

2.在 js/index 中写入

//配置

require.config({

   	paths: {
   	
   		"jquery": "../plug/jquery",
   		
   		"weui": "../plug/weui"
   		
   	},
   	
   	shim: {
   	
   		'jquery':{
   		
   			//输出的变量名
   			
   			exports: '$'
   			
   		},
   		
   		'weui':{
   		
   			//依赖
   			
   			deps: ['jquery'], 
   			
   			exports: 'weui'
   			
   		}
   		
  	}
  	
});

require(['jquery','weui'], function (){

　　$(function(){})

});