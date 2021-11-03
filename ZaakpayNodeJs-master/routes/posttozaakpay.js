var express = require('express');
var checksum = require('../lib/checksum');
const transacturl = require('../lib/config');
var router = express.Router();

router.get('/transact',function(req,res,next) {
  res.render('test_merchant_input');
});

router.post('/transact', function(req, res, next) {
  var checksumstring = checksum.getChecksumString(req.body);
  // console.log("checksum string:"+checksumstring);
  var calculatedchecksum = checksum.calculateChecksum(checksumstring);
  // console.log("checksum "+calculatedchecksum);
  var url = transacturl.merchantInfo.transactApi;
  //console.log(url);

  res.render('transact', {
        data: req.body,
        checksum: calculatedchecksum,
        checksumstring: checksumstring,
        url:url
    });
  res.end();
});

module.exports = router;
