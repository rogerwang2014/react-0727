const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

const dashboard = new Dashboard();

module.exports = {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/': {
        target: 'http://demo.alldobetter.com:81'
      }
    },
    hot: true,
    quiet: true,
    inline: true,
    contentBase: './src',
    port: 9090
  },
  entry: path.resolve(__dirname, 'src/main.jsx'),
  output: {
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/antd')],
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/antd')],
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index_dev.html'
    }),
    new webpack.DllReferencePlugin({    // 加载预先打包好的dll.js文件
      context: path.resolve(__dirname),
      manifest: require('./manifest.json'),
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:9090'
    }),
    new DashboardPlugin(dashboard.setData)
  ]
};
