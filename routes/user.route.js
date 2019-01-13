var express = require('express');

var controller = require('../controllers/user.controller');

var router = express.Router();

router.get('/', controller.index);

router.post('/', controller.newUser);

router.get('/:userID', controller.viewDetailUser);

router.put('/:userID', controller.updateUserID);

router.delete('/:userID', controller.deleteUser);

module.exports = router;