const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    if (!req.cookies.jwt) return res.redirect('/login');

    jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, payload) => {
        if (err) return res.redirect('/login');
        
        req.user = payload;
        next();
    })
}

module.exports = isLoggedIn;