const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
    mode: "development",
    devtool: 'eval-cheap-module-source-map',
    entry: path.resolve(__dirname,'./src/index.js'),
    devServer: {
        static: {
          directory: path.join(__dirname, "dist"),
        },
        // watchFiles: ['./src/index.html'],
        open: true
      },
      
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname,'build'),
    },
    module:{
        rules: [{
            test: /\.(jpg|png)$/,
            // use: 'file-loader',
            use: {
                loader: 'url-loader',
                options:{
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    limit: 2048
                }
            }
            // type: 'asset/resource',
            // generator: {
            //     filename: 'static/[hash][ext][query]'
            //   }
        },{
            test: /\.css$/,
            use: ['style-loader','css-loader']
        },{
            test: /\.scss$/,
            use: ['style-loader','css-loader','sass-loader','postcss-loader']
        },{
            test: /\.(ttf|woff|woff2)$/,
            type: 'asset/resource'
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'
    })]
}