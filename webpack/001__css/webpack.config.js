const path = require('path');
module.exports = {
    //入口文件的配置
    entry:{
        index:'./index.js'
    },
    //出口文件的配置
    output:{
        path:path.resolve(__dirname,'./dist'),//路径
        filename:'[name].js'//打包后的文件名
    },
    //模块 解读css 图片压缩等
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}