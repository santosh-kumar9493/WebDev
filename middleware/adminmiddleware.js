const {JWT_ADMIN_SECRET} = require('../config');
const jwt = require('jsonwebtoken');

module.exports = function adminMiddleware(req, res, next) {

    const findedAdmin = jwt.verify(req.headers.token, JWT_ADMIN_SECRET);

    if (!findedAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userid = findedAdmin.id;
    next();
}