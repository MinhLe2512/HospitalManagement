const cookie = require ('cookie-parser');
const session = require('express-session');
const express = require('express');
const { postSearchEmployeeWithId, getReceipt, getGenerateSlip } = require('../controllers/receiptController');

const router = express.Router();
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
router.use(cookie());

router.get('/', getReceipt);
router.get('/generateslip/:id', getGenerateSlip);

router.post('/', postSearchEmployeeWithId);

module.exports = router;