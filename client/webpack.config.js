const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', 
        filename: './index.html', 
        title: 'JATE',
      }),
      new HtmlWebpackPlugin({
        template: './src/install.html', // path to your install HTML template
        filename: 'install.html', // output HTML file name
        chunks: ['install'], // specify which chunks to include in this HTML file
      }),
      new WebpackPwaManifest({
        name: 'JATE: a text editor',
        short_name: 'JATE',
        description: 'Text Editor',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], 
            destination: path.join('assets', 'icons'),
          }
        ]
      }),
      new InjectManifest({
        swSrc: './src/sw.js', // path to service worker file
        swDest: 'src-sw.js',
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/, // match CSS files
          use: ['style-loader', 'css-loader'] // use style-loader and css-loader
        },
        {
          test: /\.js$/, // match JS files
          exclude: /node_modules/, // exclude node_modules
          use: {
            loader: 'babel-loader', // use babel-loader
            options: {
              presets: ['@babel/preset-env'] // configure presets
            }
          }
        }
      ],
    },
  };
};

