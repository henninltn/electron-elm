import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { spawn } from 'child_process'

const port = process.env.PORT || 1212
// public path when dev server is running
const publicPath = `http://localhost:${port}/dist`

export default {
  devtool: 'inline-source-map',

  target: 'electron-renderer',

  entry: [
    `webpack-dev-server/client?${publicPath}/`,
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],

  output: {
    publicPath: `${publicPath}/`,
    path: path.resolve(`${__dirname}/dist`),
    filename: 'index.js',
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: 'elm-webpack-loader',
          options: {
            verbose: true,
            warn: true,
          },
        }
      },
    ],

    noParse: /\.elm$/,
  },

  // if true, webpack replace them with the path relative to the context
  // if false, there are real __dirname, __filename
  node: {
    __dirname: false,
    __filename: false
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    // the relative path of the module to be displayed when HMR is enabled
    new webpack.NamedModulesPlugin(),

    // for HMR
    new webpack.NoEmitOnErrorsPlugin(),

    // copy /src/app.html to /dist/app.html
    new HtmlWebpackPlugin({
      template: './src/app.html',
      filename: 'app.html',
      inject: false,
    }),

    // this environment variables is determined at compile time
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],

  devServer: {
    port,
    publicPath,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
    setup() {
      if (process.env.START_HOT) {
        console.log('Staring Main Process...');
        spawn(
          'npm',
          ['run', 'dev-main'],
          { shell: true, env: process.env, stdio: 'inherit' }
        )
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError));
      }
    }
  },
}
