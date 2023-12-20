const cookie = require ('cookie-parser');
const session = require('express-session');
const express = require('express');
const { getAddDoctor, getDeleteDoctor, getDoctor, postSearchDoctor, postAddDoctor, getEditDoctor, postEditDoctor, postDeleteDoctor } = require('../controllers/doctorController')
const path = require('path');
var multer = require ('multer');

const router = express.Router();
router.use(cookie());

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join('./src', '/public/assets/images/upload_images')); //here we specify the destination. in this case i specified the current directory
    },
    filename: function(req, file, cb) {
      console.log(file); //log the file object info in console
      cb(null, file.originalname);//here we specify the file saving name. in this case. 
  //i specified the original file name .you can modify this name to anything you want
    }
});

var upload = multer({ storage: storage });

router.get('*', function(req, res, next) {
    if(req.cookies['username'] == undefined)
        res.redirect('/login');
    else   
        next();
});

router.get('/', getDoctor);
router.get('/add', getAddDoctor);
router.get('/edit/:id', getEditDoctor);
router.get('/delete/:id', getDeleteDoctor);

router.post('/add', upload.single("image"), postAddDoctor);
router.post('/', postSearchDoctor);
router.post('/edit/:id', upload.single("image"), postEditDoctor);
router.post('/delete/:id', postDeleteDoctor);

module.exports = router;