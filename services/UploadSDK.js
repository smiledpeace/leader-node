const fs = require('fs-extra')
const path = require('path')
const { asyncPool } = require('../libs/utils')

// const local = path.join(__dirname, '../local')
// const online = path.join(__dirname, '../online')

const config = require( path.join(__dirname, '../config/config.js'))

const getFile = require('../libs/file')

const logger = require('../libs/log')('sdk')

const fetch = function (url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1)
      if (url === 'G:\\leader-node\\data\\testSync\\3.js') {
        reject('get file error ' + url)
      } else {
        resolve(url)
      }
      
    }, 1000)
  })
}

module.exports = function run () {
  const promise = getFile(path.join(__dirname, '..' + config.dirs[0].local))
  asyncPool( 2, promise, fetch).then(res => {
    console.log(res)
  })
  
  
}
