const path = require('path')
const cdnDependencies = require('./dependencies.cdn')
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const terserPlugin = require('terser-webpack-plugin')
  
// CDN 相关
const isCDN = process.env.VUE_APP_CDN == 'ON'
const externals = {}
cdnDependencies.forEach(pkg => {
    externals[pkg.name] = pkg.library
})
const cdn = {
    css: cdnDependencies.map(e => e.css).filter(e => e),
    js: cdnDependencies.map(e => e.js).filter(e => e)
}
// gzip 相关
const isGZIP = process.env.VUE_APP_GZIP == 'ON'
module.exports = {
    // devtool: 'source-map',
    productionSourceMap:false,
    publicPath: '/DynamicVue2/',
    assetsDir: './DynamicVue2/',
    lintOnSave: true,
    configureWebpack: {
      resolve: {
        alias: {
          assets: '@/assets',
          common: '@/common',
          components: '@/components',
          packages: '@/packages',
          views: '@/views',
        }
      },
      devServer: {
        host: '0.0.0.0',
        port: 8081,
        open: false
  
      },
      externals:isCDN?externals:{},
      // optimization : {
        // minimizer: [
        //     new terserPlugin({
        //         terserOptions: {
        //             compress: {
        //                 warnings: false,
        //                 drop_console: true,
        //                 drop_debugger: true,
        //                 pure_funcs: ['console.log']
        //             }
        //         }
        //     })
        // ]
      // }
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
      
              config.plugin('html')
            .tap(args => {
                args[0].title = process.env.VUE_APP_TITLE
                if (isCDN) {
                    args[0].cdn = cdn
                }
                args[0].debugTool = process.env.VUE_APP_DEBUG_TOOL
                return args
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

  