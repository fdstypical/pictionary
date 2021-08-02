const optimization = {
  production: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      maxSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: false,
      cacheGroups: {
        vendors: {
          filename: '[name].vendor.js',
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          filename: '[name].main.js',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  development: {
    splitChunks: {},
  },
};

module.exports = { optimization };
