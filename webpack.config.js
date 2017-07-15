const path = require("path");
module.exports = {
  entry: "./js/app.jsx",
  output: {
    path: path.resolve("js"),
    filename: "app.js"
  },
  devServer: {
    inline: true,
    contentBase: './',
    port: 3001
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.jsx$/, exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: [ 'es2015',
        'stage-2',
        'react'] }
      },
    {
      test: /\.html$/,
      loaders: ['raw-loader']
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader','sass-loader']
    },
    {
      test: /\.png$/,
      loader: "url-loader",
      query: { mimetype: "image/png" }
     }
    ]
  }
}
