const connection = require("../config/connectDB");

const middlewareController = async(req, res, next) => {
    // xác nhận token
    const auth = req.cookies.auth;
    if (!auth) {
        // Check if it's an AJAX request
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(200).json({
                message: 'Please login to continue',
                status: false,
                needLogin: true
            });
        }
        return res.redirect("/login");
    }
    try {
        const [rows] = await connection.execute('SELECT `token`, `status` FROM `users` WHERE `token` = ? AND `veri` = 1', [auth]);
        if(!rows) {
            res.clearCookie("auth");
            // Check if it's an AJAX request
            if (req.xhr || req.headers.accept.indexOf('json') > -1) {
                return res.status(200).json({
                    message: 'Session expired, please login again',
                    status: false,
                    needLogin: true
                });
            }
            return res.redirect("/login");
        };
        if (auth == rows[0].token && rows[0].status == '1') {
            next();
        } else {
            // Check if it's an AJAX request
            if (req.xhr || req.headers.accept.indexOf('json') > -1) {
                return res.status(200).json({
                    message: 'Account invalid, please login',
                    status: false,
                    needLogin: true
                });
            }
            return res.redirect("/login");
        }
    } catch (error) {
        // Check if it's an AJAX request
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(200).json({
                message: 'Error occurred, please login again',
                status: false,
                needLogin: true
            });
        }
        return res.redirect("/login");
    }
}

module.exports = middlewareController;