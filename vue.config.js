module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  // publicPath: '/app',
  // outputDir: 'dist',
  // indexPath: 'index2.html',
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
}
