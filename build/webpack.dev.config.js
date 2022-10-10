const path = require('path')
const commonConfig = require('./webpack.common.config')
const {merge} = require('webpack-merge')
const devConfig={
    mode: "development",
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: {
          directory: path.join(__dirname, "dist"),
        },
        // watchFiles: ['./src/index.html'],
        open: true,
        hot: 'only',
        port: 8080,
        proxy: {
          '/react/api' :{
            target: 'https://www.dell-lee.com',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
              'header.json': 'demo.json'
            }
          }
        }
      },
}
module.exports = merge(devConfig,commonConfig)