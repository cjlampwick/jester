const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', userController.allowIfLoggedin, function (req, res, next) {
  res.render('index', {
    title: 'Home',
    view: 'dashboard'
  });
});

router.get('/config', userController.allowIfLoggedin, function (req, res, next) {
  res.render('index', {
    title: 'Configuration',
    view: 'config'
  });
});

router.get('/messages', userController.allowIfLoggedin, function (req, res, next) {
  res.render('index', {
    title: 'Messages',
    view: 'messages'
  });
});

router.get('/dashboard', userController.allowIfLoggedin, function (req, res, next) {
  res.render('index', {
    title: 'Dashboard',
    view: 'dashboard'
  });
});

module.exports = router;
