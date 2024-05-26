const path = require('path');
const webpack = require('webpack');
module.exports = {
  // Your existing Webpack configuration
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "buffer": require.resolve("buffer/")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  devServer: {
    // Remove deprecated options
    // onAfterSetupMiddleware: function (devServer) { /* custom middleware */ },
    // onBeforeSetupMiddleware: function (devServer) { /* custom middleware */ },

    // Use the new setupMiddlewares option
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // Define your middleware here
      // Example: devServer.app.use(someMiddleware());

      return middlewares;
    }
  }
};
