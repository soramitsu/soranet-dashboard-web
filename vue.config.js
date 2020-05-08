module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Sora - Top XOR holders'
        return args
      })
  }
}
