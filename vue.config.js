const path = require('path')
const env = process.env.NODE_ENV

// 拼接路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
