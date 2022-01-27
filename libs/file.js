const fs = require('fs')
const path = require('path')
const COS = require('cos-nodejs-sdk-v5')
const logger = require('../libs/log')('upload-file')
const { integrityChecking } = require('../libs/utils')
/**
 * 是否是文件目录
 * @param {string} dir
 */
const isDir = dir => fs.lstatSync(dir).isDirectory()

/**
 * 获取文件
 * @param {string} dir
 * @param {string} online
 * @return { array } result
 */

const getFile = function (dir, online) {
  const result = []

  function findFilePath (dir) {
    if (!fs.existsSync(dir)) {
      return
    }
    const files = fs.readdirSync(dir)

    files.forEach(file => {
      const filePath = path.join(dir, file)
      if (isDir(filePath)) {
        findFilePath(filePath)
      } else {
        if (path.basename(filePath).startsWith('.')) {
          moveFile(filePath, path.join(__dirname, '../data/temp', path.basename(filePath)))
        } else {
          result.push({ filePath, online })
        }
      }
    })
  }

  findFilePath(dir)

  return result
}

const uploadFile = function (file, config) {
  logger.info('ssssss')
  // // 腾讯云配置
  const Bucket = config.bucket
  const Region = config.region
  const cos = new COS({
    FileParallelLimit: config.batchFileLimit, // 控制文件上传并发数
    ChunkParallelLimit: 8, // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
    ChunkSize: config.chunkSize, // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
    SecretId: config.secretId,
    SecretKey: config.secretKey
  })
  const { filePath } = file
  const rkey = randomKey()
  const key = `${file.online}/${rkey}/${path.basename(filePath)}`

  return new Promise((resolve, reject) => {
    cos.uploadFile({
      Bucket: Bucket, /* 必须 */
      Region: Region, /* 必须 */
      Key: key, /* 必须 */
      FilePath: filePath /* 必须 */,
      SliceSize: config.sliceSize, /* 触发分块上传的阈值，超过5MB使用分块上传，非必须 */
      Timeout: config.timeout, // 上传超时时间
      onProgress (data) {
        console.log(data)
      }
    }, function (err, data) {
      if (err) {
        logger.error(err.error)
        reject(err.error)
        return
      }
      if (data.statusCode === 200) {
        // 完整性校验
        integrityChecking(filePath).then(crc64ecma => {
          if (crc64ecma === data.headers['x-cos-hash-crc64ecma']) {
            resolve(`https://${data.Location}`)
            moveFile(filePath, path.join(__dirname, '../data/online', `${rkey}-${path.basename(filePath)}`))
          } else {
            logger.error('完整性校验失败，filePath = ' + filePath + ';code = ' + crc64ecma)
            return uploadFile(file, config) // 重新上传
          }
        })
      }
    })
  })
}

function randomKey () {
  return Math.random().toString(16).slice(2, 8)
}

function moveFile (oldPath, newPath) {
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath)
  }
}
module.exports = {
  getFile,
  uploadFile,
  moveFile
}
