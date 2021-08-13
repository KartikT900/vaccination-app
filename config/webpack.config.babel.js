import autoprefixer from 'autoprefixer';
import flexbugfixes from 'postcss-flexbugs-fixes';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';
import path from 'path';

const devMode = process.env.NODE_ENV !== 'production';

export default {
  devServer: {
    clientLogLevel: 'warning',
    compress: true,
    open: true,
    overlay: true,
    historyApiFallback: true,
    hot: true,
    port: 8000,
    openPage: 'vaccine/slot/'
  },
  devtool: devMode
    ? 'eval-cheap-module-source-map'
    : 'cheap-module-source-map',
  entry: ['./src/public-path.js', './src/index.js'],
  mode: devMode ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer, flexbugfixes]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new StyleLintPlugin({
      configFile: '.stylelintrc.json',
      context: 'src',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
      syntax: 'scss'
    }),
    new HtmlWebpackPlugin({
      template: `${path.join(__dirname, '../src')}/index.html`
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', 'src']
  },
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  optimization: {
    minimize: true,
    concatenateModules: false,
    minimizer: [
      (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin');

        new TerserPlugin({
          parallel: true,
          terserOptions: {
            nameCache: false,
            module: true,
            sourceMap: false,
            mangle: true,
            // eslint-disable-next-line camelcase
            keep_fnames: false,
            // eslint-disable-next-line camelcase
            keep_classnames: false
          }
        }).apply(compiler);
      },
      new CssMinimizerPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        default: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/
        }
      }
    }
  }
};
