const path = require('path')
module.exports = {
    // devtool: 'source-map',
    productionSourceMap:false,
    publicPath: '/dyvue2-admin/',
    assetsDir: './dyvue2-admin/',
    lintOnSave: true,
    configureWebpack: {
      resolve: {
        alias: {
          assets: '@/assets',
          common: '@/common',
          components: '@/components',
          packages: '@/packages',
          views: '@/views'
        }
      },
      devServer: {
        host: '0.0.0.0',
        port: 8081,
        open: false
  
      }
    },
    chainWebpack: config => {
      const oneOfsMap = config.module.rule('scss').oneOfs.store
      oneOfsMap.forEach(item => {
          item.use('sass-resources-loader')
              .loader('sass-resources-loader')
              .options({
                  resources: [
                      './src/assets/styles/resources/*.scss',
                      './src/assets/sprites/*.scss'
                  ]
              })
              .end()
      })
 
      // config.plugin('html')
      //     .tap(args => {
      //         args[0].title = process.env.VUE_APP_TITLE
      //         if (isCDN) {
      //             args[0].cdn = cdn
      //         }
      //         args[0].debugTool = process.env.VUE_APP_DEBUG_TOOL
      //         return args
      //     })
  }
  //   pluginOptions: {
  //     lintStyleOnBuild: true,
  //     stylelint: {
  //         fix: true
  //     },
  // },
  }
  