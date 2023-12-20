const { add_complain,  getallfromtable, deletefromtablewithkey } = require('../database/database');

const getComplain = (req, res) => {
    res.render('complain.ejs');
};
const postComplain = async (req, res) => {
    var message = req.body.message;
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;

    let promise = new Promise((resolve) => {
        resolve(add_complain(message, name, email, subject));
    });
    const isSuccessful = await promise;
    if (!isSuccessful) 
        res.send("Error posting complain");
    else 
        res.redirect('/inbox');
}

const postDeleteComplain = async (req, res) => {
    var id = req.body.id;

    let promise = new Promise((resolve) => {
        resolve(deletefromtablewithkey('complain', 'id', id));
    });
    const isSuccessful = await promise;
    if (!isSuccessful) 
        res.send("Error deleting complain");
    else 
        res.redirect('/inbox');
}

module.exports = {
    getComplain,
    postComplain,
    postDeleteComplain
};