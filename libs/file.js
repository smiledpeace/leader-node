const fs = require('fs-extra')
const path = require('path')

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

const getFile = function (dir) {
  const result = []
  
  function findFilePath (dir) {
    const files = fs.readdirSync(dir)
  
    files.forEach(file => {
      const filePath = path.join(dir, file)
      if (isDir(filePath)) {
        return findFilePath(filePath)
      } else {
        result.push(filePath)
      }
    })
  }
  
  findFilePath(dir)
  
  return result
}

const uploadFile = function (config) {
  // // 腾讯云配置
  // const Bucket = 'hjx-1255882558';
  // const Region = 'ap-guangzhou';
  // let url = `basecenter/tecentCos/getCredential`;
  // const upurl = 'https://imgcdn2.huangjinx.com';
  // console.log(upurl);
  // api.query(req, url, 'post', {}, (resData) => {
  //   if (resData.code != 200) {
  //     return res.send({ result: 'FALSE', msg: '访问失败' })
  //   }
  //   let data = resData.data;
  //   try{
  //     data = JSON.parse(data);
  //     // console.log(data);
  //   } catch (e) {
  //     console.log(e)
  //   }
  //
  //   var cos = new COS({
  //     FileParallelLimit: 5,
  //     ChunkParallelLimit: 5,
  //     getAuthorization: function (options, callback) {
  //       callback({
  //         TmpSecretId: data.credentials && data.credentials.tmpSecretId,
  //         TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
  //         XCosSecurityToken: data.credentials && data.credentials.sessionToken,
  //         ExpiredTime: data.expiredTime
  //       });
  //     }
  //   });
  //   let { path: filePath, originalFilename } = req.files.file;
  //   const newPath = path.join(path.dirname(filePath), originalFilename.split('/').pop());
  //
  //   originalFilename = Date.now().toString() + '_' + originalFilename;
  //
  //   fs.rename(filePath, newPath, (err) => {
  //     if (err) {
  //       console.log(err)
  //       return res.send({ result: 'FALSE', msg: err })
  //     } else {
  //       cos.sliceUploadFile({
  //         Bucket: Bucket, /* 必须 */
  //         Region: Region,    /* 必须 */
  //         Key: `jjh/${originalFilename}`,              /* 必须 */
  //         FilePath: newPath,                /* 必须 */
  //       }, function(err, data) {
  //         // console.log(err || data);
  //         res.send({
  //           code: data.statusCode,
  //           data: {
  //             goodsViewPath: data.Location.replace('hjx-1255882558.cos.ap-guangzhou.myqcloud.com', upurl)
  //           }
  //         })
  //       });
  //     }
  //   });
  //
  // })
}

module.exports = getFile
