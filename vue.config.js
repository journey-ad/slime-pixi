module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '././'
    : '/',
  productionSourceMap: false,
  chainWebpack: config => {
    config.module
      .rule('atlas')
      .test(/\.atlas$/)
      .use('raw-loader')
      .tap(options => ({
        esModule: false
      }))
      .loader('raw-loader')
      .end()
  }
}