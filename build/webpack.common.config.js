const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports={
    entry: {
      main: path.resolve(__dirname,'../src/main.js'),
    },
    output:{
        // filename: '[contenthash]-[name].js',
        path: path.resolve(__dirname,'../dist'),
        clean: true
    },
    module:{
        rules: [{
            test: /\.(jpg|png)$/,
            type: 'asset/resource',
        },{
            test: /\.css$/,
            use: ['style-loader','css-loader']
        },{
            test: /\.scss$/,
            use: ['style-loader','css-loader','sass-loader','postcss-loader']
        },{
            test: /\.(ttf|woff|woff2)$/,
            type: 'asset/resource'
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [['@babel/preset-env', {
                  targets:{
                    "ie": "8"
                  },
                  useBuiltIns: 'usage',
                  "corejs": "3"
                }]]
              }
            }
          }
        ]
    },
    optimization: {
        usedExports: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: false
        }
      }
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'
    })]
}