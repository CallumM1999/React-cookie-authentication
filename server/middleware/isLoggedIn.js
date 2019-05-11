const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {

    try {
        if (!req.cookies.jwt) throw 'No Cookie';

        jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, payload) => {
            if (err) throw err;
            
            req.user = payload;
            next();
        })
    } catch(e) {
        req.user = null;
        return next();
    }
}

module.exports = isLoggedIn;