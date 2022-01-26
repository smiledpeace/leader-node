const log4js = require('log4js')
const log4Config = require('../config/log4js.js')
log4js.configure(log4Config)


module.exports = log4js.getLogger();
