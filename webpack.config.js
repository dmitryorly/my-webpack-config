const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const fs = require('fs')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev? `[name].${ext}` : `[name].[hash].${ext}`

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [new OptimizeCssAssetsWebpackPlugin(), new TerserPlugin()]
  }

  return config
}

const cssLoaders = extraLoader => {
  const loaders = [MiniCssExtractPlugin.loader, 'css-loader']
  if (extraLoader) {
    loaders.push(extraLoader)
  }
  return loaders
}

// const pages = fs.readdirSync(path.resolve(__dirname, 'src', 'pages'))

const optimizeFileLoader = () => {
  if (isProd) {
    return [
      'file-loader',
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65
          }
        }
      }
    ]
  } else return ['file-loader']
}

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js')
  },
  mode: 'development',
  devtool: isDev ? 'source-map' : '',
  devServer: {
    port: 4200,
    host: '127.0.0.1' // localhost
  },
  optimization: optimization(),
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/index.html"
    }),
    // ...pages.map( page => {
    //   return new HTMLWebpackPlugin({
    //     filename: page,
    //     template: "./src/pages/" + page
    //   })
    // } ),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: true,
          minimize: isProd
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        use: optimizeFileLoader
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      }
    ]
  }
}