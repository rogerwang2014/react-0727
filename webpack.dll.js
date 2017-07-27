const webpack = require('webpack');
const path = require('path');

const vendors = [
  'react',
  'react-dom',
  'react-router-dom',
  'axios',
  'echarts/lib/echarts'
];

module.exports = {
  entry: {
    lib: vendors
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({   // 打包dll.js文件
      path: 'manifest.json',
      name: '[name]',
      context: path.resolve(__dirname),
    }),
  ],
};
