const express = require('express');
const { getHomePage, getLandingPage } = require('../controllers/homeController');
const { getRegister, postRegister } = require('../controllers/register');
const getLogout = require('../controllers/logoutController');
const getVerify = require('../controllers/verifyController');
const { getSetPassword, getResetPassword } = require('../controllers/passwordController');
const { getLogin, postLogin } = require('../controllers/login')
const { check } = require("express-validator");
const session = require('express-session');
const cookie = require ('cookie-parser');

const router = express.Router();

router.use(cookie());

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.get('/', getLandingPage);

router.get('/login', getLogin);
router.get('/register', getRegister);
router.get('/home', getHomePage);
//router.get('/doctors', getDoctor);
router.get('/resetpassword', getResetPassword);
router.get('/setpassword', getSetPassword);
//router.get('/employee', getEmployee);
router.get('/logout', getLogout);
router.get('/verify', getVerify);
//router.get('/store', getStore);
// router.get('/edit', function(req, res) {
//     res.render('edit_department.ejs');
// });

router.post('/register', 
    [check('username').notEmpty().withMessage('username is required'),
    check('password').notEmpty().withMessage('password is required'),
    check('email').notEmpty().withMessage('email is required')],
    postRegister
);

router.post('/login', 
    [check('username').notEmpty().withMessage('username is required'),
    check('password').notEmpty().withMessage('password is required')],
    postLogin
);


module.exports = router;