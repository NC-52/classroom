const jwt = require('jsonwebtoken');

const mySecret = require('../config/config');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated!');
        error.statusCode =401;
        throw error;
    }
    const token = authHeader.split(' ')[1]; //token extracted from the header
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, mySecret);
        //the verify method decodes the token and checks if it's valid
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId; //extracts some information from the token
    next();
}