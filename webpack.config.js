const path = require('path');
const fs = require('fs');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = (env, argv) => {
  const MODE = (argv.mode || 'development').toLowerCase();
  const IS_DEV = MODE === 'development';

  const webpackConfig = {
    entry: ['./src/index.js'],
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
      filename: IS_DEV ? '[name].js' : '[name]-[contenthash].js',
    },
    devServer: {
      historyApiFallback: true,
      port: 8081,
      contentBase: './dist',
      headers: { 'Access-Control-Allow-Origin': '*' },
      host: 'localhost',
    },
    module: {
      rules: [
        {
          loader: 'thread-loader',
          resolve: { extensions: ['.js', '.jsx'] },
          test: /\.js(?:|x)$/,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          resolve: { extensions: ['.css', '.scss'] },
          test: /\.(css|scss)$/,
          use: [
            IS_DEV
              ? 'style-loader'
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: './',
                  },
                },
            { loader: 'css-loader', options: { sourceMap: IS_DEV } },
            { loader: 'postcss-loader', options: { sourceMap: IS_DEV } },
            { loader: 'sass-loader', options: { sourceMap: IS_DEV } },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: false,
                spriteFilename: (svgPath) => `sprite-sheet${svgPath.substr(-4)}`,
              },
            },
            {
              loader: 'image-webpack-loader',
              options: { svgo: { convertColors: { shorthex: true }, removeComments: true, removeTitle: true } },
            },
          ],
        },
        {
          test: /\.(jpe(?:|g)|png|gif)$/i,
          loaders: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                publicPath: '../images/',
                postTransformPublicPath: (publicPath) =>
                  IS_DEV ? publicPath : `__webpack_public_path__ + ${publicPath}`,
              },
            },
            {
              loader: 'image-webpack-loader',
              options: { disabled: true },
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
      }),
      new MonacoWebpackPlugin()
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        src: path.resolve('src'),
        utils: path.resolve('src/utils'),
        components: path.resolve('src/components'),
        actions: path.resolve('src/actions'),
        reducers: path.resolve('src/reducers'),
        services: path.resolve('src/services'),
      },
    },
    devtool: IS_DEV ? 'inline-source-map' : false,
  };

  if (!IS_DEV) {
    webpackConfig.plugins = webpackConfig.plugins.concat([
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash].css',
        chunkFilename: '[name]-[contenthash].css',
        ignoreOrder: true,
      }),
    ]);
  }

  return webpackConfig;
};
