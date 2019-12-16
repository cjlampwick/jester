const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/out', userController.logout);

router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/signup', userController.signup);
router.post('/', userController.login);

module.exports = router;