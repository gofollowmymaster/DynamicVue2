module.exports = {
  // devtool: 'source-map',
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    },
    devServer: {
      host: '0.0.0.0',
      port: 8081,
      open: false,
     
    }
  }
}
