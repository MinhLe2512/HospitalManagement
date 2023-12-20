const cookie = require ('cookie-parser');
const session = require('express-session');
const express = require('express');
const { getAddEmployee, getEditEmployee,  getEmployee, getAllLeaves, getEditLeaves,
     postSearchEmployeeWithId, getDeleteEmployee, postAddEmplyee, postEditEmployee, getAddLeaves, postDeleteEmployee, postEditLeave, postDeleteLeave, postAddLeave } = require('../controllers/employeeController');


const router = express.Router();
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
router.use(cookie());

router.get('/', getEmployee);

router.get('/add', getAddEmployee);
router.get('/edit/:id', getEditEmployee);
router.get('/delete/:id', getDeleteEmployee);
router.get('/leave', getAllLeaves);
router.get('/leave/add', getAddLeaves);
router.get('/leave/edit/:id', getEditLeaves);
router.get('/leave/delete/:id', getEditEmployee);

router.post('/', postSearchEmployeeWithId);
router.post('/add', postAddEmplyee);
router.post('/edit/:id', postEditEmployee);
router.post('/delete/:id', postDeleteEmployee);
router.post('/leave/add', postAddLeave);
router.post('/leave/edit/:id', postEditLeave);
router.post('/leave/delete/:id', postDeleteLeave);

module.exports = router;