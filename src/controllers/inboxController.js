const { getallfromtable } = require('../database/database');

const checkInbox = (req, res, next) => {
    if (req.cookies['username'] == undefined)
        res.redirect('/login');
    else
        next();
};

const getInbox = async (req, res) => {
    let promise = new Promise((resolve) => {
        resolve(getallfromtable("complain"));
    });
    const results = await promise;
    res.render('inbox.ejs', { list: results });
};

module.exports = {
    checkInbox,
    getInbox
};