module.exports = {
  // 腾讯云配置
  "tencentCos": {
    // 密钥
    "secretId": "1",
    "secretKey":"xxxx",
    // 桶名
    "bucket":"contest-1255882558",
    // 地域
    "region":"ap-guangzhou",
    // 云端外网URL地址前缀
    "urlPrefix":"https://contest-1255882558.cos-website.ap-guangzhou.myqcloud.com"
  },
  // 同步目录，可多个
  "dirs": [
    {
      // 假设该目录下有 abc、ef 这样2个文件夹（/data/testSync/abc、/data/testSync/ef）
      "local": "/data/testSync",
      // 云端以自己姓名拼音作为一级目录，结果应为 yangxin/testSync/abc、yangxin/testSync/ef
      "online": "yangxin/testSync"
    },
    {
      // 假设该目录下有 abc、ef 这样2个文件夹（/data/testSync/abc、/data/testSync/ef）
      "local": "/data/test",
      // 云端以自己姓名拼音作为一级目录，结果应为 yangxin/test/abc、yangxin/test/ef
      "online": "yangxin/test"
    }
  ],
  // 同时可同步文件数
  batchFileLimit: 10,
  // 超时时间，毫秒
  timeout: 3000,
  // 日志目录
  logDir: "./logs/",
  // 切片大小 kb
  chunkSize: 2000,
  // 检测新文件扫描频率，秒
  scanInterval: 60,
  // 文件完整性校验算法，如腾讯云有特别指明以腾讯云为准
  checkAlgorithm: "md5"
}