const path = require('path')
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
        // library:{
        //     type: 'var',
        //     name: 'MyLibrary',
        // }
    },
    plugins: [
        new CopyrightWebpackPlugin({name: 'mia'})
    ],
    resolveLoader:{
        modules: ['node_modules','./loaders']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader'
        },{
            test: /\.js/,
            use: [
                'replaceLoader', {loader:'replaceLoaderAsync',options:{name:'lee'}}
            ]
        }]
    }
}