const {
  genericConfig,
  plugins,
  devServer,
  output,
  optimization,
} = require('./webpack');

async function webpackPrestart(env, { mode }) {
  return {
    ...genericConfig,
    output: output[mode],
    plugins: plugins[mode],
    optimization: optimization[mode],
    devServer,
    target: mode === 'development' ? 'web' : 'browserslist',
  };
}

module.exports = webpackPrestart;
