var express = require('express');
var router = express.Router();

var userController = require('../Controller/user')
var blogController = require('../Controller/blog')



const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

// 

router.post('/create', userController.sequre , upload.single('image') , blogController.blogcreate );

router.get('/find/', blogController.blogfind );

router.get('/search', blogController.blogSearch );

router.get('/findone/:findId', blogController.blogfindone );

router.delete('/delete/:deleteId', blogController.blogdelete );

router.put('/update/:UpdateId',  upload.single('image') , blogController.blogupdate );


module.exports = router;