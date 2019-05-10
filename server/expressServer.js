const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const PORT = 4000;

const passport = require('passport');

const configurePassport = require('./passport/configurePassport');
configurePassport();


const expressServer = app => {
    const server = express();

    // passing app into Router
    server.use((req, res, next) => {
        req.app = app;
        next();
    })

    server.use(bodyParser());

    server.use(session({
        key: 'session_cookie_name',
        secret: 'some_secret_key',
        saveUninitialized: false,
        resave: false
    }));

    server.use(passport.initialize());
    server.use(passport.session());

    server.use(require('./routes/routes'));

    return server.listen(PORT, () => console.log(`${__filename} is running on http://localhost:${PORT}`));


};

module.exports = expressServer;
