const cookie = require ('cookie-parser');
const session = require('express-session');
const express = require('express');
const { getAddAppointment, getAppointment, getDeleteAppointment, getEditAppointment, postAddAppointment, postEditAppointment, postDeleteAppointment } = require('../controllers/appointmentController');

const router = express.Router();
router.use(cookie());

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.get('*', function(req, res, next) {
    if(req.cookies['username'] == undefined)
        res.redirect('/login');
    else   
        next();
});


router.get('/', getAppointment);
router.get('/add', getAddAppointment);
router.get('/edit/:id', getEditAppointment);
router.get('/delete/:id', getDeleteAppointment);

router.post('/add', postAddAppointment);
router.post('/edit/:id', postEditAppointment);
router.post('/delete/:id', postDeleteAppointment);


module.exports = router;