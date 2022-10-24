const htmlWebpackPlugin = require('html-webpack-plugin')
const path  = require('path')
module.exports = {
    mode: "development",
    entry: './原型链.ts',
    output: {
        path: path.resolve(__dirname,'./dist'),
        clean: true
    },
    devServer:{
        port: 8899
    },
    module: {
        rules: [{
            test: /\.tsx?/,
            use: ['ts-loader']
        }]
    },
    plugins :[
        new htmlWebpackPlugin()
    ]
}