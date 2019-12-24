const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const groupController = require('../controllers/groupController');

//this will be here until we create all the controllers
let data = {
  actions: []
};

/* GET home page. */
router.get('/', userController.allowIfLoggedin, function (req, res, next) {
  res.render('index', {
    title: 'Home',
    view: 'dashboard',
    data
  });
});

router.get('/config', userController.allowIfLoggedin, function (req, res, next) {
  res.render('index', {
    title: 'Configuration',
    view: 'config',
    data
  });
});

router.get('/messages', userController.allowIfLoggedin, function (req, res, next) {
  res.render('index', {
    title: 'Messages',
    view: 'messages',
    data
  });
});

router.get('/dashboard', userController.allowIfLoggedin, function (req, res, next) {
  res.render('index', {
    title: 'Dashboard',
    view: 'dashboard',
    data
  });
});

router.get('/agents', userController.allowIfLoggedin, function (req, res, next) {
  res.render('index', {
    title: 'Agents',
    view: 'agents',
    data
  });
});

router.get('/customers', userController.allowIfLoggedin, function (req, res, next) {
  res.render('index', {
    title: 'Customers',
    view: 'customers',
    data
  });
});

router.get('/groups', userController.allowIfLoggedin, function (req, res, next) {
  res.render('index', {
    title: 'Groups',
    view: 'groups',
    data
  });
});
module.exports = router;
