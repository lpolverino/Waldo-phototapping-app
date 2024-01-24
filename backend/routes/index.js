var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WaldoApi', link:"https://github.com/lpolverino/Waldo-phototapping-app" });
});

module.exports = router;
