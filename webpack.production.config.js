const webpack = require('webpack');
const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

const dashboard = new Dashboard();

module.exports = {
  // devtool: 'source-map',
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom', 'axios', 'echarts/lib/echarts'],
    main: path.resolve(__dirname, 'src/main.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    publicPath: '/static/AllDoZNMobile/',
    filename: '[id]_[name]_[chunkHash:8].js',
    chunkFilename: '[id]_[name]_[chunkHash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [AutoPrefixer]
              }
            },
            'less-loader'
            // {
            //   loader: 'less-loader',
            //   options: {
            //     lessPlugins: [
            //       new lessPrefixer({
            //         browsers: ['last 2 versions']
            //       })
            //     ]
            //   }
            // }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          'babel-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true, // 清除HTML注释
        collapseWhitespace: true, // 压缩HTML
        collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
        minifyJS: true, // 压缩页面JS
        minifyCSS: true // 压缩页面CSS
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,    // 不美化输出
      compress: {
        warnings: false, // 不保留警告
        drop_debugger: true, // 不保留调试语句
        // drop_console: true // 不保留控制台输出信息
      },
      mangle: {           // 跳过这些，不改变命名
        except: ['$super', '$', 'exports', 'require']
      },
      space_colon: false,
      comments: false     // 不保留注释
    }),
    // 修复webpack的chunkhash不以chunk文件实际内容为准的问题
    new WebpackMd5Hash(),
    new ExtractTextPlugin({
      filename: 'main_[chunkHash:8].css',
      disable: false,
      allChunks: false
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: './src/index.html', to: 'index.html'
    //   },
    // {
    //   from: './src/main.css', to: 'main.css'
    // }
    // ]),
    new DashboardPlugin(dashboard.setData)
  ]
};
