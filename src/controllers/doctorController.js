const{ getallfromtable, findvalueswithkey, add_doctor, edit_doctor, deletefromtablewithkey } = require('../database/database');

const getDoctor = async (req, res) => {
    let getAllDocsPromise = new Promise((resolve) => {
        resolve(getallfromtable("doctor"));
    });
    const results = await getAllDocsPromise;
    res.render('doctors.ejs', {list : results});
};

const getAddDoctor = async (req, res) => {
    let getAllDeptPromise = new Promise((resolve) => {
         resolve(getallfromtable("departments"));
    });
    const results = await getAllDeptPromise;
    res.render('add_doctor.ejs', { list: results });
};

const getEditDoctor = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(findvalueswithkey("doctor", "id", id));
    });
    const results = await promise;
    res.render('edit_doctor.ejs', { list: results });
}

const getDeleteDoctor = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(findvalueswithkey("doctor", "id", id));
    });
    const results = await promise;
    res.render('delete_doctor.ejs', { list: results });
}

const postAddDoctor = async (req, res) => {
    let promise = new Promise((resolve) => {
        resolve(add_doctor(req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.dob,
            req.body.gender,
            req.body.address,
            req.body.phone,
            req.file.filename,
            req.body.department,
            req.body.biography));
    });
    var isSuccessful = await promise;
    if (isSuccessful) 
        res.send("Error adding doctor");
    else
        res.redirect('/doctors');
}

const postSearchDoctor = async (req, res) => {
    const key = req.body.search;
    let searchPromise = new Promise((resolve) => {
        resolve(findvalueswithkey("doctor", "first_name", key));
    });
    const searchRes = await searchPromise;
    res.render('doctors.ejs', { list: searchRes });
}

const postEditDoctor = async (req, res) => {
    var id = req.body.id;
    var f_name = req.body.first_name;
    var l_name = req.body.last_name;
    var email = req.body.email;
    var dob = req.body.dob;
    var gender = req.body.gender;
    var address = req.body.address;
    var phone = req.body.phone;
    var filename = req.file.filename;
    var department = req.body.department;
    var biography = req.body.biography;
    let promise = new Promise((resolve) => {
        resolve(edit_doctor(id, f_name, l_name, email, dob, gender, address, phone, filename, department, biography));
    });
    const isSuccessful = await promise;
    if (!isSuccessful) 
        res.send("Error editing doctor");
    else 
        res.redirect('/doctors');
}

const postDeleteDoctor = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(deletefromtablewithkey("doctor", "id", id));
    });
    const isSuccessful = await promise;
    if (!isSuccessful) 
        res.send("Error deleting doctor");
    else 
        res.redirect('/doctors');
}


module.exports = {
    getDoctor,
    getAddDoctor,
    getEditDoctor,
    getDeleteDoctor,
    postAddDoctor,
    postSearchDoctor,
    postEditDoctor,
    postDeleteDoctor
}