var express = require('express');
var router = express.Router();

const levelController = require("../controler/levelControler")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/level', levelController.level_list )

router.get('/level/:levelId', levelController.level_detail)

router.post('/level/:levelId', levelController.process_target_position)

router.get('/level/:levelId/highscores', levelController.get_highscores)

router.post('/level/:levelId/highscores', levelController.add_score)

module.exports = router;
