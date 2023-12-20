const getLogout = (req, res) => {
    res.clearCookie('username');
	res.redirect('/');
};

module.exports = getLogout;