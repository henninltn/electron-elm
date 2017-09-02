import path from 'path'
import webpack from 'webpack'
import CopyPkgJsonPlugin from 'copy-pkg-json-webpack-plugin'

export default {
  devtool: 'source-map',

  target: 'electron',

  entry: './src/main.js',

  output: {
    path: path.resolve(`${__dirname}/dist`),
    filename: 'main.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
    ],
  },

  // if true, webpack replace them with the path relative to the context
  // if false, there are real __dirname, __filename
  node: {
    __dirname: false,
    __filename: false
  },

  plugins: [
    // copy /package.json to /dist/package.json
    new CopyPkgJsonPlugin({
      remove: ['scripts', 'repository', 'bugs', 'homepage', 'dependencies', 'devDependencies'],
      replace: {
        main: './main.js',
        scripts: {
          postinstall: 'npm rebuild --runtime=electron --target=1.7.5 --disturl=https://atom.io/download/atom-shell --build-from-source',
        },
      }
    }),

    // this environment variables is determined at compile time
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
}
