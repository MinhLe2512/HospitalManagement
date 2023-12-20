const { getallfromtable, findvalueswithkey, add_appointment, edit_appointment, deletefromtablewithkey } = require('../database/database');

const getAppointment = async (req, res) => {
    let getAllAppPromise = new Promise((resolve) => {
        resolve(getallfromtable("appointment"));
    });
    const appointmentRes = await getAllAppPromise;
    res.render('appointment.ejs', {list: appointmentRes});
};

const getAddAppointment = (req, res) => {
    res.render('add_appointment.ejs');
}

const getEditAppointment = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(findvalueswithkey("appointment", "id", id));
    });
    const results = await promise;
    res.render('edit_appointment.ejs', { list: results });
}

const getDeleteAppointment = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(findvalueswithkey("appointment", "id", id));
    });
    const results = await promise;
    res.render('delete_appointment.ejs', { list: results });
}

const postAddAppointment = async (req, res) => {
    var p_name = req.body.p_name;
    var department = req.body.department;
    var d_name = req.body.d_name;
    var date = req.body.date;
    var time = req.body.time;
    var email = req.body.email;
    var phone = req.body.phone;
    
    let promise = new Promise((resolve) => {
        resolve(add_appointment(p_name, department, d_name, date, time, email, phone));
    });
    const isSuccessful = await promise;
    if (!isSuccessful) 
        res.send("Error adding appointment");
    else 
        res.redirect('/appointment');
}

const postEditAppointment = async (req, res) => {
    var id = req.params.id;
    var p_name = req.body.p_name;
    var department = req.body.department;
    var d_name = req.body.d_name;
    var date = req.body.date;
    var time = req.body.time;
    var email = req.body.email;
    var phone = req.body.phone;
    let promise = new Promise((resolve) => {
        resolve(edit_appointment(id, p_name, department, d_name, date, time, email, phone));
    });
    const isSuccessful = await promise;
    if (!isSuccessful) 
        res.send("Error editing appointment");
    else 
        res.redirect('/appointment');
}

const postDeleteAppointment = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(deletefromtablewithkey("appointment", "id", id));
    });
    const isSuccessful = await promise;
    if (!isSuccessful) 
        res.send("Error editing appointment");
    else 
        res.redirect('/appointment');
}

module.exports = {
    getAppointment,
    getAddAppointment,
    getEditAppointment,
    getDeleteAppointment,
    postAddAppointment,
    postEditAppointment,
    postDeleteAppointment
};