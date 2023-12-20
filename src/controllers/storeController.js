const { getallfromtable, findvalueswithkey, add_med, deletefromtablewithkey, edit_med } = require('../database/database');

const getStore = async (req, res) => {
    let promise = new Promise((resolve) => {
        resolve(getallfromtable("store"));
    });
    const results = await promise;
    res.render('store.ejs', { list: results });
};

const postSearchMedicine = async (req, res) => {
    var key = req.body.search;
    let promise = new Promise((resolve) => {
        resolve(findvalueswithkey("store", "name", key));
    });
    const results = await promise;
    res.render('store.ejs',{list : results});
};

const getAddMedicine = (req, res) => {
    res.render('add_med.ejs');
};

const getEditMedicine = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(findvalueswithkey("store", "id", id));
    });
    const results = await promise;
    res.render('edit_med.ejs', { list: results });
};

const getDeleteMedicine = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(findvalueswithkey("store", "id", id));
    });
    const results = await promise;
    res.render('delete_med.ejs', { list: results });
};

const postDeleteMedicine = async (req, res) => {
    var id = req.params.id;
    let promise = new Promise((resolve) => {
        resolve(deletefromtablewithkey("store", "id", id));
    });
    let isSuccessful = await promise;
    if (isSuccessful)
        res.redirect('/store');
    else
        res.send('Error deleting medicine');
}

const postEditMedicine = async (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var p_date = req.body.p_date;
    var expire = req.body.expire;
    var e_date = req.body.e_date;
    var price = req.body.price;
    var quantity = req.body.quantity;
    let promise = new Promise((resolve) => {
        resolve(edit_med(id, name, p_date, expire, e_date, price, quantity));
    });
    let isSuccessful = await promise;
    if (isSuccessful)
        res.redirect('/store');
    else
        res.send('Error editing medicine');
}

const postAddMedicine = async (req, res) => {
    var name = req.body.name;
    var p_date = req.body.p_date;
    var expire = req.body.expire;
    var e_date = req.body.e_date;
    var price = req.body.price;
    var quantity = req.body.quantity;
    
    let promise = new Promise((resolve) => {
        resolve(add_med(name, p_date, expire, e_date, price, quantity));
    });
    const isSuccessful = await promise;
    if (!isSuccessful) 
        res.send("Error adding medicine");
    else 
        res.redirect('/store');
};

module.exports = {
    getStore,
    getEditMedicine,
    getDeleteMedicine,
    postSearchMedicine,
    postAddMedicine,
    postEditMedicine,
    postDeleteMedicine,
    getAddMedicine
};