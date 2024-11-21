const webpack = require('webpack');

module.exports = {
    resolve: {
      fallback: {
        "buffer": require.resolve("buffer/"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "http": require.resolve("stream-http"),
        "querystring": require.resolve("querystring-es3"),
        "zlib": require.resolve("browserify-zlib")
        // "assert": false,
        // "fs": false,
        // "path": false,
        // "util": false,
        // "https": false,
        // "os": false
      },
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        })
    ]
  };