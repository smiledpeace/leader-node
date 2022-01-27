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

module.exports = function run () {
  const promise = []
  config.dirs.forEach(item => {
    const files = getFile(path.join(__dirname, '..' + item.local), item.online)
    promise.push(...files)
  })
  promise.forEach(() => {})
  // asyncPool(2, promise, (file) => {
  //   // console.log(file)
  //   return uploadFile(file, config.tencentCos)
  // }).then(res => {
  //   console.log(res)
  // })
  const filePath = promise.length ? promise[0].filePath : ''
  moveFile(filePath, path.join(__dirname, '../data/online', path.basename(filePath)))
}
