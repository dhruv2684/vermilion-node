var express = require('express');
var router = express.Router();

var userController = require('../Controller/user')


/* GET home page. */

router.post('/user/signup', userController.userrSignup );

router.post('/user/login', userController.userLogin );

router.get('/user/find', userController.sequre , userController.userFind );

router.delete('/user/delete/:deleteId', userController.userDelete );

router.put('/user/update/:updateId', userController.userUpdate );




module.exports = router;
