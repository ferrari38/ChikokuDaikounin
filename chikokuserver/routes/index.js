var express = require('express');
var router = express.Router();

/*****
 npm startでサーバースタート
 *****/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
