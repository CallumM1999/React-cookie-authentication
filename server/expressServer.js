const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const PORT = 4000;

const cookieParser = require('cookie-parser');

const expressServer = async app => {
    const server = express();

    // passing app into Router
    server.use((req, res, next) => {
        req.app = app;
        next();
    })

    server.use(bodyParser());
    server.use(cookieParser())

    server.use(require('./routes/routes'));

    const con = require('./db/connection');

    con.connect(err => {
        if (err) throw err;

        console.log('Connected to database!');
    });

    return server.listen(PORT, () => console.log(`${__filename} is running on http://localhost:${PORT}`));
};

module.exports = expressServer;
