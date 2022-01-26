var express = require('express');
var router = express.Router();
const run = require('../services/UploadSDK')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

run()

module.exports = router;
