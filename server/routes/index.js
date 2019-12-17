const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', userController.allowIfLoggedin, function(req, res, next) {
  res.render('index', { title: 'Index Page' });
});

module.exports = router;
