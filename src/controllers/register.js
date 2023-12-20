require('dotenv').config();
const randomToken = require('random-token'); 
const {register, verify, getuserid, addnewusers} = require('../database/database');
const { validationResult } = require("express-validator");
const getRegister = (req, res) => {
    res.render('register.ejs'); 
};

const postRegister = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    var email_status = "not_verified";
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    let myRegisterPromise = new Promise((resolve) => {
        resolve(register(email));
    });
    let results = await myRegisterPromise;
    if (results[0] === undefined) {
        addnewusers(username, email, password, email_status);
    }
    else {
        console.log("email has already existed!");
    }
    res.redirect('login');
}

module.exports = {
    getRegister,
    postRegister
};