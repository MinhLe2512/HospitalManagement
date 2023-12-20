const cookie = require ('cookie-parser');
const session = require('express-session');
const express = require('express');
const { getStore, getAddMedicine, getEditMedicine, getDeleteMedicine, postSearchMedicine,
     postEditMedicine, postDeleteMedicine, postAddMedicine } = require('../controllers/storeController');
const router = express.Router();
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
router.use(cookie());

router.get('/', getStore);
router.get('/add', getAddMedicine);
router.get('/edit/:id', getEditMedicine);
router.get('/delete/:id', getDeleteMedicine);

router.post('/', postSearchMedicine);
router.post('/add', postAddMedicine);
router.post('/edit/:id', postEditMedicine);
router.post('/delete/:id', postDeleteMedicine);

module.exports = router;