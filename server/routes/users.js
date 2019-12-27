const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:userId', userController.allowIfLoggedin, userController.getUser);
router.get('/', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.post('/new', userController.allowIfLoggedin, userController.signup);

router.delete('/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

module.exports = router;