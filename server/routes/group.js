const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const userController = require('../controllers/userController');

// router.get('/', userController.allowIfLoggedin, groupController.getGroups);
// router.get('/:groupId', userController.allowIfLoggedin, groupController.getGroup);
router.post('/add', userController.allowIfLoggedin, groupController.newGroup);
router.delete('/:groupId', userController.allowIfLoggedin, groupController.removeGroup);

module.exports = router;