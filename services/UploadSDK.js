const path = require('path')
const { asyncPool } = require('../libs/utils')

// const local = path.join(__dirname, '../local')
// const online = path.join(__dirname, '../online')

const config = require(path.join(__dirname, '../config/config.js'))

const { getFile, uploadFile, moveFile } = require('../libs/file')

// const fetch = function (url) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(1)
//       if (url === 'G:\\leader-node\\data\\testSync\\3.js') {
//         reject(new Error('get file error ' + url))
//       } else {
//         resolve(url)
//       }
//     }, 1000)
//   })
// }

function getUploadConfig (config) {
  return Object.assign({}, config.tencentCos, {
    // 同时可同步文件数
    batchFileLimit: config.batchFileLimit,
    // 超时时间，毫秒
    timeout: config.timeout,
    // 切片大小 kb
    chunkSize: config.chunkSize,
    // 文件完整性校验算法，如腾讯云有特别指明以腾讯云为准
    checkAlgorithm: config.checkAlgorithm
  })
}

module.exports = function run () {
  const promise = []
  config.dirs.forEach(item => {
    const files = getFile(path.join(__dirname, '..' + item.local), item.online)
    promise.push(...files)
  })
  promise.forEach(() => {})
  // asyncPool(2, promise, (file) => {
  //   return uploadFile(file, getUploadConfig(config))
  // }).then(res => {
  //   console.log(res)
  // })
}
