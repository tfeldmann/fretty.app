const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/embed.html',
        inject: false,
        chunks: ['embed'],
        filename: 'embed.html',
      })
    ],
    entry: {
      embed: [
        './src/embed.js'
      ]
    }
  }
};
