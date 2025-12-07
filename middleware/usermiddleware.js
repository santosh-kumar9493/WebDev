
const {JWT_USER_SECRET} = require('../config');
const jwt = require('jsonwebtoken');

module.exports = function usermiddleware(req, res, next) {

    const findedUser = jwt.verify(req.headers.token, JWT_USER_SECRET);

    if (!findedUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userid = findedUser.id;
    next();
}