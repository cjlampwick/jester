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

router.get(
  '/customers', 
  userController.allowIfLoggedin,
  userController.getCustomers
);

router.get(
  '/groups',
  userController.allowIfLoggedin,
  groupController.getGroups
);

router.get('/groups/getModal',userController.allowIfLoggedin,
  function (req, res, next) {
    res.render('modals/groups/'+req.query.modal);
  }
);

router.post('/groups/add', userController.allowIfLoggedin, groupController.newGroup);

module.exports = router;
