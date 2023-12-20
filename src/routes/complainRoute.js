const cookie = require ('cookie-parser');
const session = require('express-session');
const express = require('express');
const { checkInbox, getInbox } = require('../controllers/inboxController');
const { getComplain, postComplain, postDeleteComplain } = require('../controllers/complainController');

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

router.get('/', getInbox);
router.get('/add', getComplain);

router.post('/add', postComplain);
router.post('/delete/:id', postDeleteComplain);


module.exports = router;
