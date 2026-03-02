const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    clean: true,
  },
  devServer: {
    static: './dist',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/icons'),
          to: path.resolve(__dirname, 'dist/assets/icons')
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      },
    ],
  },
};
