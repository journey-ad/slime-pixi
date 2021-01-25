module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://cdn.jsdelivr.net/gh/journey-ad/slime-pixi@gh-pages/'
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