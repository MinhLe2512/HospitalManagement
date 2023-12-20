const {login} = require('../database/database')
const { validationResult } = require("express-validator");

const getLogin = (req, res) => {
    res.render('login.ejs'); 
};


const postLogin = async (req, res) => {
    const validErr = validationResult(req);
    if (!validErr.isEmpty()) {
        return res.status(422).json({validErr: validErr.array()});
    }
    var email_status = "not_verified";
    var username = req.body.username;
    console.log(username);
    var password = req.body.password;
    console.log(password);

    let myLoginPromise = new Promise((resolve) => {
        resolve(login(username, password));
    });
    let results = await myLoginPromise;
    console.log(results);
    if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.cookie('username', username);
        res.redirect('/home');
    }
    else
        console.log('Incorect username or password');
        //res.send('Incorect username or password');
    res.end();
};

module.exports ={
    postLogin,
    getLogin
};