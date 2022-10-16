const commonConfig = require('./webpack.common.config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const {merge} = require('webpack-merge')
const prodConfig={
    mode: "production",
    devtool: 'cheap-module-source-map',
    module:{
        rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader,'css-loader']
        }]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    },
    plugins: [new MiniCssExtractPlugin(),] 
}
module.exports = merge(commonConfig,prodConfig)