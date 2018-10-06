const path = require('path')
const WebpackOptionalPlugin = require('../')

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  entry: path.resolve(__dirname, 'src/index.js'),
  resolve: {
    plugins: [
      new WebpackOptionalPlugin({
        enabled: process.env.NODE_ENV === 'development',
        include: [
          path.resolve(__dirname, 'src', 'fixtures')
        ]
      })
    ]
  }
}