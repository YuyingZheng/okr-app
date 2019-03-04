const path = require('path')
const env = process.env.NODE_ENV

// 拼接路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // webpack.config
  configureWebpack: config => {
    config.resolve.alias['assets'] = resolve('src/assets')
    config.resolve.alias['components'] = resolve('src/components')
    config.resolve.alias['sass'] = resolve('src/sass')
    config.resolve.alias['views'] = resolve('src/views')
  }
}