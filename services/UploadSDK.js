const fs = require('fs-extra')
const path = require('path')

// const local = path.join(__dirname, '../local')
// const online = path.join(__dirname, '../online')

const config = require( path.join(__dirname, '../config/config.js'))

const getFile = require('../libs/file')

const logger = require('../libs/log')


module.exports =  function run () {
  const promise = getFile(path.join(__dirname, '..' + config.dirs[0].local))
  
  promise.forEach(filePath => {
    // console.log(path.normalize(filePath))
  
    logger.debug('dddddddd', filePath +'1')
  })
  
  
}
