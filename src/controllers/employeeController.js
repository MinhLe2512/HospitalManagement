const { getallfromtable, findvalueswithkey, deletefromtablewithkey, add_employee, edit_employee, edit_leave, add_leave } = require('../database/database');

const getEmployee = async (req, res) => {
    let promise =  new Promise((resolve) => {
        resolve(getallfromtable("employee"));
    });
    var results = await promise;
    res.render('employee.ejs', {employee : results});
};

const getAddEmployee = (req, res) => {
    res.render('add_employee.ejs');
};

const getEditEmployee = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(findvalueswithkey("employee", "id", id));
    });
    const results = await promise;
    res.render('edit_employee.ejs', { list: results });
};

const getDeleteEmployee = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(findvalueswithkey("employee", "id", id));
    });
    const results = await promise;
    res.render('delete_employee.ejs', { list: results });
};

const getAllLeaves = async (req, res) => {
    let promise = new Promise((resolve) => {
        resolve(getallfromtable("leaves"));
    });
    const results = await promise;
    res.render('leave.ejs', { user : results });
}

const getAddLeaves = (req, res) => {
    res.render('add_leave.ejs');
}

const getEditLeaves = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(findvalueswithkey("leaves", "id", id));
    });
    const results = await promise;
    res.render('edit_leave.ejs', { user : results });
}

const postSearchEmployeeWithId = async (req, res) => {
    const key = req.body.search;
    let promise = new Promise((resolve) => {
        resolve(findvalueswithkey("employee", "name", key));
    });
    const results = await promise;
    res.render('employee.ejs', {employee : results});
}

const postAddEmployee = async (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var contact = req.body.contact;
    var date = req.body.date;
    var salary = req.body.salary;
    var role = req.body.role;
    
    let promise = new Promise((resolve) => {
        resolve(add_employee(name, email, contact, date, role, salary));
    });
    const isSuccessful = await promise;
    if (!isSuccessful) 
        res.send("Error adding employee");
    else 
        res.redirect('/employee');
}

const postEditEmployee = async (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var contact = req.body.contact;
    var date = req.body.date;
    var salary = req.body.salary;
    var role = req.body.role;
    let promise = new Promise((resolve) => {
        resolve(edit_employee(id, name, email, contact, date, role, salary));
    });
    let isSuccessful = await promise;
    if (isSuccessful)
        res.redirect('/employee');
    else
        res.send('Error editing employee');
}

const postDeleteEmployee = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(deletefromtablewithkey("employee", "id", id));
    });
    let isSuccessful = await promise;
    if (isSuccessful)
        res.redirect('/employee');
    else
        res.send('Error deleting employee');
}

const postAddLeave = async (req, res) => {
    var name = req.body.name;
    var id = req.body.id;
    var leave_type = req.body.leave_type;
    var from = req.body.from;
    var to = req.body.to;
    var reason = req.body.reason;
    let promise = new Promise((resolve) => {
        resolve(add_leave(name, id, leave_type, from, to, reason));
    });
    let isSuccessful = await promise;
    if (isSuccessful)
        res.redirect('/employee/leave');
    else
        res.send('Error adding leave');
}

const postEditLeave = async (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var leave_type = req.body.leave_type;
    var from = req.body.from;
    var to = req.body.to;
    var reason = req.body.reason;
    let promise = new Promise((resolve) => {
        resolve(edit_leave(id, name, leave_type, from, to, reason));
    });
    let isSuccessful = await promise;
    if (isSuccessful)
        res.redirect('/employee/leave');
    else
        res.send('Error editing leave');
}

const postDeleteLeave = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(deletefromtablewithkey('leaves', 'id', id));
    });
    let isSuccessful = await promise;
    if (isSuccessful)
        res.redirect('/employee/leave');
    else
        res.send('Error deleting leave');
}


module.exports = {
    getEmployee,
    getAddLeaves,
    getEditLeaves,
    getAddEmployee,
    getEditEmployee,
    getDeleteEmployee,
    getAllLeaves,
    postSearchEmployeeWithId,
    postAddEmplyee: postAddEmployee,
    postEditEmployee,
    postDeleteEmployee,
    postAddLeave,
    postEditLeave,
    postDeleteLeave
}