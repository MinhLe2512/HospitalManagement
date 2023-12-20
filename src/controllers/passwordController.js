const getResetPassword = (req, res) => {
    res.render('resetpassword.ejs')
};

const getSetPassword = (req, res) => {
    res.render('setpassword.ejs');
};

module.exports = {
    getResetPassword, 
    getSetPassword
}