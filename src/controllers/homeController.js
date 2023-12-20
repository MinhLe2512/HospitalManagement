const { getallfromtable } = require('../database/database');

const getLandingPage = (req, res) => {
    res.clearCookie('username');
    res.render('landing.ejs')
}

const getHomePage = async (req, res) => {
    let getAllDocsPromise = new Promise((resolve) => {
        resolve(getallfromtable("doctor"));
    });
    const docRes = await getAllDocsPromise;
    
    let getAllAppPromise = new Promise((resolve) => {
        resolve(getallfromtable("appointment"));
    });
    const appointmentRes = await getAllAppPromise;
    if (docRes !=undefined && appointmentRes != undefined)
        res.render('home.ejs', {
            doc: docRes.length,
            doclist: docRes, 
            appointment : appointmentRes.length, 
            applist : appointmentRes,
            admin_name: req.cookies['username']
        });
}

module.exports = {
    getLandingPage,
    getHomePage
};