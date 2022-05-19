const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { phone, userId } = decoded;
        req.phone = phone;
        req.userId = userId;
        next();
    } catch(err) {
        next("Authentication failure!");
    }
};

module.exports = checkLogin;