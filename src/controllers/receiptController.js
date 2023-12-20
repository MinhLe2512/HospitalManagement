const { getallfromtable, findvalueswithkey } = require('../database/database');

const checkReceipt = (req, res, next) => {
    if (req.cookies['username'] == undefined)
        res.redirect('/login');
    else
        next();
};

const getReceipt = async (req, res) => {
    let promise = new Promise((resolve) => {
        resolve(getallfromtable("employee"));
    });
    const results = await promise;
    res.render('salary.ejs', { employee: results });
};

const postSearchEmployeeWithId = async (req, res) => {
    const key = req.body.search;
    let promise = new Promise((resolve) => {
        resolve(findvalueswithkey("employee", "name", key));
    });
    const results = await promise;
    res.render('salary.ejs', {employee : results});
}

const getGenerateSlip = async(req, res) => {
    const id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(findvalueswithkey("employee", "id", id));
    });
    const results = await promise;
    var name = results[0].name;
    var emp_id = results[0].id;
    var email = results[0].email;
    var role = results[0].role;
    var salary = results[0].salary;
    var join_date = results[0].join_date;
    var contact = results[0].contact;
    res.render('payslip.ejs',
        {name : name,
        id:emp_id,
        email:email,
        role:role,
        salary:salary,
        join_date:join_date,
        contact:contact});
}

module.exports = {
    checkReceipt,
    getReceipt,
    postSearchEmployeeWithId,
    getGenerateSlip
};