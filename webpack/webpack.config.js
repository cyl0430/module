const path = require('path');
module.exports = {
    //入口文件的配置
    entry:{
        index:'./src/index.js',
        index2:'./src/index2.js'
    },
    //出口文件的配置
    output:{
        path:path.resolve(__dirname,'dist'),//路径
        filename:'[name].js'//打包后的文件名
    },
    //模块 解读css 图片压缩等
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:8080
    }
}