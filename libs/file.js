const fs = require('fs')
const path = require('path')
const COS = require('cos-nodejs-sdk-v5')
const logger = require('../libs/log')('upload-file')
/**
 * 是否是文件目录
 * @param {string} dir
 */
const isDir = dir => fs.lstatSync(dir).isDirectory()

/**
 * 获取文件
 * @param {string} dir
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
        result.push({ filePath, online })
      }
    })
  }

  findFilePath(dir)

  return result
}

const uploadFile = function (file, config) {
  // // 腾讯云配置
  const Bucket = config.bucket
  const Region = config.region
  const cos = new COS({
    FileParallelLimit: 3, // 控制文件上传并发数
    ChunkParallelLimit: 8, // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
    ChunkSize: 1024 * 1024 * 8, // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
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
      SliceSize: 1024 * 1024 * 5 /* 触发分块上传的阈值，超过5MB使用分块上传，非必须 */
    }, function (err, data) {
      if (err) {
        logger.error(err.error)
        reject(err.error)
        return
      }
      if (data.statusCode === 200) {
        resolve(`https://${data.Location}`)
        moveFile(filePath, path.join(__dirname, '../data/online', `${rkey}-${path.basename(filePath)}`))
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
